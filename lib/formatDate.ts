export function formatDate(dateString: string) {
	const date = new Date(dateString);
	const now = new Date();
	const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // en segundos

	if (diff < 60) return 'hace unos segundos';
	if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
	if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
	if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`;

	return date.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
