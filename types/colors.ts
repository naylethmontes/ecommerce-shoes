export type ColorType = {
	id: number;
	attributes: {
		name: string;
		createdAt: string;
		updatedAt: string;
		imageColor: {
			data: {
				id: number;
				attributes: {
					url: string;
					name: string;
					alternativeText?: string | null;
				};
			};
		};
	};
};
