"use client";

import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WompiPaymentPage() {
  const params = useSearchParams();

  const name = params.get("name");
  const lastname = params.get("lastname");
  const email = params.get("email");
  const phone = params.get("phone");
  const address = params.get("address");
  const city = params.get("city");
  const notes = params.get("notes");

  const amountInCents = 100000; // 💰 valor en centavos
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ""; // ⚠️ importante

  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    if (widgetReady && (window as any).WidgetCheckout) {
      (window as any).WidgetCheckout.open({
        currency: "COP",
        amountInCents,
        reference: `PEDIDO-${Date.now()}`,
        publicKey,
        redirectUrl: "http://localhost:3000/success",
      });
    }
  }, [widgetReady]);

  return (
    <>
      <Script
        src="https://checkout.wompi.co/widget.js"
        strategy="beforeInteractive"
        onLoad={() => setWidgetReady(true)}
      />
      <div className="text-center py-10">
        <p>Redirigiendo al pago seguro con Wompi...</p>
      </div>
    </>
  );
}
