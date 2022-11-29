package main

import (
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
		panic("failed to load storage")
	}

	router := gin.Default()

	//debug
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
	router.POST("/register", api.RegisterHandler)
	router.GET("/user", api.GetUserHandler)
	router.POST("/update", api.UpdateHandler)


	//secret command api
	router.GET("/reset", api.AuthHandler, api.ResetHandler)
	router.GET("/play", api.AuthHandler, api.PlayHandler)


	router.Run(":8080")
}
