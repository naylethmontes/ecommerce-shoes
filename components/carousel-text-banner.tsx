"use client"

import { useRouter } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import Autoplay from 'embla-carousel-autoplay'


export const dataCarousel = [
  {
    id: 1,
    title: 'Pago contra entrega',
    description: 'Compra con confianza y paga solo cuando recibas tu pedido.',
    link: "#"
  },
  {
    id: 2,
    title: 'Descuentos especiales',
    description: 'Ahorra un 10% en compras desde $200.000 o un 15% en compras desde $250.000. ¡Ganas mas!',
    link: "#"
  },
  {
    id: 3,
    title: 'Envío gratis VIP',
    description: 'Conviértete en cliente VIP y recibe tus pedidos gratis y con prioridad en cada entrega.',
    link: "#"
  },
  {
    id: 4,
    title: 'Ofertas al mejor precio',
    description: 'Descubre las ofertas del momento y llévalo con hasta un 20% de descuento. ¡No te quedes sin los tuyos!',
    link: "#"
  },
  {
    id: 5,
    title: 'Entregas rápidas en 3 a 4 días hábiles.',
    description: 'Recibe tus productos en tiempo récord y disfruta de tu compra sin esperas.',
    link: "#"
  },


]

const CarouselTextBanner = () => {
  const router = useRouter()


  return (
    <div className="bg-linear-45 from-amber-200 to-amber-100 dark:bg-primary">
      <Carousel className="w-full max-w-4xl mx-auto"
        plugins={[
          Autoplay({
            delay: 3000
          })
        ]}
      >
        <CarouselContent>


          {dataCarousel.map(({ id, title, link, description }) => (
            <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="sm:text-xl text-wrap md:text-2xl text-amber-900 font-bold dark:text-secondary">{title}</p>
                    <p className="sm:text-xs font-semibold md:text-lg text-wrap dark:text-secondary">{description}</p>
                  </CardContent>
                </Card>
              </div>


            </CarouselItem>
          ))}
        </CarouselContent>


      </Carousel>
    </div>
  )
}

export default CarouselTextBanner