"use client"
import Link from "next/link"
import { Separator } from "./ui/separator"
import * as Popover from "@radix-ui/react-popover"
import { Moon } from "lucide-react"
import Image from "next/image"

const dataFooter = [
  {
    id: 1,
    name: 'Sobre nosotros',
    link: '/shop'
  },
  {
    id: 3,
    name: 'Contactanos',
    content: (
      <div className="text-md space-y-2 text-gray-700 w-52 font-sans">
        <p>
          📧 Email:{" "}
          <a href="mailto:lunadeabriloficial@gmail.com" className="text-gray-700 hover:underline">
            lunadeabriloficial@gmail.com
          </a>
        </p>
        <p>
          📱 WhatsApp:{" "}
          <a href="https://wa.me/573024017103" target="_blank" className="text-gray-700 hover:underline">
            +57 3024017103
          </a>
        </p>
      </div>
    )
  },
  {
    id: 4,
    name: 'Politicas de privacidad',
    link: '/privacy-policy'
  },
  {
    id: 5,
    name: 'Rastrea tu pedido',
    content: (
      <ul className="space-y-2 font-sans text-md">
        {[
          { label: 'Interrapidisimo', href: "https://interrapidisimo.com/", icon: "/icons/inter.png" },
          { label: 'Envia', href: "https://envia.co/", icon: "/icons/envia.png" },
          { label: 'TCC', href: "https://tcc.com.co/courier/mensajeria/rastrear-envio/", icon: "/icons/tcc.png" },
          { label: 'DHL', href: "https://www.dhl.com/co-es/home/rastreo.html", icon: "/icons/dhl.png" },
          { label: 'Coordinadora', href: "https://coordinadora.com/rastreo/rastreo-de-guia/", icon: "/icons/coor.jpg" },
        ].map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 hover:text-amber-800 transition">

              <img src={item.icon} alt={item.label} className="w-5 h-5 object-contain" />
              <span>{item.label}</span>

            </a>
          </li>
        ))}
      </ul>

    )
  },

]
const Footer = () => {
  return (
    <footer className="mt-4">
      <Separator />
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-7">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-2xl flex items-center gap-2">
            <span className="font-bold text-3xl">
              LunadeAbril
            </span>
            <Moon className="w-7 h-7" />
          </p>


          <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3 text-gray-500 mt-4 sm:mt-0 dark:text-gray-300 font-sans text-md">
            {dataFooter.map((item) => (
              <li key={item.id}>
                {item.content ? (
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <button className="hover:underline">{item.name}</button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        side="top"
                        align="start"
                        className="rounded-md bg-white shadow-md border border-gray-200 p-4 z-50"
                        sideOffset={5}
                      >
                        {item.content}
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                ) : (
                  <Link href={item.link} className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-13 px-4 py-4">
          <h3 className="text-2xl font-sans text-gray-900 dark:text-gray-200 mb-3 ">
            Métodos de pago
          </h3>

        </div>

        <div className="flex flex-wrap gap-2">
          <Image
            src="/icons/wompi.png"
            alt="Wompi"
            width={55}
            height={50}
            title="Wompi"
            className="object-contain transition-transform duration-300 hover:scale-110 hover:opacity-80"
          />
          <Image
            src="/icons/entrega.png"
            alt="Pago contra entrega"
            width={70}
            height={40}
            title="Contra entrega"
            className="object-contain transition-transform duration-300 hover:scale-110 hover:opacity-80 "
          />
          <Image
            src="/icons/pse.png"
            alt="PSE"
            width={70}
            height={40}
            title="PSE"
            className="object-contain transition-transform duration-300 hover:scale-110 hover:opacity-80"
          />
          <Image
            src="/icons/ba.png"
            alt="bancolombia"
            width={70}
            height={45}
            title="Bancolombia"
            className="object-contain transition-transform duration-300 hover:scale-110 hover:opacity-80"
          />
        </div>
        <div className="flex justify-end ">
          <a
            href="https://www.facebook.com/lunadeabrilof"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
          >
            <img
              src="/icons/face.png"
              alt="Facebook"
              width={40}
              height={40}
              className="hover:opacity-75 transition"
            />
          </a>
          <a
            href="https://www.instagram.com/lunadeabril.co/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={80}
              height={70}
              className="hover:opacity-75 transition" />

          </a>
          <a
            href="https://www.tiktok.com/@lunadeabril.co/"
            target="_blank"
            rel="noopener noreferrer"
            title="Tik Tok"
          >
            <Image
              src="/icons/tiktok.png"
              alt="Tik Tok"
              width={60}
              height={45}
              className="hover:opacity-75 transition" />

          </a>
        </div>
        <Separator className="my-6" />
        <span className="block text-lg font-sans text-gray-500 sm:text-center dark:text-gray-400">
          &copy; 2025
          <Link href="#"> lunadeAbril |</Link>
          Todos los derechos reservados
        </span>
      </div>

    </footer>
  )
}

export default Footer