export type CommentType = {
	id: number;
	user: {
		id: number;
		name: string;
		avatar: string;
	};
	message: string;
	root_id?: number;
	parent_id?: number;
	like_count: number;
	dislike_count: number;
	child_count: number;
	date: string;
};
