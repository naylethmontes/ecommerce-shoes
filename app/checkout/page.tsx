'use client'
import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/useAuth'

const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ''


const waitForWompi = () =>
  new Promise<typeof window.WidgetCheckout>((resolve) => {
    if (window.WidgetCheckout) {
      resolve(window.WidgetCheckout)
    } else {
      const checkExist = setInterval(() => {
        if (window.WidgetCheckout) {
          clearInterval(checkExist)
          resolve(window.WidgetCheckout)
        }
      }, 100)
    }
  })

const CheckoutForm = () => {

  const { items, getTotalPrice } = useCart()
  const [formattedTotal, setFormattedTotal] = useState("")
  const [formattedItems, setFormattedItems] = useState<string[]>([])
  const totalPrice = getTotalPrice()
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    idNumber: "",
    legalIdType: "CC",
    address: "",
    additionalInfo: "",
    department: "",
    city: "",
    phone: "",
    phoneNumberPrefix: "57",
    email: "",
    notes: "",
    signature: "",
  })



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const uuid = uuidv4()
    const amountInCents = totalPrice * 100;

    try {

      const signatureRes = await axios.post(
        "http://localhost:1337/api/orders/generate-signature", {
        reference: uuid,
        amountInCents,
        currency: 'COP',
      }
      )
      const integrity = signatureRes.data.signature


      const orderRes = await axios.post(
        "http://localhost:1337/api/orders",
        {

          buyer: formData,
          products: items.map((item) => ({
            id: item.id,
            quantity: 1,
            selectedSize: item.selectedSize || 'default',
            selectedColor: item.selectedColor || 'default',
          })),
          total: totalPrice,
          uuid,
          status: 'pending',
          email: formData.email,
          phone: formData.phone,
          signature: integrity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('✅ Orden guardada con éxito:', orderRes.data)

      // 🪄 Abrir el widget de Wompi


      const WidgetCheckout = await waitForWompi()
      const widget = new WidgetCheckout({
        currency: 'COP',
        amountInCents,
        reference: uuid,
        publicKey,
        redirectUrl: `${window.location.origin}/success`,
        integrity,
        customerData: {
          fullName: `${formData.fullName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phoneNumber: formData.phone.replace(/\D/g, ""),
          phoneNumberPrefix: formData.phoneNumberPrefix.trim(),
          legalId: formData.idNumber,
          legalIdType: formData.legalIdType,

        }
      })


      widget.open((result) => {
        console.log("resultado del widget", result);
      })

    } catch (err) {
      console.error('❌ Error al guardar la orden o abrir el widget:', err)
      toast.error('Error al crear la orden, intenta de nuevo')
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.wompi.co/widget.js'
    script.async = true
    script.id = 'wompi-script'

    const alreadyAdded = document.getElementById('wompi-script')
    if (!alreadyAdded) {
      document.body.appendChild(script)
    }

    return () => {
      const s = document.getElementById('wompi-script')
      if (s) s.remove()
    }
  }, [])


  useEffect(() => {
    const formatted = items.map((item) =>
      item.attributes.price.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      })
    )
    setFormattedItems(formatted)

    setFormattedTotal(
      totalPrice.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      })
    )
  }, [items, totalPrice])


  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-5 dark:bg-gray-300 dark:text-gray-700">
      <h2 className="text-2xl font-serif text-center">Información del comprador</h2>

      <div className="grid sm:grid-cols-2 gap-5 ">
        <div>
          <Label htmlFor="fullName">Nombre *</Label>
          <Input name="fullName" value={formData.fullName} onChange={handleChange} required className='dark:bg-gray-100' />
        </div>
        <div>
          <Label htmlFor="lastName">Apellidos *</Label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} required className='dark:bg-gray-100' />
        </div>
      </div>

      <div>
        <Label htmlFor="legalIdType">Tipo de documento *</Label>
        <select
          id="legalIdType"
          name="legalIdType"
          value={formData.legalIdType}
          onChange={(e) => setFormData({ ...formData, legalIdType: e.target.value })} required
          className='mt-3 font-semibold '
        >
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="TI">Tarjeta de identidad</option>
          <option value="PP">Pasaporte</option>
          <option value="NIT">NIT</option>
        </select>
      </div>
      <div>
        <Label htmlFor="idNumber">Número de documento *</Label>
        <Input
          id="idNumber"
          name="idNumber"
          value={formData.idNumber}
          onChange={(e) =>
            setFormData({ ...formData, idNumber: e.target.value })
          }
          required
          className='dark:bg-gray-100'
        />
      </div>
      <div>
        <Label htmlFor="address">Dirección de entrega *</Label>
        <Input name="address" value={formData.address} onChange={handleChange} required className='dark:bg-gray-100' />
      </div>

      <div>
        <Label htmlFor="additionalInfo">Información adicional (opcional)</Label>
        <Input name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className='dark:bg-gray-100' />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="department">Departamento *</Label>
          <Input name="department" value={formData.department} onChange={handleChange} required className='dark:bg-gray-100' />
        </div>
        <div>
          <Label htmlFor="city">Localidad / Ciudad *</Label>
          <Input name="city" value={formData.city} onChange={handleChange} required className='dark:bg-gray-100' />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="phone">Teléfono *</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} required className='dark:bg-gray-100' />
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required className='dark:bg-gray-100' />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notas sobre el pedido</Label>
        <Textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Ej: dejar en portería, llamar antes, etc." className='dark:bg-gray-100' />
      </div>

      <div className="border rounded-lg p-4 bg-slate-50">
        <h3 className="text-lg font-sans mb-3">Resumen del pedido</h3>
        <ul className="space-y-2 text-sm text-gray-800">
          {items.map((item, index) => (
            <li key={item.cartItemId} className="flex justify-between font-sans">
              <div>
                {item.attributes.productName}{": "}
                {item.selectedSize && <span className="text-md text-gray-500">Talla: {item.selectedSize}</span>}{" "}
                {item.selectedColor && <span className="text-md text-gray-500">Color: {item.selectedColor}</span>}
              </div>
              <div>{formattedItems[index]}</div>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t pt-3 flex justify-between text-md font-bold">
          <span>Total:</span>
          <span>{formattedTotal}</span>
        </div>
      </div>

      <Button type="submit" className="w-full mt-4 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">Realizar pedido</Button>
    </form>
  )
}

export default CheckoutForm

