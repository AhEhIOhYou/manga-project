package repository

import "github.com/AhEhIOhYou/manga-project/api/entities"

type BookRepository interface {
	SaveBook(*entities.Book) (*entities.Book, map[string]string)
	GetBook(uint64) (*entities.Book, error)
	UpdateBook(*entities.Book) (*entities.Book, map[string]string)
	DeleteBook(uint64) error
}