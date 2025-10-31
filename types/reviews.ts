export interface ReviewType {
	id: number;
	username: string;
	comment: string;
	rating: number;
	createdAt: string;
	product: {
		id: number;
		productName: string;
	};
	user: {
		id: number;
		username: string;
	};
}
