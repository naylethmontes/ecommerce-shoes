{/*"use client"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

function PaypalComponent() {
  return (
    <div className=" bg-white flex justify-center items-center">
      <PayPalScriptProvider
        options={{
          clientId: "AcWBDvUAxGIjDYSdf7-y-8qOcK7_KnnYMKKmiExSWXd-oEOorb68Miay0aoVNMfP5dav2lfSZwEDYqcT",
        }}
      >
        <PayPalButtons
          style={{
            color: "blue",
            layout: "horizontal",
            label: "pay"
          }}
          createOrder={async () => {
            const res = await fetch("/api/checkout", {
              method: "POST"
            })

            const order = await res.json();
            console.log(order)
            return order.id

          }}

          onApprove={async (data, actions) => {
            console.log(data);
            actions.order?.capture()

          }}
          onCancel={(data) => {
            console.log("cancelado");
          }}

        />
      </PayPalScriptProvider>
    </div>
  )
}

export default PaypalComponent*/}

