"use client"
import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonShema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";

export default function Page() {
  const params = useParams()
  const { categorySlug } = params

  if (!categorySlug) return null;
  const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug)
  const [filterStyle, setFilterStyle] = useState('')
  const router = useRouter()

  const filteredProducts = result !== null && !loading && (
    filterStyle === ''
      ? result
      : result.filter((product: ProductType) => product.attributes.style === filterStyle)
  )

  const categoryName = result?.[0]?.attributes?.category?.data?.attributes?.categoryName

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
          {filteredProducts !== null && !loading && (
            filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
          {filteredProducts !== null && !loading && filteredProducts.length === 0 && (
            <p className="font-serif text-2xl mt-10 text-center">No hay producto con este filtro</p>
          )}
        </div>

      </div>
    </div>
  )
}