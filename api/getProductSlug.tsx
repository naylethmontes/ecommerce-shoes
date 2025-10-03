import { useEffect, useState } from "react"

export function useGetProductSlug(slug?: string | string[]) {

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()

        setResult(json.data)
        setLoading(false)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Unknown error")
        setLoading(false)


      }
    })()
  }, [url])

  return { loading, result, error }
}