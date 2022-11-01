package backend

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func Serve() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))
	router.NoRoute(func(c *gin.Context) {
		c.File("./frontend/build/index.html")
	})

	server := &http.Server{
		Addr:         "0.0.0.0:8095",
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Println("Server: Started at http://localhost:8095 ...")
	go func() {
		if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			log.Fatalln(err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Server: Shutdown")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalln(err)
	}
	log.Println("Server: Shutdown success")
}
