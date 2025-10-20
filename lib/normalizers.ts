import { ProductType } from '@/types/product';
import { ColorType } from '@/types/colors';

// Normaliza un objeto de producto que puede venir con o sin 'attributes'.
// Evitamos usar `any` en la API pública: el parámetro es `unknown` y hacemos
// chequeos locales antes de leer propiedades.
export function normalizeProduct(raw: unknown): ProductType {
	// Si ya tiene la forma esperada, devolver como tal
	if (
		typeof raw === 'object' &&
		raw !== null &&
		'attributes' in (raw as Record<string, unknown>)
	) {
		return raw as ProductType;
	}

	const r = (raw as Record<string, unknown>) ?? {};

	const getString = (v: unknown): string => (typeof v === 'string' ? v : '');
	const getNumber = (v: unknown): number => (typeof v === 'number' ? v : 0);

	const getDataArray = (val: unknown): unknown[] => {
		if (Array.isArray(val)) return val;
		if (typeof val === 'object' && val !== null) {
			const rec = val as Record<string, unknown>;
			const maybe = rec.data;
			if (Array.isArray(maybe)) return maybe;
		}
		return [];
	};

	const normalizeImageArray = (
		images: unknown,
	): ProductType['attributes']['images'] => {
		const arr = getDataArray(images);
		return {
			data: arr.map((img) => {
				if (typeof img === 'object' && img !== null) {
					const obj = img as Record<string, unknown>;
					const id = typeof obj.id === 'number' ? obj.id : 0;
					const attrs = obj.attributes;
					if (typeof attrs === 'object' && attrs !== null) {
						const a = attrs as Record<string, unknown>;
						const url = getString(a.url ?? a['url']);
						return { id, attributes: { url } };
					}
					const url = getString(obj['url'] ?? obj['url']);
					return { id, attributes: { url } };
				}
				// img could be a string (url)
				return { id: 0, attributes: { url: getString(img) } };
			}),
		};
	};

	const attributes: ProductType['attributes'] = {
		productName: getString(r.productName ?? r.name),
		slug: getString(r.slug),
		description: getString(r.description),
		active: typeof r.active === 'boolean' ? (r.active as boolean) : true,
		isFeatured:
			typeof r.isFeatured === 'boolean' ? (r.isFeatured as boolean) : false,
		taste: getString(r.taste),
		style: getString(r.style),
		gender: getString(r.gender),
		price: getNumber(r.price),
		stock: getNumber(r.stock),
		discount: getNumber(r.discount),
		images: normalizeImageArray(r.images ?? r.image ?? []),
		sizes: (() => {
			const s = r.sizes ?? null;
			const data = getDataArray(s);
			return {
				data: data.map((it) => {
					if (typeof it === 'object' && it !== null) {
						const obj = it as Record<string, unknown>;
						const attrs = obj.attributes as Record<string, unknown> | undefined;
						const name = attrs ? getString(attrs.name) : getString(obj['name']);
						return {
							id: typeof obj.id === 'number' ? obj.id : 0,
							attributes: { name },
						};
					}
					return { id: 0, attributes: { name: getString(it) } };
				}),
			};
		})(),
		category: (() => {
			const c = r.category ?? null;
			if (typeof c === 'object' && c !== null) {
				const rec = c as Record<string, unknown>;
				const data = rec.data as Record<string, unknown> | undefined;
				const attrs = data?.attributes as Record<string, unknown> | undefined;
				return {
					data: {
						attributes: {
							slug: getString(attrs?.slug),
							categoryName: getString(attrs?.categoryName),
						},
					},
				};
			}
			return { data: { attributes: { slug: '', categoryName: '' } } };
		})(),
		colors: (() => {
			const c = r.colors ?? null;
			const data = getDataArray(c);
			const mapped: ColorType[] = data.map((it) => {
				if (typeof it === 'object' && it !== null) {
					const obj = it as Record<string, unknown>;
					const id = typeof obj.id === 'number' ? obj.id : 0;
					const attrs = obj.attributes as Record<string, unknown> | undefined;
					const name = attrs ? getString(attrs.name) : getString(obj['name']);

					// Normalize imageColor to the expected shape
					let imageColorData = {
						id: 0,
						attributes: {
							url: '',
							name: '',
							alternativeText: undefined as string | undefined,
						},
					};
					const rawImageColor = attrs?.imageColor ?? obj['imageColor'];
					if (typeof rawImageColor === 'object' && rawImageColor !== null) {
						const d = (rawImageColor as Record<string, unknown>).data as
							| Record<string, unknown>
							| undefined;
						if (d) {
							imageColorData = {
								id: typeof d.id === 'number' ? d.id : 0,
								attributes: {
									url: getString(
										(d.attributes as Record<string, unknown>)?.url,
									),
									name: getString(
										(d.attributes as Record<string, unknown>)?.name,
									),
									alternativeText: undefined,
								},
							};
						}
					}

					return {
						id,
						attributes: {
							name,
							createdAt: '',
							updatedAt: '',
							imageColor: { data: imageColorData },
						},
					};
				}
				return {
					id: 0,
					attributes: {
						name: getString(it),
						createdAt: '',
						updatedAt: '',
						imageColor: {
							data: {
								id: 0,
								attributes: { url: '', name: '', alternativeText: undefined },
							},
						},
					},
				};
			});
			return { data: mapped };
		})(),
	};

	return {
		id: typeof r.id === 'number' ? (r.id as number) : 0,
		attributes,
	} as ProductType;
}

// Normaliza una categoría que puede venir plana o con { attributes: { mainImage: { data: { attributes: { url }}}}}
export function normalizeCategory(raw: unknown) {
	const r = (raw as Record<string, unknown>) ?? {};
	const getString = (v: unknown) => (typeof v === 'string' ? v : '');

	// intentar forma antigua
	const urlFromData = (r as any)?.attributes?.mainImage?.data?.attributes?.url;
	if (urlFromData) {
		return {
			id: typeof (r as any).id === 'number' ? (r as any).id : 0,
			attributes: {
				categoryName: getString(
					(r as any).attributes?.categoryName ?? (r as any).categoryName,
				),
				slug: getString((r as any).attributes?.slug ?? (r as any).slug),
				mainImage: {
					data: {
						attributes: { url: getString(urlFromData) },
					},
				},
			},
		};
	}

	// forma plana con formats / url
	const flat = raw as Record<string, unknown>;
	const maybeMain = (flat.attributes as any)?.mainImage ?? flat.mainImage;
	const imageUrl = maybeMain?.formats?.medium?.url ?? maybeMain?.url ?? '';

	return {
		id: typeof flat.id === 'number' ? flat.id : 0,
		attributes: {
			categoryName: getString(
				(flat.attributes as any)?.categoryName ?? flat.categoryName,
			),
			slug: getString((flat.attributes as any)?.slug ?? flat.slug),
			mainImage: {
				data: {
					attributes: { url: getString(imageUrl) },
				},
			},
		},
	};
}
