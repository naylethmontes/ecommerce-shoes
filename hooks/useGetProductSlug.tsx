import { useEffect, useState } from "react";
import { ProductType } from "@/types/product"; // 👈 define bien este tipo

export function useGetProductSlug(slug?: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`;

  const [result, setResult] = useState<ProductType[] | null>(null); // 👈 array o null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return; // 👈 evita fetch innecesario

    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        setResult(json.data as ProductType[]); // 👈 fuerza el tipo
        setLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    })();
  }, [url, slug]); // 👈 agrega slug a las dependencias

  return { loading, result, error };
}
