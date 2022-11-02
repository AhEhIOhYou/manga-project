package repository

import "github.com/AhEhIOhYou/manga-project/api/entities"

type ChapterRepository interface {
	SaveChapter(*entities.Chapter) (*entities.Chapter, map[string]string)
	GetChapter(uint64) (*entities.Chapter, error)
	GetChapters(uint64) ([]*entities.Chapter, error)
	UpdateChapter(*entities.Chapter) (*entities.Chapter, map[string]string)
	DeleteChapter(uint64) error
	DeleteChapters(uint64) error
}