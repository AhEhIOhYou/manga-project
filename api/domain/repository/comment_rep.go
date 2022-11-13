package repository

import "github.com/AhEhIOhYou/manga-project/api/domain/entities"

type CommentRepository interface {
	SaveComment(*entities.Comment) (*entities.Comment, map[string]string)
	GetComment(uint64) (*entities.Comment, error)
	GetComments(uint64, uint64, uint64) ([]entities.Comment, error)
}