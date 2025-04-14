package main

import (
	"fmt"
	"log"
	"net/http"
	"suporteApi/src/config"
	"suporteApi/src/middlewares"
	"suporteApi/src/router"

	"github.com/rs/cors"
)

// func init() {
// 	key := make([]byte, 64)

// 	if _, err := rand.Read(key); err != nil {
// 		log.Fatal(err)
// 	}

// 	secureKey := base64.StdEncoding.EncodeToString(key)
// 	fmt.Println(secureKey)
// }

func main() {
	config.Load()
	r := router.GenerateRouter()
	port := fmt.Sprintf(":%d", config.Port)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	log.Printf("Server running on http://localhost%s", port)
	log.Fatal(http.ListenAndServe(port, middlewares.SecurityHeaders(c.Handler(r))))
}
