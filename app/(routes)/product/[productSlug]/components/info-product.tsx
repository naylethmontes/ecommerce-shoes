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

export type InfoProductProps = {
  product: ProductType
}

const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart()
  const { addLovedItem } = useLovedProducts()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedColorImage, setSelectedColorImage] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const isOtherCategory = product.attributes.category.data.attributes.categoryName === "Complementos"

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError(true)
      return
    }

    setError(false)

    const discount = product.attributes.discount || 0;
    const discountedPrice = discount > 0
      ? product.attributes.price - (product.attributes.price * discount) / 100
      : product.attributes.price;

    const newItem: CartItem = {
      ...product,
      selectedSize,
      selectedColor,
      selectedColorImage: selectedColorImage || undefined,
      cartItemId: crypto.randomUUID(),
      attributes: {
        ...product.attributes,
        price: discountedPrice, // aplicamos el precio con descuento
      },

    };
    addItem(newItem)
  }

  return (
    <div className="">
      {/* Título y estilos */}
      <div className="justify-between sm:flex">
        <h1 className="text-4xl font-sans">{product.attributes.productName}</h1>
        <ProductStyleTaste
          style={product.attributes.style}
          taste={product.attributes.taste}
        />
      </div>

      <Separator className="my-4" />
      <p className="font-open text-lg">{product.attributes.description}</p>

      {/* Selector de color */}
      <Separator className="my-4" />
      <div className="mb-4">
        <p className="mb-2 font-bold text-lg">Selecciona un color:</p>
        <div className="flex flex-wrap gap-3 mb-4 font-sans">

          {product.attributes.colors.data.map((color) => {
            const name = color.attributes.name
            const imageColor = color.attributes.imageColor?.data?.attributes?.url || null
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

        {/* Imagen del color seleccionado */}
        {selectedColorImage && (
          <div className="">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedColorImage || product.attributes.images.data[0]?.attributes.url}`}
              alt="Product"
              className="w-20 h-20 object-cover rounded-md border"
            />
          </div>
        )}

      </div>


      {/* Selector de talla */}

      <div className="mb-4 ">
        <p className="mb-2 font-bold text-lg">Selecciona tu talla:</p>
        <div className="flex flex-wrap gap-3 font-sans">
          {product.attributes.sizes?.data.map((size) => {
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
      {product.attributes.discount && product.attributes.discount > 0 ? (
        <div className="flex items-center gap-3 my-4">
          <span className="text-gray-500 line-through text-lg">
            {formatPrice(product.attributes.price)}
          </span>
          <span className="text-red-600 text-2xl font-bold">
            {formatPrice(product.attributes.price - (product.attributes.price * product.attributes.discount) / 100)}
          </span>
          <span className="text-sm bg-red-600 text-white px-2 py-1 rounded">
            -{product.attributes.discount}%
          </span>
        </div>
      ) : (
        <p className="my-4 text-2xl font-bold">{formatPrice(product.attributes.price)}</p>
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
