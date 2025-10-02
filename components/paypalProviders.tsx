"use client"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

export default function PaypalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider options={{
      clientId: process.env.NEXT_PUBLIC_PAYPAL_PUBLISHABLE_KEY || "",
      currency: "USD",
      intent: "capture"
    }}>
      {children}
    </PayPalScriptProvider>
  )
}
