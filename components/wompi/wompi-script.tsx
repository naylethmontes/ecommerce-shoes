"use client"
import Script from "next/script"

type Props = {
  publicKey: string
}

export default function WompiScript({ publicKey }: Props) {
  return (
    <Script
      src="https://checkout.wompi.co/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log("✅ Script Wompi cargado correctamente")
      }}
      onError={(err) => {
        console.error("❌ Error cargando el script de Wompi", err)
      }}
    />
  )
}
