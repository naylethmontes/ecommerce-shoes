import { ColorType } from "@/types/colors"
import { useEffect, useState } from "react"

export function useGetColors() {

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/colors?populate=imageColor`
  const [result, setResult] = useState<ColorType[]>([])
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
        setError(error instanceof Error ? error.message : "Unknown error")
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}