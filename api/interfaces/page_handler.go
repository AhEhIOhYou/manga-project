package interfaces

import "github.com/AhEhIOhYou/manga-project/api/application"

type Page struct {
	pageApp application.PageAppInterface
}

func NewPage(pageApp application.PageAppInterface) *Page {
	return &Page{
		pageApp: pageApp,
	}
}