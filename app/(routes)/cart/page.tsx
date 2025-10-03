"use client"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import CartItem from "./components/cart-item"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Page() {
  const { items } = useCart()
  const prices = items.map((product) => product.attributes.price)
  const totalPrice = prices.reduce((total, price) => total + price, 0)
  const router = useRouter()

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-4xl font-serif">Carrito de compras</h1>
      <Separator />
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length == 0 && (
            <p className="font-serif text-2xl mt-10 text-center">No tienes productos en el carrito</p>
          )}
          <ul>
            {items.map((item) => (
              <CartItem key={item.cartItemId} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-8 rounded-lg bg-amber-100 dark:text-black mt-7">
            <p className="mb-3 text-2xl font-bold">Resumen de la orden</p>
            <Separator className="bg-gray-600" />
            <div className="flex justify-between gap-5 my-4 font-sans text-lg">
              <p>Orden total</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>

            {items.length > 0 && (
              <div className="flex justify-center mt-3 ">
                <Button
                  className="w-full font-sans text-lg dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => {
                    router.push("/checkout")
                  }}
                >
                  Comprar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}