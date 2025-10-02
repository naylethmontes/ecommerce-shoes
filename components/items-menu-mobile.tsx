import { Menu } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import Link from "next/link"


const ItemsMenuMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Menu />
      </PopoverTrigger>
      <PopoverContent >

        <Link href="/category/damas" className="block hover:text-amber-700">Tenis para Damas</Link>
        <Link href="/category/caballeros" className="block hover:text-amber-700">Tenis para Caballeros</Link>
        <Link href="/category/complementos" className="block hover:text-amber-700">Complementos</Link>
        <Link href="/offers/" className="block hover:text-amber-700">Ofertas</Link>

      </PopoverContent>
    </Popover>
  )
}

export default ItemsMenuMobile