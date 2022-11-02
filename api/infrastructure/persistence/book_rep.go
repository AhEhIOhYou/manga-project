package persistence

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
	"gorm.io/gorm"
)

type BookRepo struct {
	db *gorm.DB
}

// DeleteBook implements repository.BookRepository
func (*BookRepo) DeleteBook(uint64) error {
	panic("unimplemented")
}

// GetBook implements repository.BookRepository
func (*BookRepo) GetBook(uint64) (*entities.Book, error) {
	panic("unimplemented")
}

// SaveBook implements repository.BookRepository
func (*BookRepo) SaveBook(*entities.Book) (*entities.Book, map[string]string) {
	panic("unimplemented")
}

// UpdateBook implements repository.BookRepository
func (*BookRepo) UpdateBook(*entities.Book) (*entities.Book, map[string]string) {
	panic("unimplemented")
}

var _ repository.BookRepository = &BookRepo{}

func NewBookRepo(db *gorm.DB) *BookRepo {
	return &BookRepo{
		db: db,
	}
}
