/*import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const clientId = "process.env.PAYPAL_CLIENT_ID"
const clientSecret = "process.env.PAYPAL_CLIENT_SECRET"

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(environment)

export async function POST() {

  const request = new paypal.orders.OrdersCreateRequest()
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "COP",
        value: "130.000",
        breakdown: {
          item_total: {
            currency_code: "COP",
            value: "130.000"
          },
          discount: {
            currency_code: "COP",
            value: "0.00"
          },
          handling: {
            currency_code: "COP",
            value: "0.00"
          },
          insurance: {
            currency_code: "COP",
            value: "0.00"
          },
          shipping_discount: {
            currency_code: "COP",
            value: "0.00"
          },
          shipping: {
            currency_code: "COP",
            value: "0.00"
          },
          tax_total: {
            currency_code: "COP",
            value: "0.00"
          }
        }

      },
      items: [
        {
          name: "tenis samba",
          description: "tenis samba casual",
          quantity: "5",
          unit_amount: {
            currency_code: "COP",
            value: "130.00"
          },
          category: "PHYSICAL_GOODS"
        }
      ]

    },
    {
      amount: {
        currency_code: "COP",
        value: "140.000"
      },
      description: "Tenis Puma"
    }
    ]
  })

  const response = await client.execute(request)
  console.log(response);

  return NextResponse.json({
    id: response.result.id
  })
}*/