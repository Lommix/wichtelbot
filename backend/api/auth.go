package api

import (
	"net/http"
	"wichtel-app/backend/storage"

	"github.com/gin-gonic/gin"
)

func AuthHandler(ctx *gin.Context) {
	session, _ := storage.Store.Get(ctx.Request, storage.COOKIE_NAME)
	user := session.Values["user"]
	if user == nil {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, gin.H{"message": "Action requires valid user"})
		ctx.Abort()
	}
}

