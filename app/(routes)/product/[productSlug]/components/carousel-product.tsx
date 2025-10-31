"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

interface CarouselProductProps {
  images: {
    data: {
      id: number
      attributes: {
        url: string
      }
    }[]
  }

  selectedColorImage?: string | null
}

interface ImageData {
  id: number
  attributes: {
    url: string
  }
}
interface CarouselProductProps {
  images: {
    data: ImageData[]
  }
  selectedColorImage?: string | null
}

const CarouselProduct = ({ images, selectedColorImage }: CarouselProductProps) => {
  const validImages = images?.data?.filter((img) => img && img.attributes?.url) || []
  const [selectedImage, setSelectedImage] = useState(
    (images?.data && images.data[0]) ?? { id: 0, attributes: { url: '' } }
  )
  // zoom state: scale (1 = no zoom), and center position as percentages
  const [zoomStyle, setZoomStyle] = useState({
    x: 50, // percent
    y: 50, // percent
    scale: 1,
  })

  useEffect(() => {
    if (selectedColorImage) {
      setSelectedImage({
        id: -1,
        attributes: {
          url: selectedColorImage
        }
      })
    }
  }, [selectedColorImage])

  const getImageUrl = (url?: string | null) => {
    if (!url) return "";

    // Si Strapi devuelve una URL absoluta (Cloudinary, etc)
    if (url.startsWith("http")) return url;

    // Si es relativa (desde Strapi local), añade tu backend local
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };


  const throttleRef = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - throttleRef.current < 16) return; // máximo 60 actualizaciones por segundo
    throttleRef.current = now;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle((prev) => ({ ...prev, x, y }));
  };

  const handleMouseLeave = () => {
    setZoomStyle({ x: 50, y: 50, scale: 1 })
  }

  const handleMouseEnter = () => {
    // al entrar con el mouse activamos zoom (usuario pidió comportamiento original)
    setZoomStyle((prev) => ({ x: prev.x, y: prev.y, scale: 2 }))
  }

  const mainImageUrl = getImageUrl(selectedColorImage || selectedImage?.attributes.url);

  // Simplified touch handlers: allow single-touch to move the zoom center (no pinch-to-zoom)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const rect = (e.target as Element).getBoundingClientRect()
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
      const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100
      setZoomStyle((prev) => ({ x, y, scale: prev.scale }))
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const rect = (e.target as Element).getBoundingClientRect()
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
      const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100
      setZoomStyle((prev) => ({ x, y, scale: prev.scale }))
    }
  }

  const handleTouchEnd = (_e: React.TouchEvent<HTMLDivElement>) => {
    // keep current zoom on touch end; users requested original zoom behavior (no pinch)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-1 sm:gap-2 w-full max-w-6xl px-2">
      {/* Miniaturas */}
      <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 order-2 lg:order-1 justify-center">
        {/* Build thumbnails: include selectedColorImage first if present */}
        {((selectedColorImage ? [{ id: -1, attributes: { url: selectedColorImage } }] : [])
          .concat(validImages)
        ).map((image) => {
          const thumbUrl = getImageUrl(image.attributes.url)
          if (!thumbUrl) return null
          const isSelected = selectedImage?.id === image.id
          return (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`border rounded-md overflow-hidden w-20 h-20 lg:w-24 lg:h-24 transition-all ${isSelected ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-neutral-400'}`}>
              <Image
                src={thumbUrl}
                alt={`Miniatura ${image.id}`}
                width={120}
                height={120}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </button>
          )
        })}
      </div>

      {/* Imagen principal con zoom */}
      {mainImageUrl ? (
        <div
          className="order-1 lg:order-2 h-[420px] sm:h-[520px] md:h-[560px] w-full max-w-md sm:max-w-lg lg:max-w-full aspect-[4/5] m-auto bg-no-repeat bg-center bg-contain rounded-xl transition-all duration-200"
          style={{
            backgroundImage: `url(${mainImageUrl})`,
            backgroundPosition: `${zoomStyle.x}% ${zoomStyle.y}%`,
            backgroundSize: `${Math.max(100, zoomStyle.scale * 100)}%`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      ) : (
        <div className="h-[500px] w-full bg-gray-100 flex items-center justify-center rounded-xl">
          <p className="text-gray-400">Imagen no disponible</p>
        </div>
      )}
    </div>
  )
}

export default CarouselProduct




