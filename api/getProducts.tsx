import { CategoryType } from "@/types/category";
import { useEffect, useState } from "react"

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`
  const [result, setResult] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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