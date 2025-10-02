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
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
        alt="Product"
        className="max-w-full h-full sm:w-auto sm:h-50 overflow-hidden rounded-md"
      //className="w-20 h-20 object-cover rounded-md border"
      />
    </div>
  )
}

export default ImagesOnClick