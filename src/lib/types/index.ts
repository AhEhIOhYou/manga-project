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
	id: number;
	title:string;
	alt_title:string;
	author:string;
	type:string;
	cover:string;
	description:string;
	release_date: Date;
	tags:string;
	loader_user_id:number;
	created_at: Date;
}

export type PublicUserType = {
	id: number;
	name: string;
	avatar: string;
};
