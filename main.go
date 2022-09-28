package main

import (
	"encoding/gob"
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

type User struct {
	Name string
	Tags []string
	Id   string
}

var store = sessions.NewCookieStore([]byte("Goodby World!"))

func init() {
	gob.Register(&User{})
}

func main() {

	router := gin.Default()
	router.Use(static.Serve("/", static.LocalFile("frontend/dist", true)))
	api := router.Group("/api")

	api.Use(func(ctx *gin.Context) {
		session, _ := store.Get(ctx.Request, "session")
		user := session.Values["user"]
        println(user)
		if user != nil {
			ctx.JSON(http.StatusOK, gin.H{"message": "you are already logged in"})
		}
        ctx.Done()
	})

	api.POST("/login", func(ctx *gin.Context) {
		var user User
		if err := ctx.BindJSON(&user); err != nil {
			panic(err)
		}
		session, _ := store.Get(ctx.Request, "session")
		session.Values["user"] = user
		session.Save(ctx.Request, ctx.Writer)

		ctx.JSON(http.StatusOK, user)
	})

	router.Run(":8080")
}
