"use client"
import { useGetCategories } from "@/hooks/useGetProducts"
import Link from "next/link"
import { CategoryType } from "@/types/category"
import Image from "next/image"

const ChooseCategory = () => {
  const { result, loading } = useGetCategories()

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-4xl font-sans sm:pb-8">Elige tu categoria favorita</h3>

      <div className="grid justify-center gap-5 sm:grid-cols-3 p-4">
        {!loading && Array.isArray(result) && (
          result.map((category: CategoryType) => {
            const slug = category?.attributes?.slug;
            const mainImageUrl = category?.attributes?.mainImage?.data?.attributes?.url;
            const name = category?.attributes?.categoryName || 'Categoria';

            return (
              <Link
                key={category.id}
                href={slug ? `/category/${slug}` : '#'}
                className="relative overflow-hidden bg-no-repeat bg-cover rounded-lg">

                {mainImageUrl && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${mainImageUrl}`}
                    width={500}
                    height={500}
                    alt={name}
                    className="w-full h-full transition duration-300 ease-in-out rounded-lg object-cover hover:scale-110" />
                )}

                <p className="absolute w-full py-2 text-lg font-bold text-center text-black bottom-5 backdrop-blur-lg font-serif">{name}</p>
              </Link>
            )
          })
        )}

      </div>

    </div>
  )
}

export default ChooseCategory