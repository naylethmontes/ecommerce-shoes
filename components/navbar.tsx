'use client'
import { BaggageClaim, Heart, Moon, ShoppingCart, } from "lucide-react"
import { useRouter } from "next/navigation"
import MenuList from "./menu-list"
import ItemsMenuMobile from "./items-menu-mobile"
import TooggleTheme from "./toggle-theme"
import { useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"
import UserIconNavbar from "./userIconNavbar"

const Navbar = () => {
  const router = useRouter()
  const cart = useCart()
  const { lovedItems } = useLovedProducts()

  return (

    <div className="flex items-center justify-between p-4 mx-auto courso-pointer sm:max">
      <h1 className="text-2xl md:text-3xl font-sans flex items-center" onClick={() => router.push('/')}>Lunade
        <span className="
        font-bold">Abril
        </span>
        <Moon className="w-6 h-6" />
      </h1>
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap">
        <div className="flex sm:hidden ">
          <ItemsMenuMobile />
        </div>
        {cart.items.length === 0 ?
          <ShoppingCart
            strokeWidth='1'
            className="cursor-pointer"
            onClick={() => router.push('/cart')} />
          : (
            <div className="flex gap-1 cursor-pointer" onClick={() => router.push("/cart")}>
              <BaggageClaim strokeWidth={1} className="cursor-pointer" />
              <span>
                {cart.items.length}
              </span>
            </div>
          )}

        <Heart
          strokeWidth='1'
          className={`cursor-pointer
          ${lovedItems.length > 0 && 'fill-black dark:fill-white'}`}
          onClick={() => router.push('/loved-products')} />
        <UserIconNavbar />
        <div className="hidden md:block">
          <TooggleTheme />
        </div>
      </div>
    </div>
  )
}

export default Navbar