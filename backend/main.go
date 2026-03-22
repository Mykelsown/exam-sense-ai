package main

import (
	"log"
	"net/http"

	"exam-sense-backend/handlers"
)

func main() {
	http.HandleFunc("/health", handlers.Health)
	http.HandleFunc("/generate", handlers.GenerateHandler)

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
