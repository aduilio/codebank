package domain

import (
	"time"

	uuid "github.com/satori/go.uuid"
)

type Transaction struct {
	ID           string
	Amount       float64
	Status       string
	Description  string
	Store        string
	CreditCardId string
	CreatedAt    time.Time
}

func NewTranscation() *Transaction {
	t := &Transaction{}
	t.ID = uuid.NewV4().String()
	t.CreatedAt = time.Now()
	return t
}

func (t *Transaction) PreocessAndValidate(creditCard *CreditCard) {
	if t.Amount+creditCard.Balance > creditCard.Limit {
		t.Status = "rejected"
	} else {
		t.Status = "approved"
		creditCard.Balance += t.Amount
	}
}
