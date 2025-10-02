"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";

import ProductOffer from "./productOffer";

export default function OfferSection() {
  const [offers, setOffers] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[onSale][$eq]=true&populate=*`
        );
        const json = await res.json();
        setOffers(json.data);
      } catch (err) {
        console.error("Error cargando ofertas", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  if (offers.length === 0) return <p className="font-serif text-2xl mt-10 text-center">No hay productos en oferta por ahora.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((product) => (
        <ProductOffer key={product.id} product={product} />
      ))}
    </div>
  );
}
