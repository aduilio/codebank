package usecase

import (
	"github.com/aduilio/codebank/domain"
	"github.com/aduilio/codebank/dto"
)

type UseCaseTransaction struct {
	TransactionRepository domain.TransactionRepository
}

func NewUseCaseTransaction(transactionRepository domain.TransactionRepository) UseCaseTransaction {
	return UseCaseTransaction{TransactionRepository: transactionRepository}
}

func (u UseCaseTransaction) ProcessTransaction(transactionDto dto.Transaction) (domain.Transaction, error) {
	creditCard := u.creditCard(transactionDto)
	ccBalanceLimit, err := u.TransactionRepository.GetCreditCard(*creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}
	creditCard.ID = ccBalanceLimit.ID
	creditCard.Limit = ccBalanceLimit.Limit
	creditCard.Balance = ccBalanceLimit.Balance

	transaction := u.transaction(transactionDto, *creditCard)
	transaction.ProcessAndValidate(creditCard)

	err = u.TransactionRepository.Save(*transaction, *creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}

	return domain.Transaction{}, nil
}

func (UseCaseTransaction) creditCard(transactionDto dto.Transaction) *domain.CreditCard {
	creditCard := domain.NewCreditCard()
	creditCard.Name = transactionDto.Name
	creditCard.Number = transactionDto.Number
	creditCard.ExpirationMonth = transactionDto.ExpirationMonth
	creditCard.ExpirationYear = transactionDto.ExpirationYear
	creditCard.CVV = transactionDto.CVV

	return creditCard
}

func (UseCaseTransaction) transaction(transactionDto dto.Transaction, creditCard domain.CreditCard) *domain.Transaction {
	transaction := domain.NewTransation()
	transaction.Amount = transactionDto.Amount
	transaction.CreditCardId = creditCard.ID
	transaction.Description = transactionDto.Description
	transaction.Store = transactionDto.Store

	return transaction
}
