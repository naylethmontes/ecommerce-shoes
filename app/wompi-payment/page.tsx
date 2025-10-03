"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function WompiPaymentPage() {
  const amountInCents = 100000; // 💰 valor en centavos
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ""; // ⚠️ importante

  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    if (widgetReady && window.WidgetCheckout) {
      const checkout = new window.WidgetCheckout({
        currency: "COP",
        amountInCents,
        reference: `PEDIDO-${Date.now()}`,
        publicKey,
        redirectUrl: "http://localhost:3000/success",
      });

      checkout.open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
