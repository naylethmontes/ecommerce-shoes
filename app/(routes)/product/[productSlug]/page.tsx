"use client"
import { useGetProductSlug } from "@/api/getProductSlug"
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"
import ReviewsSection from "@/components/reviewsSection"

export default function Page() {
  const params = useParams<{ productSlug: string }>()
  const productSlug = params.productSlug

  const { result, loading, error } = useGetProductSlug(productSlug || "")

  if (loading) return <SkeletonProduct />

  if (error) return <p className="text-center py-10">Error: {error}</p>

  if (!result || result.length === 0) {
    return <SkeletonProduct />
  }

  const product = result[0];

  return (
    <div className="max-w-6xl mx-auto sm:py-18 sm:px-6 lg:px-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start p-2">
        <CarouselProduct images={product.attributes.images} />
        <InfoProduct product={result[0]} />
      </div>
      <ReviewsSection productId={product.id} />
    </div>
  )


}