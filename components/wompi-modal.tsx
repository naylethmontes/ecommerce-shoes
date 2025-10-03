"use client";

import { useEffect } from "react";

type WompiModalProps = {
  publicKey: string;
  currency: string;
  amountInCents: number;
  reference: string;
  redirectUrl: string;
};

export default function WompiModal({
  publicKey,
  currency,
  amountInCents,
  reference,
  redirectUrl,
}: WompiModalProps) {
  useEffect(() => {
    if (!publicKey || !currency || !amountInCents || !reference || !redirectUrl) {
      console.warn("❗ Parámetros incompletos para el widget de Wompi.");
      return;
    }

    let attempts = 0;
    const maxAttempts = 20;

    const checkWidget = () => {
      const WompiWidget = window.WidgetCheckout;

      if (WompiWidget) {
        const checkout = new WompiWidget({
          currency,
          amountInCents,
          reference,
          publicKey,
          redirectUrl,
          responseCallback: (result) => {
            console.log("🟢 Resultado del widget:", result);
          },
        });

        checkout.open();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkWidget, 100);
      } else {
        console.error("❌ Wompi widget no se pudo cargar después de varios intentos.");
      }
    };

    checkWidget();
  }, [publicKey, currency, amountInCents, reference, redirectUrl]);

  return null;
}
