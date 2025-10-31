"use client"
import ProductStyleTaste from "@/components/shared/product-style-taste"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartItem, useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"
import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"
import { Heart } from "lucide-react"
import { useState } from "react"
import { normalizeProduct } from '@/lib/normalizers'

export type InfoProductProps = {
  product: ProductType
}

const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart()
  const { addLovedItem } = useLovedProducts()
  const normalized = normalizeProduct(product)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedColorImage, setSelectedColorImage] = useState<string | null>(null)
  const [error, setError] = useState(false)

  // Preparar una URL segura para la imagen de preview
  // ✅ Función para generar una URL válida tanto local como Cloudinary
  const getImageUrl = (url?: string | null): string => {
    if (!url) return "";
    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
  };

  // ✅ Usamos la imagen del color seleccionado o la primera disponible
  const previewSrc = getImageUrl(
    selectedColorImage || normalized.attributes.images?.data?.[0]?.attributes?.url
  );


  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError(true)
      return
    }

    setError(false)

    const discount = normalized.attributes.discount || 0;
    const discountedPrice = discount > 0
      ? normalized.attributes.price - (normalized.attributes.price * discount) / 100
      : normalized.attributes.price;

    // Guardar color/talla explícitamente y usar la versión normalizada del producto
    const chosenColor = selectedColor?.trim() ?? ''

    const newItem: CartItem = {
      id: normalized.id,
      attributes: {
        ...normalized.attributes,
        price: discountedPrice, // aplicamos el precio con descuento
      },
      selectedSize,
      selectedColor: chosenColor,
      selectedColorImage: selectedColorImage || undefined,
      cartItemId: crypto.randomUUID(),
    };
    addItem(newItem)
  }

  return (
    <div className="">
      {/* Título y estilos */}
      <div className="justify-between sm:flex">
        <h1 className="text-4xl font-sans">{normalized.attributes.productName}</h1>
        <ProductStyleTaste
          style={normalized.attributes.style}
          taste={normalized.attributes.taste}
        />
      </div>

      <Separator className="my-4" />
      <p className="font-open text-lg">{normalized.attributes.description}</p>

      {/* Selector de color */}
      <Separator className="my-4" />
      <div className="mb-4">
        <p className="mb-2 font-bold text-lg">Selecciona un color:</p>
        <div className="flex flex-wrap gap-3 mb-4 font-sans">

          {(normalized.attributes.colors?.data ?? []).map((color) => {
            const name = color.attributes.name
            const imageColor = color.attributes.imageColor?.data?.attributes?.url ?? null
            const isSelected = selectedColor === name

            return (
              <button
                key={color.id}
                onClick={() => {
                  setSelectedColor(name)
                  setSelectedColorImage(imageColor)
                  setError(false)
                }}
                className={`px-4 py-2 border text-sm transition-all rounded-md
                 ${isSelected
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
              >
                {name}
              </button>
            )

          })}
        </div>
      </div>


      {/* Selector de talla */}

      <div className="mb-4 ">
        <p className="mb-2 font-bold text-lg">Selecciona tu talla:</p>
        <div className="flex flex-wrap gap-3 font-sans">
          {(normalized.attributes.sizes?.data ?? []).map((size) => {
            const name = size.attributes.name
            return (
              <button
                key={name}
                onClick={() => {
                  setSelectedSize(name)
                  setError(false)
                }}
                className={`px-4 py-2 border text-sm transition-all rounded-md 
                    ${selectedSize === name
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
              >
                {name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Precio */}
      <Separator className="my-4" />
      {/* Mostrar precio con descuento si aplica */}
      {normalized.attributes.discount && normalized.attributes.discount > 0 ? (
        <div className="flex items-center gap-3 my-4">
          <span className="text-gray-500 line-through text-lg">
            {formatPrice(normalized.attributes.price)}
          </span>
          <span className="text-red-600 text-2xl font-bold">
            {formatPrice(normalized.attributes.price - (normalized.attributes.price * normalized.attributes.discount) / 100)}
          </span>
          <span className="text-sm bg-red-600 text-white px-2 py-1 rounded">
            -{normalized.attributes.discount}%
          </span>
        </div>
      ) : (
        <p className="my-4 text-2xl font-bold">{formatPrice(normalized.attributes.price)}</p>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="text-red-600 text-sm mt-2">
          Por favor selecciona una talla y un color.
        </p>
      )}

      {/* whatsap con asesor */}
      <div className="mb-4 text-center font-open">
        <a href="https://wa.me/573024017103"
          target="_blannk"
          rel="noopener noreferrer"
          className="text-lg text-amber-700 hover:underline"
        >
          Comprar con un asesor
        </a>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center gap-4">
        <Button className="flex-1 text-lg" onClick={handleAddToCart}>
          Comprar
        </Button>

        {/*icono de me gustaa*/}
        <Heart
          width={34}
          strokeWidth={2}
          className="transition duration-300 cursor-pointer hover:fill-black dark:hover:fill-white relative"
          onClick={() => addLovedItem(product)}
        />

      </div>
    </div>

  )
}

export default InfoProduct
