"use client"
import { useLovedProducts } from "@/hooks/use-loved-products"
import LovedItemProduct from "./components/loved-item-product"
import { Separator } from "@/components/ui/separator"


export default function Page() {
  const { lovedItems } = useLovedProducts()

  return (
    <div className="max-w-4xl py-4 mx-auto sm:py-32 sm:px-24">
      <h1 className="font-sans px-5 text-4xl sm:pb-8">Mis favoritos</h1>
      <Separator />
      <div>
        <div>
          {lovedItems.length === 0 && (
            <p
              className="font-serif text-2xl mt-10 text-center"
            >No tienes favoritos</p>
          )}
          <ul>
            {lovedItems.filter((item) => item && item.attributes && item.attributes.slug).map((item) => (
              <LovedItemProduct key={item.id} product={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}