// components/SizeSelector.tsx
"use client"

import { useState } from "react"

interface SizeSelectorProps {
  sizes: string[]
  onSelectSize: (size: string) => void
}

const SizeSelector = ({ sizes, onSelectSize }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const handleSelect = (size: string) => {
    setSelectedSize(size)
    onSelectSize(size)
  }

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSelect(size)}
          className={`px-4 py-2 border rounded-lg transition-all text-sm ${selectedSize === size
            ? "bg-white text-black border-black"
            : "bg-black text-white border-gray-300 hover:border-black"
            }`}
        >
          {size}
        </button>
      ))}
    </div>
  )
}

export default SizeSelector
