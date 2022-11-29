package api

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"
	"wichtel-app/backend/storage"

	"github.com/gin-gonic/gin"
	uuid "github.com/satori/go.uuid"
)

func RegisterHandler(ctx *gin.Context) {
	var user storage.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusInternalServerError, fmt.Sprintln(err))
		return
	}

	if storage.Has(user.Name) {
		ctx.JSON(http.StatusBadRequest, "Der Name existiert schon")
		return
	}

	user.Id = uuid.NewV4().String()
	storage.Users = append(storage.Users, user)
	err := storage.Save()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, fmt.Sprintln(err))
		return
	}

	session, _ := storage.Store.Get(ctx.Request, storage.COOKIE_NAME)
	session.Values["user"] = user
	session.Options.MaxAge = 3600
	err = session.Save(ctx.Request, ctx.Writer)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "Cookie Probleme, frag den Bäcker")
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func UpdateHandler(ctx *gin.Context) {
	updateData := struct {
		Notice string
		Tags   []string
	}{}

	if err := ctx.BindJSON(&updateData); err != nil {
		ctx.JSON(http.StatusInternalServerError, fmt.Sprintln(err))
		return
	}


	session, err := storage.Store.Get(ctx.Request, storage.COOKIE_NAME)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "Cookie Probleme, frag den Bäcker")
		return
	}

	user := session.Values["user"].(*storage.User)

	user.Notice = updateData.Notice
	user.Tags = updateData.Tags

	storage.Save()

	ctx.JSON(http.StatusOK, user)
}

func LoginHandler(ctx *gin.Context) {
	loginData := struct {
		Name     string
		Password string
	}{}

	if err := ctx.BindJSON(&loginData); err != nil {
		ctx.JSON(http.StatusInternalServerError, fmt.Sprintln(err))
		return
	}

	var user *storage.User
	user, err := storage.Verify(loginData.Name, loginData.Password)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, fmt.Sprintln(err))
		return
	}

	session, _ := storage.Store.Get(ctx.Request, storage.COOKIE_NAME)
	session.Values["user"] = &user
	session.Options.MaxAge = 3600
	err = session.Save(ctx.Request, ctx.Writer)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "Cookie Probleme, frag den Bäcker")
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func LogoutHandler(ctx *gin.Context) {
	session, _ := storage.Store.Get(ctx.Request, storage.COOKIE_NAME)
	if session.IsNew {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, "login to logout")
		return
	}
	session.Values["user"] = nil
	session.Save(ctx.Request, ctx.Writer)
	ctx.JSON(http.StatusOK, "you logged out")
}

func PlayHandler(ctx *gin.Context) {
	params := struct {
		Token string
	}{}

	if err := ctx.BindJSON(&params); err != nil {
		ctx.JSON(http.StatusInternalServerError, fmt.Sprintln(err))
		return
	}

	fmt.Println(params.Token)

	remaining := make([]int, len(storage.Users))
	for i := range remaining {
		remaining[i] = i
	}

	rand.Seed(time.Now().Unix())

	for index, user := range storage.Users {

		for {
			randomIndex := rand.Intn(len(remaining))
			if storage.Users[remaining[randomIndex]].Name != user.Name {
				partner,_ := storage.GetPartner(storage.Users[remaining[randomIndex]].Id)
				storage.Users[index].Partner = partner
				remaining[randomIndex] = remaining[len(remaining)-1]
				remaining = remaining[:len(remaining)-1]
				break
			}
		}

	}

	storage.Save()

	ctx.JSON(http.StatusOK, "game played")
}

func GetUserHandler(ctx *gin.Context) {
	session, _ := storage.Store.Get(ctx.Request, storage.COOKIE_NAME)
	if session.IsNew || session.Values["user"] == nil {
		ctx.JSON(http.StatusBadRequest, "invalid session")
		return
	}

	user, err := session.Values["user"].(*storage.User)
	if !err {
		ctx.JSON(http.StatusBadRequest, "lol you suck, login!")
		return
	}

	ctx.JSON(http.StatusOK, user)
}
