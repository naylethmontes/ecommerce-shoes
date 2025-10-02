"use client";
import { useGetReviews } from "@/api/getReviews";
import { useAuth } from "@/hooks/useAuth";
import AddReview from "./addReview";
import { formatDate } from "@/lib/formatDate";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewsSection({ productId }: { productId: number }) {
  const { user } = useAuth();
  const { reviews, loading, fetchReviews } = useGetReviews(productId);
  const [visibleCount, setVisibleCount] = useState(5);
  const router = useRouter();

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <div className="mt-10 space-y-6 p-3">
      <h2 className="text-2xl font-sans"> Reseñas</h2>

      {/* Formulario visible solo si hay usuario */}
      {user ? (
        <AddReview productId={productId} onDone={fetchReviews} />
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition">
          Agregar reseña
        </button>
      )}

      {/* Lista de reseñas */}
      {reviews.length === 0 ? (
        <p className="text-gray-500 italic">
          Sé el primero en dejar una reseña ✍️
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {reviews.slice(0, visibleCount).map((review) => (
              <li
                key={review.id}
                className="border-b border-gray-200 pb-4"
              >
                {/* Estrellas */}
                <p className="text-yellow-500 mb-2">
                  {"⭐".repeat(review.attributes.rating)}
                </p>
                {/* Nombre y fecha */}
                <div className="flex items-center justify-between mb-2">
                  <p className="font-serif font-semibold text-lg text-gray-900 px-2 dark:text-gray-200">
                    {review.attributes.user?.data?.attributes.username ||
                      review.attributes.username || "Usuario"}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.attributes.createdAt)}
                  </span>
                </div>

                {/* Comentario */}
                <p className="text-gray-700 text-base font-sans leading-relaxed dark:text-gray-400">
                  {review.attributes.comment}
                </p>
              </li>
            ))}
          </ul>

          {visibleCount < reviews.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setVisibleCount(visibleCount + 5)}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg shadow hover:bg-gray-500 transition"> Ver más reseñas
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}