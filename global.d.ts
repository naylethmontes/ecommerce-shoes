export {};

declare global {
	interface Window {
		WidgetCheckout: new (
			options: WompiCheckoutOptions,
		) => WompiCheckoutInstance;
	}
}

export interface WompiCheckoutOptions {
	currency: string;
	amountInCents: number;
	reference: string;
	publicKey: string;
	redirectUrl: string;
	integrity?: string;
	customerData?: {
		fullName: string;
		email: string;
		phoneNumber: string;
		phoneNumberPrefix: string;
		legalId: string;
		legalIdType: string;
	};
	responseCallback?: (result: WompiResult) => void;
}

export interface WompiCheckoutInstance {
	open: (callback?: (result: WompiResult) => void) => void;
}

export interface WompiResult {
	status: 'APPROVED' | 'DECLINED' | 'PENDING' | string;
	id?: string;
	payment_method_type?: string;
	payment_method?: unknown;
	[key: string]: unknown;
}
