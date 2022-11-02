package entities

import (
	"html"
	"strings"
	"time"
)

type Book struct {
	ID           uint64
	Title        string
	AltTitle     string
	Author       string
	Type         string
	Description  string
	ReleaseDate  time.Time
	Tags         []string
	Chapters     []Chapter
	LoaderUserID uint64
	CreatedAt    time.Time
}

func (b *Book) Prepare() {
	b.Title = html.EscapeString(strings.TrimSpace(b.Title))
	b.AltTitle = html.EscapeString(strings.TrimSpace(b.AltTitle))
	b.Author = html.EscapeString(strings.TrimSpace(b.Author))
	b.Description = html.EscapeString(strings.TrimSpace(b.Description))
	b.CreatedAt = time.Now()
}

func (b *Book) BeforeUpdate() {
	b.Title = html.EscapeString(strings.TrimSpace(b.Title))
	b.AltTitle = html.EscapeString(strings.TrimSpace(b.AltTitle))
	b.Author = html.EscapeString(strings.TrimSpace(b.Author))
	b.Description = html.EscapeString(strings.TrimSpace(b.Description))
}

func (b *Book) Validate() string {
	var error string = ""
	if b.Title == "" || b.Title == "null" {
		error = "title is required"
	}
	if b.Author == "" || b.Author == "null" {
		error = "author is required"
	}
	if b.Type == "" || b.Type == "null" {
		error = "type is required"
	}
	return error
}
