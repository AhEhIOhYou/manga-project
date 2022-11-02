package repository

import "github.com/AhEhIOhYou/manga-project/api/domain/entities"

type PageRepository interface {
	SavePage(*entities.Page) (*entities.Page, map[string]string)
	SavePages([]*entities.Page) ([]*entities.Page, map[string]string)
	GetPage(uint64) (*entities.Page, error)
	GetPages(uint64) ([]*entities.Page, error)
	DeletePage(uint64) error
	DeletePages(uint64) error
}