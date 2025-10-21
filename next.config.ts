/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost', // 👈 dominio de tu Strapi en local
				port: '1337', // 👈 puerto de tu Strapi
				pathname: '/uploads/**',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com', // 👈 cuando subas a producción
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'ecommerce-shoes-backend-2.onrender.com', // 👈 dominio de tu Strapi en render
				pathname: '/uploads/**',
			},
		],
	},
};

module.exports = nextConfig;
