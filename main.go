package main

import (
	"wichtel-app/backend"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type connection struct {
	ws   *websocket.Conn
	send chan []byte
}

func main() {
	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("frontend/dist/", true)))
	router.POST("/login", backend.LoginHandler)

	router.GET("/chat", func(ctx *gin.Context) {
		client := backend.SpawnClient("lol", ctx)
		backend.Clients = append(backend.Clients, *client)
	})

	//api := router.Group("/api", backend.AuthHandler)
	// api.GET("/room", controller.GetRoomContext)
	// api.GET("/chat", controller.GetChat)
	// api.POST("/say", controller.Say)
	// api.POST("/ready", controller.GetChat)

	router.Run(":8080")
}
