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
	link_title: string;
	author_id?: number;
	author?: string;
	type_id?: number;
	type?: string;
	cover?: string;
	cover_url?: string;
	description?: string;
	release_year?: number;
	loader_user_id: string;
	loader_username?: string;
	created_at: string;
	avgColor?: string;
}

export type ChapterType = {
	id?: number;
	title: string;
	volume?: number;
	number: number;
	translator: number;
	book_id: number;
	loader_user_id: string;
	created_at: string;
	page_count?: number;
	global_number?: number;
}

export type PageType = {
	id?: number;
	file_name: string;
	url?: string;
	chapter_id: number;
	loader_user_id: string;
	created_at?: string;
	number: number;
}

export type PublicUserType = {
	id: string;
	name: string;
	avatar?: string;
};

export type UserType = {
	id?: number;
	email?: string;
	password?: string;
	username?: string;
	user_id?: string;
	refresh_token?: string;
	avatar?: string;
}

export type AuthorType = {
	id?: number;
	name: string;
}

export type TranslationTeamType = {
	id?: number;
	name: string;
	owner_id: string;
	party?: PublicUserType[];
}

export type TranslationTeamInfoType = {
	id: number;
	name: string;
	description?: string;
	members: PublicUserType[];
}

export type GenreType = {
	id?: number;
	name: string;
	book_count?: number;
}

export type BookGenreType = {
	book_id: number;
	genre_id: number;
}

export type OrderByItemType = {
	by: string;
	order: string;
}

export type FilterItemType = {
	name: string;
	logic_group: string;
	gt?: number;
	lt?: number;
	gte?: number;
	lte?: number;
	equals?: number;
}
