package main

import (
	"github.com/AhEhIOhYou/manga-project/api"
	"github.com/gin-gonic/gin"
)

func main()  {
	gin.SetMode(gin.DebugMode);
	api.Serve();
}