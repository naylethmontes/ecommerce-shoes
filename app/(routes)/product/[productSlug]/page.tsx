"use client"
import { useGetProductSlug } from "@/api/getProductSlug"
import { ResponseType } from "@/types/response"
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"
import ReviewsSection from "@/components/reviewsSection"

export default function Page() {
  const params = useParams()
  const { productSlug } = params;
  const { result }: ResponseType = useGetProductSlug(productSlug)

  if (result === null) {
    return <SkeletonProduct />
  }

  const product = result[0]

  return (
    <div className="max-w-6xl mx-auto sm:py-18 sm:px-6 lg:px-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start p-2">
        <CarouselProduct images={result[0].attributes.images} />
        <InfoProduct product={result[0]} />
      </div>
      <ReviewsSection productId={product.id} />
    </div>
  )


}