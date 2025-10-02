
import { ProductType } from "@/types/product";
import { useEffect, useState } from "react"

export function useGetFeatureProducts() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`
  const [result, setResult] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
        setLoading(false)
      } catch (error: any) {
        setError(error.message || "Unknown error")
        setLoading(false)


      }
    })()
  }, [url])

  return { loading, result, error }


}
