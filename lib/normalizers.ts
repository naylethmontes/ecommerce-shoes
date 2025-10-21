import { ProductType } from '@/types/product';
import { ColorType } from '@/types/colors';

export function normalizeProduct(raw: unknown): ProductType {
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
	const rRec = (raw as Record<string, unknown>) ?? {};
	const getString = (v: unknown) => (typeof v === 'string' ? v : '');

	// Helper para intentar extraer url desde la forma antigua: attributes.mainImage.data.attributes.url
	const attrs =
		(rRec.attributes as Record<string, unknown> | undefined) ?? undefined;
	let urlFromData: string | undefined;
	if (
		attrs &&
		typeof attrs.mainImage === 'object' &&
		attrs.mainImage !== null
	) {
		const main = attrs.mainImage as Record<string, unknown>;
		const data =
			(main.data as Record<string, unknown> | undefined) ?? undefined;
		const dataAttrs =
			(data?.attributes as Record<string, unknown> | undefined) ?? undefined;
		if (dataAttrs) urlFromData = getString(dataAttrs.url);
	}

	if (urlFromData) {
		const id = typeof rRec.id === 'number' ? rRec.id : 0;
		const categoryName = getString(attrs?.categoryName ?? rRec.categoryName);
		const slug = getString(attrs?.slug ?? rRec.slug);
		return {
			id,
			attributes: {
				categoryName,
				slug,
				mainImage: { data: { attributes: { url: getString(urlFromData) } } },
			},
		};
	}

	// Forma plana con formats / url
	const flat = rRec;
	const flatAttrs =
		(flat.attributes as Record<string, unknown> | undefined) ?? undefined;
	const maybeMain = flatAttrs?.mainImage ?? (flat.mainImage as unknown);
	let imageUrl = '';
	if (maybeMain && typeof maybeMain === 'object') {
		const mm = maybeMain as Record<string, unknown>;
		const maybeFormats =
			(mm.formats as Record<string, unknown> | undefined) ?? undefined;
		const medium = maybeFormats?.medium as Record<string, unknown> | undefined;
		imageUrl = getString(medium?.url ?? mm.url);
	}

	return {
		id: typeof flat.id === 'number' ? flat.id : 0,
		attributes: {
			categoryName: getString(flatAttrs?.categoryName ?? flat.categoryName),
			slug: getString(flatAttrs?.slug ?? flat.slug),
			mainImage: { data: { attributes: { url: getString(imageUrl) } } },
		},
	};
}
