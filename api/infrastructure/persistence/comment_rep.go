package persistence

import (
	"errors"

	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/domain/repository"
	"gorm.io/gorm"
)

type CommentRepo struct {
	db *gorm.DB
}

// GetComment implements repository.CommentRepository
func (c *CommentRepo) GetComment(id uint64) (*entities.Comment, error) {
	var comment entities.Comment
	err := c.db.Debug().Where("id = ?", id).Take(&comment).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("comment not found")
	}
	if err != nil {
		return nil, errors.New("database error get comment")
	}
	return &comment, nil
}

// GetComments implements repository.CommentRepository
func (c *CommentRepo) GetComments(bookId uint64, chapterId uint64, parentId uint64) ([]entities.Comment, error) {
	var comments []entities.Comment
	err := c.db.Debug().Table("comments").Order("created_at asc").
		Where("book_id = ? AND chapter_id = ? AND parent_id = ?", bookId, chapterId, parentId).Find(&comments).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("comments not found")
	}
	if err != nil {
		return nil, errors.New("database error get comments")
	}
	return comments, nil
}

// TODO поменять все map[string]string на errors
// SaveComment implements repository.CommentRepository
func (c *CommentRepo) SaveComment(comment *entities.Comment) (*entities.Comment, map[string]string) {
	dbErr := map[string]string{}
	err := c.db.Debug().Create(&comment).Error
	if err != nil {
		dbErr["db_error"] = "save comment error"
		return nil, dbErr
	}
	return comment, nil
}

var _ repository.CommentRepository = &CommentRepo{}

func NewCommentRepo(db *gorm.DB) *CommentRepo {
	return &CommentRepo{
		db: db,
	}
}
