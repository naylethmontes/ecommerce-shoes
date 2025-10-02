import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from 'sonner'
import { ProductType } from "@/types/product"

export type CartItem = ProductType & {
  selectedSize?: string
  selectedColor?: string
  selectedColorImage?: string
  //logica de duplicar
  cartItemId: string

}

interface CartStore {
  items: CartItem[]  // <--- Aquí debe usar CartItem, no ProductType
  addItem: (data: CartItem) => void
  //items: ProductType[]
  //addItem: (data: ProductType) => void
  removeItem: (cartItemId: string) => void
  removeAll: () => void
  updateItemSize: (cartItemId: string, size: string) => void
  updateItemColor: (cartItemId: string, color: string) => void
  duplicateItem: (item: CartItem) => void
  getTotalPrice: () => number

}

export const useCart = create(persist<CartStore>((set, get) => ({
  items: [], //productType en ves de CartItem
  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.attributes.price, 0),
  addItem: (data: CartItem) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id === data.id &&
      item.selectedSize === data.selectedSize &&
      item.selectedColor === data.selectedColor

    ); //empieza el recorrido de duplicar

    if (existingItem) {

      toast.error("El producto ya existe en el carrito 🤪")
      return
    }

    set({
      items: [...get().items, { ...data, cartItemId: crypto.randomUUID() }]
    });
    toast.success("Producto añadido al carrito 🛍")

  },

  // Logica de duplicar producto y limitaciones
  duplicateItem: (item: CartItem) => {
    const currentItems = get().items;

    // Contar cuántos productos idénticos hay (mismo id, talla y color)
    const identicalItemsCount = currentItems.filter(
      (i) =>
        i.id === item.id &&
        i.selectedSize === item.selectedSize &&
        i.selectedColor === item.selectedColor
    ).length;

    if (identicalItemsCount >= 2) {
      toast.error("No puedes añadir más de 2 unidades iguales 😅");
      return;
    }

    const duplicatedItem: CartItem = {
      ...item,
      cartItemId: crypto.randomUUID(), // nuevo ID único
    };

    set({
      items: [...currentItems, duplicatedItem],
    });

    toast.success("Producto duplicado ✨");
  },

  removeItem: (cartItemId: string) => {
    set({ items: [...get().items.filter((item) => item.cartItemId !== cartItemId)] })
    toast("Producto eliminado del carrito 🗑")
  },

  removeAll: () => {
    set({ items: [] })
    toast("Carrito vaciado 🧹")
  },

  updateItemSize: (cartItemId, newSize) => {
    const updatedItems = get().items.map(item =>
      item.cartItemId === cartItemId
        ? { ...item, selectedSize: newSize }
        : item
    )
    set({ items: updatedItems })
    toast.success("Talla actualizada 👟")
  },


  updateItemColor: (cartItemId, newColor) => {
    const updatedItems = get().items.map(item => {
      if (item.cartItemId === cartItemId) {
        // Buscar la imagen del color seleccionado
        const colorData = item.attributes.colors.data.find(
          color => color.attributes.name === newColor
        );
        const newImage = colorData?.attributes.imageColor?.data?.attributes?.url
        if (!colorData) {
          toast.warning("Color no tiene imagen asociada");
        }


        return {
          ...item,
          selectedColor: newColor,
          selectedColorImage: newImage,
        };
      }
      return item;
    });

    set({ items: updatedItems });
    toast.success("Color actualizado 🎨");
  },

}),
  {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  }))


