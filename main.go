package main

import (
	"wichtel-app/backend/api"
	"wichtel-app/backend/storage"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)


func main() {

	err := storage.Load()
	if err != nil{
		panic("failed to load storage")
	}

	router := gin.Default()

	//debug
	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000","http://localhost:8080"},
		AllowHeaders:     []string{"Origin"},
		AllowMethods:     []string{"POST", "GET"},
		AllowCredentials: true,
	}))

	router.Use(static.Serve("/", static.LocalFile("frontend/dist/", true)))
	
	router.GET("/logout", api.LogoutHandler)
	router.POST("/login", api.LoginHandler)
	router.POST("/register", api.RegisterHandler)
	router.POST("/play", api.PlayHandler)
	router.GET("/user", api.GetUserHandler)

	router.Run(":8080")
}
