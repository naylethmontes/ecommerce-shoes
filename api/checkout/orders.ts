import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Método no permitido' });
	}

	const { buyer, cartItems, totalPrice, reference } = req.body;

	if (!buyer || !cartItems || !totalPrice || !reference) {
		return res.status(400).json({ error: 'Faltan datos para crear la orden' });
	}

	const {
		STRAPI_API_URL,
		STRAPI_API_TOKEN,
		WOMPI_PUBLIC_KEY,
		NEXT_PUBLIC_SITE_URL,
	} = process.env;

	if (
		!STRAPI_API_URL ||
		!STRAPI_API_TOKEN ||
		!WOMPI_PUBLIC_KEY ||
		!NEXT_PUBLIC_SITE_URL
	) {
		return res
			.status(500)
			.json({ error: 'Faltan variables de entorno requeridas' });
	}

	try {
		const { email, phone } = buyer;

		const orderRes = await axios.post(
			`${STRAPI_API_URL}/orders`,
			{
				data: {
					email,
					phone,
					buyer,
					items: cartItems,
					status: 'pending',
					total_price: totalPrice,
					wompiId: reference,
				},
			},
			{
				headers: {
					Authorization: `Bearer ${STRAPI_API_TOKEN}`,
				},
			},
		);

		console.log('✅ Orden creada en Strapi:', orderRes.data?.data?.id);

		return res.status(200).json({
			reference,
			amountInCents: totalPrice * 100,
			currency: 'COP',
			publicKey: WOMPI_PUBLIC_KEY,
			redirectUrl: `${NEXT_PUBLIC_SITE_URL}/success`,
		});
	} catch (err) {
		console.error('❌ Error al crear la orden en Strapi:', err);
		return res.status(500).json({ error: 'Error al crear la orden' });
	}
}
