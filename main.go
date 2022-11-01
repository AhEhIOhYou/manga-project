package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main()  {
	router := gin.Default()
	router.Any("", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "success"});
	});
	log.Fatal(router.Run(":8095"));
}