package api

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/AhEhIOhYou/manga-project/api/infrastructure/persistence"
	"github.com/AhEhIOhYou/manga-project/api/interfaces/middleware"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load("./.env"); err != nil {
		log.Fatal("No .env file found")
	}
}

func getServices() (*persistence.Repos, error) {
	dbHost := os.Getenv("DB_HOST")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbUser := os.Getenv("DB_USER")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	return persistence.NewRepo(dbUser, dbPassword, dbPort, dbHost, dbName)
}

func Serve() {

	services, err := getServices()
	if err != nil {
		log.Fatal(err)
	}

	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.FrontStaticMiddleware())

	
	router.NoRoute(func(c *gin.Context) {
		c.File("./client/build/index.html")
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
