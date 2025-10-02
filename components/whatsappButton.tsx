"use client"
import { MessageCircleMore } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WhatsappButton() {
  const [bounce, setBounce] = useState(false)

  const phoneNumber = "3024017103"
  const message = "Hola, quiero mas información sobre un producto?"


  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 1000)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-50 ${bounce ? "animate-bounce" : ""}`}
      title="Contactar por whatsapp"
    >
      <MessageCircleMore size={50} />
    </a>
  )
}