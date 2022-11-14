package interfaces

import (
	"net/http"

	"github.com/AhEhIOhYou/manga-project/api/application"
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/gin-gonic/gin"
)

type Comment struct {
	comApp application.CommentAppInterface
}

func NewComment(comApp application.CommentAppInterface) *Comment {
	return &Comment{
		comApp: comApp,
	}
}

func (com *Comment) SaveComment(ctx *gin.Context) {

	var requestBody entities.CommentWithUser
	// var comment entities.Comment
	// var responseComment entities.CommentWithUser
	
	if err := ctx.BindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, "invalid_json")
		return
	}

	ctx.JSON(200, requestBody)
}
