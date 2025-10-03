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
				hostname: 'tu-dominio-de-produccion.com', // 👈 cuando subas a producción
				pathname: '/uploads/**',
			},
		],
	},
};

module.exports = nextConfig;
