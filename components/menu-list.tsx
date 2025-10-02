"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Que ofrecemos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] font-sans">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      LunadeAbril
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      LunadeAbril es más que una tienda online, es el lugar donde cada paso refleja tu estilo y personalidad. Te ofrecemos calzado para damas y caballeros con diseños modernos, versátiles y de excelente calidad, pensados para acompañarte en cada momento de tu vida.
                      En cada par encontrarás comodidad, confianza y un detalle único, porque creemos que tus pasos cuentan tu historia y merecen lo mejor.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, tus pedidos, y mucho más..
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Sección de promociones y descuentos especiales.
              </ListItem>
              <ListItem href="/category/complementos" title="Complementos">
                Productos complementarios como morrales, bolso de mano...
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Calzado</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] font-sans">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={'/category/complementos'}>
              Complementos
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Tenis Damas",
    href: "/category/damas",
    description:
      "Descubre los tenis que elevan tu estilo: deportivos, casuales y elegantes diseñados para que te sientas única en cada paso.",
  },
  {
    title: "Tenis Caballeros",
    href: "/category/caballeros",
    description:
      "Comodidad y carácter en cada par. Encuentra los tenis perfectos para destacar tu estilo con la calidad que mereces.",
  },
  {
    title: "Complementos",
    href: "/category/complementos",
    description:
      "Completa tu look con morrales, bolsos de mano y accesorios que marcan la diferencia en tu día a día.",
  },


]

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { title: string; href: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-lg font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-md leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
