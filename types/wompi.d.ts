// src/types/wompi.d.ts
export {};

declare global {
	interface WompiWidgetOptions {
		currency: string;
		amountInCents: number;
		reference: string;
		publicKey: string;
		redirectUrl?: string;
	}

	interface WompiWidgetResult {
		status: 'APPROVED' | 'DECLINED' | 'PENDING';
		id: string;
		reference: string;
	}

	interface Window {
		WidgetCheckout: new (options: WompiWidgetOptions) => {
			open: (callback?: (result: WompiWidgetResult) => void) => void;
		};
	}
}
