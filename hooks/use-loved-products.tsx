import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProductType } from '@/types/product'
import { toast } from 'sonner'

interface UseLovedProductType {
  lovedItems: ProductType[]
  addLovedItem: (data: ProductType) => void
  removeLovedItem: (id: number) => void
}

export const useLovedProducts = create(
  persist<UseLovedProductType>(
    (set, get) => ({
      lovedItems: [],
      addLovedItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems
        const existingItem = currentLovedItems.find((item) => item.id === data.id)

        if (existingItem) {
          toast.error("El producto ya existe en favoritos 😎")
          return
        }

        set({
          lovedItems: [...currentLovedItems, data]
        })

        toast.success("Producto añadido a favoritos 📃")
      },

      removeLovedItem: (id: number) => {
        set({
          lovedItems: get().lovedItems.filter((item) => item.id !== id)
        })
        toast("Producto se ha eliminado de favoritos 💔")
      },
    }),
    {
      name: "Loved-products-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
