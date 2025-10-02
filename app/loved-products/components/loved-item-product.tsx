import ImagesOnClick from "@/components/shared/images-onClick"
import ProductStyleTaste from "@/components/shared/product-style-taste"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { ProductType } from "@/types/product"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LovedItemProductProps {
  product: ProductType
}

const LovedItemProduct = (props: LovedItemProductProps) => {
  const { product } = props
  const router = useRouter()
  const { removeLovedItem } = useLovedProducts()
  const { addItem } = useCart()


  const addToCheckout = () => {
    addItem({
      ...product,
      cartItemId: ""
    })
    removeLovedItem(product.id)
  }

  return (

    <li className="flex flex-wrap py-6 border-b mt-5">
      <ImagesOnClick slug={product.attributes.slug} url={product.attributes.images.data[0].attributes.url} />

      <div className="flex justify-between flex-1 px-6">

        <div>
          <h2 className="text-2xl mt-2 font-sans">
            {product.attributes.productName}</h2>
          <p className="text-lg font-bold mt-4">
            {formatPrice(product.attributes.price)}</p>

          <ProductStyleTaste style={product.attributes.style} taste={product.attributes.taste} />

          <Button className="mt-4 font-sans text-lg rounded-full" onClick={addToCheckout}>
            Añadir a el carrito
          </Button>
        </div>
        <div className="mt-2">
          <button
            className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}
            title='Quitar'>
            <X size={25}
              className="dark:text-black"
              onClick={() => removeLovedItem(product.id)}
            />
          </button>
        </div>
      </div>
    </li>
  )

}

export default LovedItemProduct