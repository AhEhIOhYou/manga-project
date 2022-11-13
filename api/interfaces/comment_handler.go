package interfaces

import (
	"github.com/AhEhIOhYou/manga-project/api/application"
	"github.com/gin-gonic/gin"
)

type Comment struct {
	comApp   application.CommentAppInterface
}

func NewComment(comApp application.CommentAppInterface) *Comment {
	return &Comment{
		comApp: comApp,
	}
}

func (com *Comment) SaveComment(ctx *gin.Context) {
	
}