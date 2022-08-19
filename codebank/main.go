package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/aduilio/codebank/domain"
	"github.com/aduilio/codebank/infrastructure/grpc/server"
	"github.com/aduilio/codebank/infrastructure/kafka"
	"github.com/aduilio/codebank/infrastructure/repository"
	"github.com/aduilio/codebank/usecase"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env files")
	}
}

func main() {
	db := setupDb()
	defer db.Close()
	producer := setupKafkaProducer()
	processTransactionUseCase := setupUseCase(db, producer)
	fmt.Println("Running gRPC server")
	serveGrpc(processTransactionUseCase)
}

func setupDb() *sql.DB {
	psql := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("db_host"),
		os.Getenv("db_port"),
		os.Getenv("db_user"),
		os.Getenv("db_password"),
		os.Getenv("db_name"),
	)
	db, err := sql.Open(os.Getenv("db_driver"), psql)
	if err != nil {
		fmt.Println("Error connecting to database")
	}
	return db
}

func setupUseCase(db *sql.DB, producer kafka.KafkaProducer) usecase.UseCaseTransaction {
	transactionRepositoryDb := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(transactionRepositoryDb)
	useCase.KafkaProducer = producer

	return useCase
}

func setupKafkaProducer() kafka.KafkaProducer {
	producer := kafka.NewKafkaProducer()
	producer.SetupProducer(os.Getenv("kafka_bootstrap_servers"))
	return producer
}

func serveGrpc(processTransactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()
	grpcServer.ProcessTransactionUseCase = processTransactionUseCase
	grpcServer.Serve()
}

func createCreditCard(db *sql.DB) {
	cc := domain.NewCreditCard()
	cc.Number = "1234567887654321"
	cc.Name = "Aduilio"
	cc.ExpirationYear = 2024
	cc.ExpirationMonth = 11
	cc.CVV = 123
	cc.Balance = 0
	cc.Limit = 1000

	repo := repository.NewTransactionRepositoryDb(db)
	err := repo.CreateCreditCard(*cc)
	if err != nil {
		fmt.Println(err)
	}
}
