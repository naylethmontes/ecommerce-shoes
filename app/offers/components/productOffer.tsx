"use client";

import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import ImagesOffers from "@/components/shared/imagesOffers";

type Props = {
  product: ProductType;
};

const applyDiscount = (price: number, discount?: number | null) => {
  if (!discount || discount <= 0) return price;
  return price - (price * discount) / 100;
};

export default function ProductOffer({ product }: Props) {
  const { productName, slug, price, discount } = product.attributes;

  const rawDiscount = product.attributes.discount ?? 0;
  const finalPrice = applyDiscount(price, discount);
  const imageUrl = product.attributes.images?.data?.[0]?.attributes?.url



  return (
    <Link href={`/product/${slug}`} className="relative group block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      {rawDiscount > 0 && (
        <span className="absolute top-2 left-2 bg-amber-700 text-white text-lg px-2 py-1 rounded-full z-10">
          -{discount}%
        </span>
      )}

      {imageUrl && (
        <ImagesOffers slug={slug} url={imageUrl} />
      )}

      <div className="p-4">
        <h3 className="text-2xl font-sans mb-1">{productName}</h3>
        <div className="text-md">
          {rawDiscount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-600 font-bold">{formatPrice(price)}</span>
              <span className="text-amber-700 font-bold text-lg">{formatPrice(finalPrice)}</span>
            </div>
          ) : (
            <span className="text-black">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
