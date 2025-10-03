import { v4 as uuidv4 } from 'uuid';

export function redirectToWompiCheckout({
	amount,
	email,
}: {
	amount: number;
	email: string;
}) {
	const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!;
	const reference = uuidv4(); // referencia única
	const amountInCents = Math.round(amount * 100); // convertir a centavos

	const url = new URL('https://checkout.wompi.co/p/');
	url.searchParams.set('public-key', publicKey);
	url.searchParams.set('currency', 'COP');
	url.searchParams.set('amount-in-cents', amountInCents.toString());
	url.searchParams.set('reference', reference);
	url.searchParams.set(
		'redirect-url',
		`${process.env.NEXT_PUBLIC_SITE_URL}/success`,
	);
	url.searchParams.set('customer-email', email);

	window.location.href = url.toString();
}
