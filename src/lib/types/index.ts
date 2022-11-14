export type CommentType = {
	id: number;
	user: PublicUserType;
	book_id: number;
	chapter_id: number;
	message: string;
	root_id: number;
	parent_id: number;
	like_count: number;
	dislike_count: number;
	child_count: number;
	date: string;
};

export type PublicUserType = {
	id: number;
	name: string;
	avatar: string;
} 