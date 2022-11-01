package main

import (
	"github.com/AhEhIOhYou/manga-project/backend"
	"github.com/gin-gonic/gin"
)

func main()  {
	gin.SetMode(gin.DebugMode);
	backend.Serve();
}