import ImagesOnClick from "@/components/shared/images-onClick"
import ProductStyleTaste from "@/components/shared/product-style-taste"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { ProductType } from "@/types/product"
import { Plus, Trash } from "lucide-react"
import { normalizeProduct } from '@/lib/normalizers'


interface CartItemProps {
  product: ProductType & {
    selectedSize?: string
    selectedColor?: string
    cartItemId: string
  }
}

const CartItem = (props: CartItemProps) => {
  const { product } = props
  const { removeItem, updateItemSize, updateItemColor, duplicateItem } = useCart()
  const normalized = normalizeProduct(product)

  return (
    <li className="flex flex-wrap py-6 border-b mt-5">
      <ImagesOnClick
        slug={normalized.attributes.slug}
        url={normalized.attributes.images?.data?.[0]?.attributes?.url}

      />

      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-2xl mt-2 font-sans">{normalized.attributes.productName}</h2>

          {/* Talla */}
          <div className="mt-2">
            <label htmlFor={`size-${product.id}`} className="text-md font-bold text-gray-600 mb-1 block dark:text-gray-300">
              Talla:
            </label>
            <select
              id={`size-${product.id}`}
              value={product.selectedSize || ""}
              onChange={(e) => updateItemSize(product.cartItemId, e.target.value)}
              className="border px-3 py-1 rounded-md text-md dark:bg-gray-300 dark:text-black font-sans"
            >
              <option value="" disabled className="dark:bg-gray-600 dark:text-black font-sans text-md bg-gray-300 text-black">Selecciona una talla</option>
              {normalized.attributes?.sizes?.data?.map((sizeObj) => {
                const size = sizeObj.attributes?.name
                return (
                  <option key={sizeObj.id} value={size}>{size}</option>
                )
              })}
            </select>
          </div>

          {/* Color */}
          <div className="mt-2">
            <label htmlFor={`color-${product.id}`} className="text-md font-bold  text-gray-600 mb-1 block dark:text-gray-300">
              Color:
            </label>
            <select
              id={`color-${product.id}`}
              value={product.selectedColor || ""}
              onChange={(e) => updateItemColor(product.cartItemId, e.target.value)}
              className="border px-3 py-1 rounded-md text-md mb-2 dark:bg-gray-300 dark:text-black font-sans"
            >
              <option value="" disabled className="dark:bg-gray-600 dark:text-black font-sans text-md bg-gray-300 text-black">Selecciona un color</option>

              {normalized.attributes?.colors?.data?.map((color) => (
                <option key={color.id} value={color.attributes?.name}>
                  {color.attributes?.name}
                </option>
              ))}
            </select>


          </div>

          {/* Precio y estilos */}
          <p className="font-bold mt-2 text-lg">{formatPrice(normalized.attributes.price)}</p>
          <ProductStyleTaste
            style={normalized.attributes.style}
            taste={normalized.attributes.taste}
          />
        </div>

        {/* Botón eliminar */}
        <div className="mt-2">
          <button
            onClick={() => removeItem(product.cartItemId)}
            className={cn("rounded-full border bg-white flex items-center justify-center p-1 px-2 hover:scale-110 transition dark:text-black")}
            title="Eliminar"

          >
            <Trash size={25} />
          </button>

          <div className="mt-51"
            onClick={() => duplicateItem(product)}>

            <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 px-2 hover:scale-110 transition dark:text-black")}
              title="Duplicar producto"
            >
              <Plus size={25} />
            </button>
          </div>

        </div>
      </div>
    </li>
  )
}

export default CartItem
