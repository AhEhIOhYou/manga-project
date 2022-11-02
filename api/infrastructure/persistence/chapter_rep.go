package persistence

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
	"gorm.io/gorm"
)

type ChapterRepo struct {
	db *gorm.DB
}

// DeleteChapter implements repository.ChapterRepository
func (*ChapterRepo) DeleteChapter(uint64) error {
	panic("unimplemented")
}

// DeleteChapters implements repository.ChapterRepository
func (*ChapterRepo) DeleteChapters(uint64) error {
	panic("unimplemented")
}

// GetChapter implements repository.ChapterRepository
func (*ChapterRepo) GetChapter(uint64) (*entities.Chapter, error) {
	panic("unimplemented")
}

// GetChapters implements repository.ChapterRepository
func (*ChapterRepo) GetChapters(uint64) ([]*entities.Chapter, error) {
	panic("unimplemented")
}

// SaveChapter implements repository.ChapterRepository
func (*ChapterRepo) SaveChapter(*entities.Chapter) (*entities.Chapter, map[string]string) {
	panic("unimplemented")
}

// UpdateChapter implements repository.ChapterRepository
func (*ChapterRepo) UpdateChapter(*entities.Chapter) (*entities.Chapter, map[string]string) {
	panic("unimplemented")
}

var _ repository.ChapterRepository = &ChapterRepo{}

func NewChapterRepo(db *gorm.DB) *ChapterRepo {
	return &ChapterRepo{
		db: db,
	}
}
