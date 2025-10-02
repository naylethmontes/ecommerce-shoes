export function formatPrice(price: number) {
  const priceFormated = new Intl.NumberFormat('es-CO', {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  const finalprice = priceFormated.format(price)

  return finalprice
}