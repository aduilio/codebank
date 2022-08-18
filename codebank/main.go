package main

import (
	"database/sql"
	"fmt"

	"github.com/aduilio/codebank/domain"
	"github.com/aduilio/codebank/infrastructure/repository"
	"github.com/aduilio/codebank/usecase"
	_ "github.com/lib/pq"
)

func main() {
	db := setupDb()
	defer db.Close()
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

func setupDb() *sql.DB {
	psql := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		"db",
		"5432",
		"postgres",
		"root",
		"codebank",
	)
	db, err := sql.Open("postgres", psql)
	if err != nil {
		fmt.Println("Error connecting to database")
	}
	return db
}

func setupUseCase(db *sql.DB) usecase.UseCaseTransaction {
	transactionRepositoryDb := repository.NewTransactionRepositoryDb(db)
	useCase := usecase.NewUseCaseTransaction(transactionRepositoryDb)

	return useCase
}
