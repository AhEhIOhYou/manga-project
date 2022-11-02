package entities

import (
	"html"
	"strings"
	"time"
)

type Book struct {
	ID           uint64    `json:"id"`
	Title        string    `json:"title"`
	AltTitle     string    `json:"alt_title"`
	Author       string    `json:"author"`
	Type         string    `json:"type"`
	Cover        string    `json:"cover"`
	Description  string    `json:"description"`
	ReleaseDate  time.Time `json:"release_date"`
	Tags         []string  `json:"tags"`
	Chapters     []Chapter `json:"chapter"`
	LoaderUserID uint64    `json:"loader_user_id"`
	CreatedAt    time.Time `json:"created_at"`
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
