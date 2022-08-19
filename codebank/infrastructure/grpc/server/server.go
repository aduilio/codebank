package server

import (
	"fmt"
	"net"

	"github.com/aduilio/codebank/infrastructure/grpc/pb"
	"github.com/aduilio/codebank/infrastructure/grpc/service"
	"github.com/aduilio/codebank/usecase"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type GRPCServer struct {
	ProcessTransactionUseCase usecase.UseCaseTransaction
}

func NewGRPCServer() GRPCServer {
	return GRPCServer{}
}

func (s GRPCServer) Serve() {
	listener, err := net.Listen("tcp", "0.0.0.0:50052")
	if err != nil {
		fmt.Println("Could not run the server")
	}
	transactionService := service.NewTransactionService()
	transactionService.ProcessTransactionUseCase = s.ProcessTransactionUseCase

	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)
	pb.RegisterPaymentServiceServer(grpcServer, transactionService)

	grpcServer.Serve(listener)
}
