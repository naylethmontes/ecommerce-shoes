"use client"
import { useGetCategoryProduct } from "@/hooks/useGetCategoryProduct"
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonShema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";

export default function Page() {

  const params = useParams();
  // categorySlug puede ser string | string[] | undefined
  const categorySlug = typeof params.categorySlug === 'string' ? params.categorySlug : Array.isArray(params.categorySlug) ? params.categorySlug[0] : undefined;
  // Solo llama el hook si hay slug, si no, pasa string vacío
  const { result = [], loading }: ResponseType = useGetCategoryProduct(categorySlug || "");
  const [filterStyle, setFilterStyle] = useState('');

  if (!categorySlug) return null;

  // result puede ser array o cualquier cosa, forzamos a array
  const products: ProductType[] = Array.isArray(result) ? result : [];
  // filteredProducts siempre será un array
  const filteredProducts: ProductType[] =
    !loading
      ? (filterStyle === ''
        ? products
        : products.filter((product: ProductType) => product.attributes.style === filterStyle))
      : [];

  const categoryName = products?.[0]?.attributes?.category?.data?.attributes?.categoryName;

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {!loading && categoryName && (
        <h1 className="text-4xl font-serif px-5">
          {categoryName === "Complementos"
            ? "Complementos"
            : `${categoryName}`}
        </h1>
      )}
      <Separator />

      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory setFilterStyle={setFilterStyle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-7">
          {loading && (
            <SkeletonShema grid={3} />
          )}
          {!loading && filteredProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!loading && filteredProducts.length === 0 && (
            <p className="font-serif text-2xl mt-10 text-center">No hay producto con este filtro</p>
          )}
        </div>

      </div>
    </div>
  )
}