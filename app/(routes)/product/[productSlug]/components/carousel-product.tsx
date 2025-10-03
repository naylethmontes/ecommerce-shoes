"use client"
import Image from "next/image"
import { useState, useEffect } from "react"

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

const CarouselProduct = ({ images, selectedColorImage }: CarouselProductProps) => {
  const [selectedImage, setSelectedImage] = useState(images.data[0])
  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: "center",
    backgroundSize: "100%",
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "180%", // nivel de zoom
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      backgroundPosition: "center",
      backgroundSize: "100%",
    })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full max-w-6xl px-2">
      {/* Miniaturas */}
      <div className="flex lg:flex-col gap-2 order-2 lg:order-1 justify-center">
        {images.data.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`border rounded-md overflow-hidden w-20 h-20 lg:w-24 lg:h-24 transition-all ${selectedImage.id === image.id
              ? "ring-2 ring-black"
              : "hover:ring-2 hover:ring-neutral-400"
              }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
              alt="Miniatura"
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Imagen principal con zoom */}
      <div
        className="order-1 lg:order-2 h-[500px] w-full max-w-md sm:max-w-lg lg:max-w-full aspect-[4/5] m-auto bg-no-repeat bg-center bg-contain rounded-xl transition-all duration-200"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedColorImage || selectedImage.attributes.url})`,
          ...zoomStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></div>
    </div>
  )
}

export default CarouselProduct




