package interfaces

import "github.com/AhEhIOhYou/manga-project/api/application"

type Chapter struct {
	chapterApp application.ChapterAppInterface
}

func NewChapter(chApp application.ChapterAppInterface) *Chapter {
	return &Chapter{
		chapterApp: chApp,
	}
}