import Link from "next/link"
import { buttonVariants } from "./ui/button"


const BannerProduct = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <p className="text-lg font-sans">Sumergete en una expiriencia unica</p>
        <h4 className="mt-3 text-4xl md:text-5xl font-extrabold uppercase break-words text-center">Calzadodecalidad</h4>
        <p className="my-2 text-lg font-sans">Despierta tus mejores gustos con un buen calzado</p>
        <Link href="#" className={buttonVariants()}>Comprar</Link>

      </div>
      <div className="h-[350px] bg-cover lg:h-[600px] bg-[url('/coquet.jpeg')] bg-center mt-5">

      </div>
    </>
  )
}

export default BannerProduct