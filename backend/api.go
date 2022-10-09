package backend

import (
	"encoding/gob"
	"net/http"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

type User struct {
	Id     string
	Name   string
	Tags   []string
	Notice string
	Ready  bool
}

func init() {
	gob.Register(&User{})
}

func LoginHandler(ctx *gin.Context) {
	var user User
	if err := ctx.BindJSON(&user); err != nil {
		panic(err)
	}
	user.Id = uuid.NewV4().String()
	user.Ready = false

	session, _ := Store.Get(ctx.Request, "session")
	session.Values["user"] = user

	err := session.Save(ctx.Request, ctx.Writer)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "you failed to log in")
		ctx.Abort()
	}

	ctx.JSON(http.StatusOK, user)
}

func GetUserHandler(ctx *gin.Context) {
	session, _ := Store.Get(ctx.Request, "session")
	if session.IsNew {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, "login first")
		return
	}
	currentUser := session.Values["user"]
	ctx.JSON(http.StatusOK, currentUser)
}
