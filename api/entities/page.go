package entities

import "time"

type Page struct {
	ID           uint64
	Url          string
	LoaderUserID uint64
	CreatedAt    time.Time
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
