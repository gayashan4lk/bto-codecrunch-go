package main

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CreateExpenseEndpoint - Creates a new expense
func CreateExpenseEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var expense Expense
	_ = json.NewDecoder(request.Body).Decode(&expense)
	collection := client.Database("expenses").Collection("expense")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, err := collection.InsertOne(ctx, expense)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(result)
}

// GetExpenseEndpoint - Retrieves a single expense
func GetExpenseEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var expense Expense
	collection := client.Database("expenses").Collection("expense")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection.FindOne(ctx, bson.M{"_id": id}).Decode(&expense)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(expense)
}

// GetAllExpensesEndpoint - Retrieves all expenses
func GetAllExpensesEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var expenses []Expense
	collection := client.Database("expenses").Collection("expense")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var expense Expense
		cursor.Decode(&expense)
		expenses = append(expenses, expense)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(expenses)
}

// UpdateExpenseEndpoint - Updates an existing expense
func UpdateExpenseEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var expense Expense
	_ = json.NewDecoder(request.Body).Decode(&expense)
	collection := client.Database("expenses").Collection("expense")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, err := collection.ReplaceOne(ctx, bson.M{"_id": id}, expense)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(result)
}

// DeleteExpenseEndpoint - Deletes an expense
func DeleteExpenseEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	collection := client.Database("expenses").Collection("expense")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, err := collection.DeleteOne(ctx, Expense{ID: id})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(result)
}
