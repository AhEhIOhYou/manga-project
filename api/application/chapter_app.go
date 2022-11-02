package application

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
)

type chapterApp struct {
	chapter repository.ChapterRepository
}

// DeleteChapter implements ChapterAppInterface
func (c *chapterApp) DeleteChapter(chapterId uint64) error {
	return c.chapter.DeleteChapter(chapterId)
}

// DeleteChapters implements ChapterAppInterface
func (c *chapterApp) DeleteChapters(bookId uint64) error {
	return c.chapter.DeleteChapters(bookId)
}

// GetChapter implements ChapterAppInterface
func (c *chapterApp) GetChapter(chapterId uint64) (*entities.Chapter, error) {
	return c.chapter.GetChapter(chapterId)
}

// GetChapters implements ChapterAppInterface
func (c *chapterApp) GetChapters(bookId uint64) ([]*entities.Chapter, error) {
	return c.chapter.GetChapters(bookId)
}

// SaveChapter implements ChapterAppInterface
func (c *chapterApp) SaveChapter(chapter *entities.Chapter) (*entities.Chapter, map[string]string) {
	return c.chapter.SaveChapter(chapter)
}

// UpdateChapter implements ChapterAppInterface
func (c *chapterApp) UpdateChapter(chapters *entities.Chapter) (*entities.Chapter, map[string]string) {
	return c.chapter.UpdateChapter(chapters)
}

var _ ChapterAppInterface = &chapterApp{}

type ChapterAppInterface interface {
	SaveChapter(*entities.Chapter) (*entities.Chapter, map[string]string)
	GetChapter(uint64) (*entities.Chapter, error)
	GetChapters(uint64) ([]*entities.Chapter, error)
	UpdateChapter(*entities.Chapter) (*entities.Chapter, map[string]string)
	DeleteChapter(uint64) error
	DeleteChapters(uint64) error
}
