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

const COOKIE_NAME = "session"

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

	session, _ := Store.Get(ctx.Request, COOKIE_NAME)
	session.Values["user"] = user
	session.Options.MaxAge = 3600

	err := session.Save(ctx.Request, ctx.Writer)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "you failed to log in")
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func LogoutHandler(ctx *gin.Context) {
	session, _ := Store.Get(ctx.Request, COOKIE_NAME)
	if session.IsNew {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, "login to logout")
		return
	}
	session.Values["user"] = nil
	ctx.JSON(http.StatusOK, "you logged out")
}

func GetUserHandler(ctx *gin.Context) {
	session, _ := Store.Get(ctx.Request, COOKIE_NAME)
	if session.IsNew || session.Values["user"] == nil {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, "login first")
		return
	}
	ctx.JSON(http.StatusOK, session.Values["user"])
}
