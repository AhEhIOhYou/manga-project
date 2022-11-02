package application

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
)

type pageApp struct {
	page repository.PageRepository
}

// DeletePage implements PageAppInterface
func (p *pageApp) DeletePage(pageId uint64) error {
	return p.page.DeletePage(pageId)
}

// DeletePages implements PageAppInterface
func (p *pageApp) DeletePages(chapterId uint64) error {
	return p.page.DeletePages(chapterId)
}

// GetPage implements PageAppInterface
func (p *pageApp) GetPage(pageId uint64) (*entities.Page, error) {
	return p.page.GetPage(pageId)
}

// GetPages implements PageAppInterface
func (p *pageApp) GetPages(chapterId uint64) ([]*entities.Page, error) {
	return p.page.GetPages(chapterId)
}

// SavePage implements PageAppInterface
func (p *pageApp) SavePage(page *entities.Page) (*entities.Page, map[string]string) {
	return p.page.SavePage(page)
}

// SavePages implements PageAppInterface
func (p *pageApp) SavePages(pages []*entities.Page) ([]*entities.Page, map[string]string) {
	return p.page.SavePages(pages)
}

var _ PageAppInterface = &pageApp{}

type PageAppInterface interface {
	SavePage(*entities.Page) (*entities.Page, map[string]string)
	SavePages([]*entities.Page) ([]*entities.Page, map[string]string)
	GetPage(uint64) (*entities.Page, error)
	GetPages(uint64) ([]*entities.Page, error)
	DeletePage(uint64) error
	DeletePages(uint64) error
}
