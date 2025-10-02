export interface ReviewsType {
	id: number;
	attributes: {
		username: string;
		comment: string;
		rating: number;
		createdAt: string;
		user?: {
			data?: {
				id: number;
				attributes: {
					username: string;
				};
			};
		};
	};
}
