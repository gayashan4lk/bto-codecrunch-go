package main

import "go.mongodb.org/mongo-driver/bson/primitive"

// Expense struct
type Expense struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Amount float64            `json:"amount" bson:"amount"`
	Note   string             `json:"note" bson:"note"`
}
