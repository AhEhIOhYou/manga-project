package entities

import "time"

type Page struct {
	ID           uint64    `json:"id"`
	Url          string    `json:"url"`
	LoaderUserID uint64    `json:"loader_user_id"`
	ChapterId    uint64    `json:"chapter_id"`
	CreatedAt    time.Time `json:"created_at"`
}

func (p *Page) Prepare() {
	p.CreatedAt = time.Now()
}

func (p *Page) Validate() string {
	var error string = ""
	if p.Url == "" || p.Url == "null" {
		error = "url is required"
	}
	return error
}
