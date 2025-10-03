"use client";
import { useGetOffers } from "@/hooks/useGetOffers";
import ProductOffer from "./components/productOffer";
import { Separator } from "@/components/ui/separator";

export default function OffersPage() {
  const { result: products, loading } = useGetOffers();

  if (loading) return <p className="font-serif text-2xl text-center mt-10">Cargando ofertas...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-sans mb-8">Ofertas Exclusivas <Separator />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductOffer key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
