package entities

import "time"

type Comment struct {
	ID           uint64     `json:"id"`
	User         UserPublic `json:"user"`
	BookId       uint64     `json:"book_id"`
	ChapterId    uint64     `json:"chapter_id"`
	Message      string     `json:"message"`
	RootId       uint64     `json:"root_id"`
	ParentId     uint64     `json:"parent_id"`
	LikeCount    int        `json:"like_count"`
	DislikeCount int        `json:"dislike_count"`
	ChildCount   int        `json:"child_count"`
	CreatedAt    time.Time  `json:"created_at"`
}
