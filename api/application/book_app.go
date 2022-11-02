package application

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
)

type bookApp struct {
	book repository.BookRepository
}

// DeleteBook implements BookAppInterface
func (b *bookApp) DeleteBook(bookId uint64) error {
	return b.book.DeleteBook(bookId)
}

// GetBook implements BookAppInterface
func (b *bookApp) GetBook(bookId uint64) (*entities.Book, error) {
	return b.book.GetBook(bookId)
}

// SaveBook implements BookAppInterface
func (b *bookApp) SaveBook(book *entities.Book) (*entities.Book, map[string]string) {
	return b.book.SaveBook(book)
}

// UpdateBook implements BookAppInterface
func (b *bookApp) UpdateBook(book *entities.Book) (*entities.Book, map[string]string) {
	return b.book.UpdateBook(book)
}

var _ BookAppInterface = &bookApp{}

type BookAppInterface interface {
	SaveBook(*entities.Book) (*entities.Book, map[string]string)
	GetBook(uint64) (*entities.Book, error)
	UpdateBook(*entities.Book) (*entities.Book, map[string]string)
	DeleteBook(uint64) error
}
