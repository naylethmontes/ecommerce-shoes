"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center">Conoce a LunadeAbril</h1>
      <p className="text-center font-sans text-lg text-gray-600 dark:text-gray-400">
        Calzado con estilo, comodidad y autenticidad
      </p>

      <Separator />

      {/* Nuestra historia */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Nuestra historia</h2>
        <p className="text-gray-700 font-sans dark:text-gray-300">
          En LunadeAbril, tu tienda online de calzado colombiano, nacimos con la pasión de acompañarte en cada paso de tu vida. Creemos que el calzado debe ser más que un accesorio: debe reflejar tu estilo, brindarte comodidad y darte la confianza que necesitas día a día. Con diseños modernos y materiales de calidad, trabajamos para que cada paso cuente y te sientas único/a en cualquier ocasión.
        </p>
      </section>

      {/* Lo que nos diferencia */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">¿Qué nos hace únicos?</h2>
        <ul className="list-disc list-inside text-gray-700 font-sans dark:text-gray-300 space-y-1">
          <li>Diseños exclusivos y a la moda</li>
          <li>Calzado cómodo y duradero</li>
          <li>Atención personalizada vía WhatsApp</li>
          <li>Envíos seguros a todo Colombia</li>
        </ul>
        <br />
        <h3 className="text-2xl font-semibold mb-2">Garantias y devoluviones</h3>
        <p className="list-disc list-inside text-gray-700 font-sans dark:text-gray-300 space-y-1">Se garantiza la calidad de todos los zapatos hasta 30 días después de efectuada la compra, siempre que se presenten defectos de materiales o fabricación y que el producto haya recibido el uso adecuado. También se acepta cambio de tallas o color del producto.
          Los cambio por talla o color, se realizan durante los primeros 10 dias de la entrega del producto. <br />
          <span className="text-black font-bold dark:text-gray-400">El cliente puede realizar la solicitud de cambio: </span>
          Si directamente con alguna transportadora. Es importante tener en cuenta que al usar esta modalidad el cliente asumirá el costo de los transportes adicionales.
        </p>
        <br />
        <p className="list-disc list-inside text-gray-700 font-sans dark:text-gray-300 space-y-1"><span className="text-black font-bold dark:text-gray-400">Quedan excluidos de garantía productos que presenten: </span>

          Raspones, pelones y/o ruptura de materiales, ocasionados por el mal uso del producto.
          Los cambios en el color, tonalidad y texturas que sean naturales del material del zapato.
          Pliegues o rugosidad ocasionada por la flexión del empeine.
          Productos que ya hayan sido manipulados por zapaterías, talleres de calzado u otro tipo de terceros, así como también daños ocasionados por arreglos y/o limpiezas inadecuadas.
          Suciedad en alguna parte del producto. Adicional el cliente debe enviar fotos del zapato de esta forma: Superior, inferior (suela), frontal, laterales (izquierdo y derecho) de cada zapato del mismo día que se vaya a realizar el envío de la devolución para tener evidencia de las condiciones del zapato.</p>

      </section>

      {/* Cómo comprar */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">¿Cómo comprar?</h2>
        <p className="text-gray-700 font-sans dark:text-gray-300">
          Explora nuestros productos en la tienda online, elige tu talla y color, y recíbelo en la puerta de tu casa, puedes pagar con tarjeta, PSE, Nequi, Bancolombia, Contra entrega.
        </p>
        <div className="mt-4 ">
          <Link href="/#">
            <Button >Ir a la tienda</Button>
          </Link>
        </div>
      </section>

      {/* Testimonios / Reseñas */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Lo que dicen nuestras clientas</h2>
        <p className="font-serif text-gray-600 dark:text-gray-400">
          “Comodísimos, los amo 😍” – Mariana G.
        </p>
        <p className="font-serif text-gray-600 dark:text-gray-400">
          “Excelente calidad, llegaron súper rápido.” – Laura M.
        </p>
      </section>

      {/* Contacto */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-2">¿Tienes preguntas?</h2>
        <p className="text-gray-700 font-sans dark:text-gray-300 mb-4">Escríbenos por WhatsApp para asesorarte.</p>
        <a
          href="https://wa.me/573024017103"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-sans"
        >
          Contactar por WhatsApp
        </a>
      </section>
    </div>
  );
}
