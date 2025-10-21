import Image from "next/image";

interface ImagesOfferProps {
  slug: string;
  url: string;
}

const ImagesOffers = ({ url }: ImagesOfferProps) => {

  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  const trimmedUrl = url?.trim() ?? "";
  const imageUrl = trimmedUrl
    ? trimmedUrl.startsWith("http")
      ? trimmedUrl
      : `${base.replace(/\/$/, "")}/${trimmedUrl.replace(/^\//, "")}`
    : "";

  return (
    <div className="cursor-pointer">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Producto en oferta"
          width={500}
          height={500}
          className="w-full h-100 object-cover rounded-md transition-transform group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-100 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
          Sin imagen
        </div>
      )}
    </div>
  );
};
export default ImagesOffers;
