import axios from 'axios';

export const MakePaymentRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
