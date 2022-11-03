package interfaces

import "github.com/AhEhIOhYou/manga-project/api/application"

type Book struct {
	bookApp application.BookAppInterface
}

func NewBook(bookApp application.BookAppInterface) *Book {
	return &Book{
		bookApp: bookApp,
	}
}