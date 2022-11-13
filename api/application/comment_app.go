package application

import (
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
)

type commentApp struct {
	comment repository.CommentRepository
}

// GetComment implements CommentAppInterface
func (c *commentApp) GetComment(commentId uint64) (*entities.Comment, error) {
	return c.comment.GetComment(commentId)
}

// GetComments implements CommentAppInterface
func (c *commentApp) GetComments(bookId uint64, chapterId uint64, parentId uint64) ([]entities.Comment, error) {
	return c.comment.GetComments(bookId, chapterId, parentId)
}

// SaveComment implements CommentAppInterface
func (c *commentApp) SaveComment(comment *entities.Comment) (*entities.Comment, map[string]string) {
	return c.comment.SaveComment(comment)
}

var _ CommentAppInterface = &commentApp{}

type CommentAppInterface interface {
	SaveComment(*entities.Comment) (*entities.Comment, map[string]string)
	GetComment(uint64) (*entities.Comment, error)
	GetComments(uint64, uint64, uint64) ([]entities.Comment, error)
}
