import Image from "next/image";

interface ImagesOfferProps {
  slug: string;
  url: string;
}

const ImagesOffers = ({ slug, url }: ImagesOfferProps) => {

  return (
    <div className="cursor-pointer">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
        alt="Product"
        width={500}
        height={500}
        className="w-full h-100 object-cover rounded-md transition-transform group-hover:scale-105"
      />
    </div>
  );
};

export default ImagesOffers;
