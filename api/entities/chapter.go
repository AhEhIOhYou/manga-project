package entities

import (
	"html"
	"strings"
	"time"
)

type Chapter struct {
	ID           uint64
	Title        string
	LoaderUserID uint64
	Translator   string
	CreatedAt    time.Time
	Pages        []Page
}

func (c *Chapter) Prepare() {
	c.Title = html.EscapeString(strings.TrimSpace(c.Title))
	c.Translator = html.EscapeString(strings.TrimSpace(c.Translator))
	c.CreatedAt = time.Now()
}

func (c *Chapter) BeforeUpdate() {
	c.Title = html.EscapeString(strings.TrimSpace(c.Title))
	c.Translator = html.EscapeString(strings.TrimSpace(c.Translator))
}

func (c *Chapter) Validate() string {
	var error string = ""
	if c.Title == "" || c.Title == "null" {
		error = "title is required"
	}
	if c.Translator == "" || c.Translator == "null" {
		error = "translator is required"
	}
	return error
}
