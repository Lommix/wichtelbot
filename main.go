package main

import (
	"fmt"
	"os"
	"wichtel-app/backend/api"
	"wichtel-app/backend/storage"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if godotenv.Load(".env") != nil {
		panic("no env provided")
	}

	err := storage.Load()
	if err != nil {
		panic("failed to load storage, data corrupted?")
	}

	router := gin.Default()

	//http auth
	// addHttpAuth(router)


	//cors debug config
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8080"},
		AllowHeaders:     []string{"Origin"},
		AllowMethods:     []string{"POST", "GET"},
		AllowCredentials: true,
	}))


	//frontend api
	router.Use(static.Serve("/", static.LocalFile("frontend/dist/", true)))
	router.GET("/logout", api.LogoutHandler)
	router.POST("/login", api.LoginHandler)
	router.POST("/register", api.RegisterAuthHandler, api.RegisterHandler)
	router.GET("/user", api.GetUserHandler)
	router.POST("/update", api.UpdateHandler)


	//secret command api
	router.GET("/reset", api.AuthHandler, api.ResetHandler)
	router.GET("/play", api.AuthHandler, api.PlayHandler)


	//serve https
	certPath := os.Getenv("cert")
	keyPath := os.Getenv("key")

	if certPath != "" && keyPath != "" {
		fmt.Println("certs detected, running on ssl")
		router.RunTLS(":443", certPath, keyPath)
	} else {
		router.Run(":8080")
	}
}

func addHttpAuth(router *gin.Engine) {
	user, ok := os.LookupEnv("user")
	if !ok {
		panic("env missing user")
	}

	password, ok := os.LookupEnv("password")
	if !ok {
		panic("env misssing password")
	}
	router.Use(gin.BasicAuth(gin.Accounts{
		user: password,
	}))
}
