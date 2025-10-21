import Image from "next/image"
import { useRouter } from "next/navigation"

type ImagesOnClickProps = {
  slug?: string
  url?: string
}

const ImagesOnClick = (props: ImagesOnClickProps) => {
  const { slug, url } = props || {};
  const router = useRouter()

  const handleClick = () => {
    if (slug) router.push(`/product/${slug}`)
  }
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
  const imageUrl = url
    ? url.startsWith("http")
      ? url
      : `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`
    : "";

  return (
    <div onClick={handleClick} className="cursor-pointer ">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Product"
          width={500}
          height={500}
          className="max-w-full h-full sm:w-auto sm:h-50 overflow-hidden rounded-md"
        />
      ) : (
        <div className="w-28 h-28 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">Sin imagen</div>
      )}
    </div>
  )
}

export default ImagesOnClick