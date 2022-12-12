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
	is_deleted: boolean;
	created_at: Date;
};

export type BookType = {
	id?: number;
	title: string;
	alt_title?: string;
	author: string;
	type: string;
	cover?: string;
	cover_url?: string;
	description?: string;
	release_year?: number;
	loader_user_id: string;
	created_at: string;
	link_title: string;
}

export type ChapterType = {
	id?: number;
	title: string;
	volume?: number;
	number: number;
	translator: string;
	book_id: number;
	loader_user_id: string;
	created_at: string;
	page_count?:number;
}

export type PageType = {
	id?: number;
	file_name: string;
	chapter_id: number;
	loader_user_id: string;
	created_at?: string;
	number: number;
}

export type PublicUserType = {
	id: number;
	name: string;
	avatar: string;
};

export type UserType = {
	id?: number;
	email?: string;
	password?: string;
	username?: string;
	user_id?: string;
	refresh_token?: string;
}
