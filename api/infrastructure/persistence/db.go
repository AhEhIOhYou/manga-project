package persistence

import (
	"fmt"

	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Repos struct {
	Book    repository.BookRepository
	Chapter repository.ChapterRepository
	Page    repository.PageRepository
	db      *gorm.DB
}

func NewRepo(DbUser, DbPassword, DbPort, DbHost, DbName string) (*Repos, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		DbUser, DbPassword, DbHost, DbPort, DbName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, err
	}
	db.Logger.LogMode(0)
	return &Repos{
		Book:    NewBookRepo(db),
		Chapter: NewChapterRepo(db),
		Page:    NewPageRepo(db),
		db:      db,
	}, nil
}
