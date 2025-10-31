"use client";
import { useEffect, useState } from "react";
import { ReviewType } from "@/types/reviews";

export function useGetReviews(productId: number) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?productId=${productId}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Error al obtener reseñas");
      const data = await res.json();

      setReviews(data.data || []);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return { reviews, loading, fetchReviews };
}