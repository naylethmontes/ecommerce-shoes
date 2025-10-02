interface ProductStyleTasteProps {
  style: string
  taste: string
}

const ProductStyleTaste = (props: ProductStyleTasteProps) => {
  const { style, taste } = props

  return (
    <div className="flex items-center justify-between gap-2 py-2 font-serif">
      <p className="mx-2 px-2 py-1 text-sm text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
        {taste}
      </p>
      <p className="px-2 py-1 text-sm text-white bg-yellow-900 rounded-full w-fit dark:bg-amber-900 dark:text-black">
        {style}
      </p>
    </div>
  )
}

export default ProductStyleTaste