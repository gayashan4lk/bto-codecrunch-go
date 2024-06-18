package main

import "go.mongodb.org/mongo-driver/bson/primitive"

// Expense struct
type Expense struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Date        string             `json:"date" bson:"date"`
	PaymentType string             `json:"payment_type" bson:"payment_type"`
	Detail      string             `json:"detail" bson:"detail"`
	Payment     float64            `json:"payment" bson:"payment"`
	IsPaid      bool               `json:"is_paid" bson:"is_paid"`
}
