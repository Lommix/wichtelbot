package main

import (
	"wichtel-app/backend"

	"github.com/gin-contrib/cors"
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

	//dev
	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000","http://localhost:8080"},
		AllowHeaders:     []string{"Origin"},
		AllowMethods:     []string{"POST", "GET"},
		AllowCredentials: true,
	}))

	router.Use(static.Serve("/", static.LocalFile("frontend/dist/", true)))
	router.GET("/:room", func(ctx *gin.Context) {
		ctx.File("frontend/dist/index.html")
	})

	router.POST("/login", backend.LoginHandler)
	router.GET("/user", backend.GetUserHandler)
	router.GET("/chat", func(ctx *gin.Context) {
		client := backend.SpawnClient("lol", ctx)
		backend.Clients = append(backend.Clients, *client)
	})

	// api := router.Group("/api", backend.AuthHandler)
	// api.GET("/room", controller.GetRoomContext)
	// api.GET("/chat", controller.GetChat)
	// api.POST("/say", controller.Say)
	// api.POST("/ready", controller.GetChat)

	router.Run(":8080")
}
