package main

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

type User struct {
	ID      string
	Name    string
	Partner string
}

func main() {
	router := gin.Default()
    router.Use(static.Serve("/", static.LocalFile("frontend/dist", true)))
    api := router.Group("/api")

    api.POST("/:room/login", func(ctx *gin.Context){
        ctx.JSON(200, gin.H{
            "message" : ctx.Request.PostForm.Get("name"),
        })
    })

    api.GET("/:room", func(ctx *gin.Context){
        ctx.JSON(200,gin.H{
            "message": "welcome to the api",
        })
    })

	router.Run(":8080")
}
