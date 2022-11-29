package api

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func AuthHandler(ctx *gin.Context) {
	token, ok := os.LookupEnv("token")
	if !ok {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, gin.H{"message": "missing env token"})
		ctx.Abort()
		return
	}

	bearerToken := ctx.Request.Header.Get("Authorization")

	if bearerToken != token {
		ctx.JSON(http.StatusNetworkAuthenticationRequired, gin.H{"message": "No authentication provided"})
		ctx.Abort()
		return
	}
}