import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"
import { normalizeProduct } from '@/lib/normalizers'
import IconButton from "@/components/icon-button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"

type ProductCardProps = {
  product: ProductType
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props
  const normalized = normalizeProduct(product)
  const router = useRouter()

  // Asegurarse de que product y product.attributes existan antes de renderizar el link
  const productSlug = normalized.attributes.slug;
  return (
    <Link href={productSlug ? `/product/${productSlug}` : '#'} className="relative m-auto transition-all duration-100 rounded-lg hover:shadow-md px-3">
      <div className="font-serif absolute flex items-center justify-between gap-2 px-2 z-[1] top-2">
        <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-black dark:text-white w-fit">{normalized.attributes.taste}</p>
        <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit dark:bg-amber-900">{normalized.attributes.style}</p>

      </div>
      <Carousel opts={{
        align: "start"
      }}
        className="w-full max-w-sm "
      >
        <CarouselContent>
          {normalized.attributes.images?.data?.map((image) => {
            // ✅ Lógica segura para Cloudinary + local + Render
            const rawUrl = image?.attributes?.url;
            const imageUrl = rawUrl?.startsWith("http")
              ? rawUrl
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${rawUrl || ""}`;

            return (
              <CarouselItem key={image.id} className="group">
                <div className="w-full aspect-[3/4] overflow-hidden rounded-md">
                  <Image
                    src={imageUrl}
                    alt={normalized.attributes?.productName || "Producto"}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                  <div className="flex justify-center gap-x-6">
                    <IconButton onClick={() => productSlug && router.push(`/product/${productSlug}`)} icon={<Expand size={20} className="text-gray-600" />} />
                    <IconButton onClick={() => console.log('product')} icon={<ShoppingCart size={20} className="text-gray-600" />} />

                  </div>

                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      <p className="text-2xl text-center font-sans">{normalized.attributes.productName}</p>
      <p className="text-lg font-bold text-center">{formatPrice(normalized.attributes.price)}</p>
    </Link>
  )
}

export default ProductCard