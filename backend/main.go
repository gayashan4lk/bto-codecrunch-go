package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func init() {
	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb+srv://pasantafi1234:J#aaSs6QhKjMAHF@backenddb.avwhmgf.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
	// Connect to MongoDB
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Could not connect to the database:", err)
	}

	fmt.Println("Connected to MongoDB!")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/expenses", CreateExpenseEndpoint).Methods("POST")
	router.HandleFunc("/expenses", GetAllExpensesEndpoint).Methods("GET")
	router.HandleFunc("/expenses/{id}", GetExpenseEndpoint).Methods("GET")
	router.HandleFunc("/expenses/{id}", UpdateExpenseEndpoint).Methods("PUT")
	router.HandleFunc("/expenses/{id}", DeleteExpenseEndpoint).Methods("DELETE")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default to port 8080 if not set
	}

	log.Printf("Server starting on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
