import { ColorType } from './colors';

export type ProductType = {
	id: number;
	attributes: {
		productName: string;
		slug: string;
		description: string;
		active: boolean;
		isFeatured: boolean;
		taste: string;
		style: string;
		gender: string;
		price: number;
		stock: number;
		discount?: number;
		images: {
			data: {
				id: number;
				attributes: {
					url: string;
				};
			}[];
		};
		sizes?: {
			data: {
				id: number;
				attributes: {
					name: string;
				};
			}[];
		};
		category: {
			data: {
				attributes: {
					slug: string;
					categoryName: string;
				};
			};
		};
		colors: {
			data: ColorType[];
		};
	};
};
