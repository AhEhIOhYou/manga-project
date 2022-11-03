package interfaces

import (
	"net/http"
	"strconv"

	"github.com/AhEhIOhYou/manga-project/api/application"
	"github.com/AhEhIOhYou/manga-project/api/domain/entities"
	"github.com/AhEhIOhYou/manga-project/api/interfaces/filemanager"
	"github.com/gin-gonic/gin"
)

type Page struct {
	pageApp application.PageAppInterface
	fm      filemanager.ManagerFileInterface
}

func NewPage(pageApp application.PageAppInterface, fm filemanager.ManagerFileInterface) *Page {
	return &Page{
		pageApp: pageApp,
		fm:      fm,
	}
}

func (p *Page) SavePage(ctx *gin.Context) {
	userId := 1

	chapterId, err := strconv.ParseUint(ctx.PostForm("chapter-id"), 10, 64)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
	}

	file, err := ctx.FormFile("image")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
	}

	url, err := p.fm.UploadFile(file)
	if err != nil || url == "" {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": "failed to upload file ",
		})
		return
	}

	var Page = entities.Page{
		Url:          url,
		LoaderUserID: uint64(userId),
		ChapterId:    chapterId,
	}

	Page.Prepare()
	validateErr := Page.Validate()
	if len(validateErr) > 0 {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": validateErr,
		})
	}

	savedPage, saveErr := p.pageApp.SavePage(&Page)
	if saveErr != nil {
		ctx.JSON(http.StatusInternalServerError, saveErr)
		return
	}

	ctx.JSON(http.StatusOK, savedPage)
}
