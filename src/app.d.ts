// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: {
			id: string
			name: string
			avatar: string
		},
		genres: [{
			id: string
			name: string
			book_count: number
		}],
	}
	interface PageData { }
	// interface Error {}
	// interface Platform {}
}
