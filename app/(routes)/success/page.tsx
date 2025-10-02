"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const PageSuccess = () => {
  const router = useRouter()

  return (
    <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <div className="flex justify-center md:min-w-[400px]">
          <img
            src="/compra.png"
            alt="Success" width={250} height={500} className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl">Gracias por tu compra!</h1>
          <p className="my-3">En breve nuestro equipo se pondra manos a la obra para que tu envio este listo con mucho cariño y dedicacion.</p>
          <p className="my-3">Gracias por confiar en nosotros</p>
          <p className="my-3">Disfruta del mejpr calzado!</p>
          <Button onClick={() => router.push("/")}>
            Volver a la tienda
          </Button>
        </div>

      </div>

    </div>
  )
}

export default PageSuccess