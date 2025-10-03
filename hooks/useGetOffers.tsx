import { ProductType } from "@/types/product"
import { useEffect, useState } from "react"

export function useGetOffers() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[discount][$gt]=0&populate=images`
  const [result, setResult] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
        setLoading(false)
      } catch (error: unknown) {
        setError("Error desconocido")
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
