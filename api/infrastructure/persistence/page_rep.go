package persistence

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
	"gorm.io/gorm"
)

type PageRepo struct {
	db *gorm.DB
}

// DeletePage implements repository.PageRepository
func (*PageRepo) DeletePage(uint64) error {
	panic("unimplemented")
}

// DeletePages implements repository.PageRepository
func (*PageRepo) DeletePages(uint64) error {
	panic("unimplemented")
}

// GetPage implements repository.PageRepository
func (*PageRepo) GetPage(uint64) (*entities.Page, error) {
	panic("unimplemented")
}

// GetPages implements repository.PageRepository
func (*PageRepo) GetPages(uint64) ([]*entities.Page, error) {
	panic("unimplemented")
}

// SavePage implements repository.PageRepository
func (*PageRepo) SavePage(*entities.Page) (*entities.Page, map[string]string) {
	panic("unimplemented")
}

// SavePages implements repository.PageRepository
func (*PageRepo) SavePages([]*entities.Page) ([]*entities.Page, map[string]string) {
	panic("unimplemented")
}

var _ repository.PageRepository = &PageRepo{}

func NewPageRepo(db *gorm.DB) *PageRepo {
	return &PageRepo{
		db: db,
	}
}
