package backend

import (
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

func LoginHandler(ctx *gin.Context) {
	var user User
	if err := ctx.BindJSON(&user); err != nil {
		panic(err)
	}

	user.Id = uuid.NewV4().String()
	user.Ready = false
    
	//check if loged in
	//register user
	//get or create room
	session, _ := Cookies.Get(ctx.Request, "session")
	session.Values["accpedted"] = true
	session.Save(ctx.Request, ctx.Writer)
	ctx.JSON(http.StatusOK, user)
}
