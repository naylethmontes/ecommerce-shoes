import Image from "next/image"
import { useRouter } from "next/navigation"

interface ImagesOnClickProps {
  slug: string
  url: string
}

const ImagesOnClick = (props: ImagesOnClickProps) => {
  const { slug, url } = props
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/product/${slug}`)} className="cursor-pointer ">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
        alt="Product"
        width={500}
        height={500}
        className="max-w-full h-full sm:w-auto sm:h-50 overflow-hidden rounded-md"
      />
    </div>
  )
}

export default ImagesOnClick