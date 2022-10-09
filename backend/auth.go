package backend

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthHandler(ctx *gin.Context) {

	session, _ := Store.Get(ctx.Request, "session")
	user := session.Values["user"]

	// //TODO: validate user
	if user == nil {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, gin.H{"message": "login first"})
		ctx.Abort()
	}
}

