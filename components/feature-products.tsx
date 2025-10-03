"use client";

import { useGetFeatureProducts } from "@/hooks/useGetFeatureProducts";
import { ProductType } from "@/types/product";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonShema from "./skeletonSchema";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

const FeatureProducts = () => {
  const { result, loading } = useGetFeatureProducts();
  const router = useRouter()
  const { addItem } = useCart()


  return (
    <div className="mx-auto max-w-6xl py-4 sm:py-16 sm:px-24">
      <h3 className="font-sans px-6 text-4xl sm:pb-8">Productos destacados</h3>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonShema grid={3} />}


          {result?.map((product: ProductType) => {

            const { attributes } = product
            const { slug, images, productName, taste, style } = attributes
            return (
              <CarouselItem
                key={product.id}
                className="group md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="py-4 border-gray-200 shadow-none">
                    <CardContent className="relative flex items-center justify-center px-6 py-2">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images.data[0].attributes.url}`}
                        alt={product.attributes.productName}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <div className="absolute bottom-5 w-full opacity-0 transition duration-300 group-hover:opacity-100">
                        <div className="flex justify-center gap-x-6 text-white">
                          <IconButton
                            onClick={() => router.push(`product/${slug}`)}
                            icon={<Expand size={20} />}
                            className="text-gray-600" />

                          <IconButton
                            onClick={() => addItem({
                              ...product,
                              selectedSize: undefined,
                              selectedColor: undefined,
                              selectedColorImage: undefined,
                              cartItemId: crypto.randomUUID(),
                            })}
                            icon={<ShoppingCart size={20} />}
                            className="text-gray-600" />

                        </div>
                      </div>
                    </CardContent>
                    <div className="flex justify-between gap-3 px-2">
                      <h3 className="text-lg font-sans">{productName}</h3>
                      <div className="font-serif flex items-center justify-between gap-3">
                        <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{taste}</p>
                        <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit dark:bg-amber-900">{style}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeatureProducts;
