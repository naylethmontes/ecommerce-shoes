"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetReviews } from "@/api/getReviews";

export default function AddReview({
  productId,
  onDone,
}: {
  productId: number;
  onDone: () => void;
}) {
  const { token, user } = useAuth();
  const { reviews } = useGetReviews(productId);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !user) {
      router.push("/login");
      return;
    }

    if (!comment.trim()) {
      toast.error("El comentario es obligarotio");
      return;
    }

    if (!rating) {
      return toast.error("La calificación es obligatoria");
    }

    const alreadyReviewed = user
      ? reviews.some(
        (review) => review.attributes.user?.data?.id === user?.id
      ) : false;
    console.log(reviews);

    if (alreadyReviewed) {
      toast.error("Ya agregaste reseña a este producto");
      setOpen(false);
      setComment("");
      setRating(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              comment,
              rating,
              username: user?.username,
              product: productId,
              user: user?.id,
            },
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        const message = errorData?.error?.message || "Error guardando reseña";
        toast.error(message);
      }

      // Resetear formulario
      setComment("");
      setRating(null);
      setOpen(false);
      // Refrescar lista de reseñas
      onDone();
      toast.success("Reseña enviada con exito");
    } catch (err: unknown) {
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      {/* Botón inicial */}
      <button
        onClick={() => setOpen(true)}
        className="bg-gray-800 text-white font-sans px-3 py-2 rounded-lg hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600"
      >
        Agregar reseña
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative ">
            {/* Cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Título */}
            <h2 className="text-lg font-semibold mb-4 dark:text-black">Nueva reseña</h2>

            {/* Nombre del usuario */}
            {user && (
              <p className="text-sm font-semibold text-gray-600 mb-2">
                Publicando como <span className="font-serif">{user.username}</span>
              </p>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Estrellas */}
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={28}
                    className={`cursor-pointer ${rating && n <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    onClick={() => setRating(n)}
                  />
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe tu reseña..."
                maxLength={500}
                className="w-full p-2 border rounded-lg font-serif dark:text-black dark:bg-gray-300"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 "
              >
                {loading ? "Enviando..." : "Enviar reseña"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}