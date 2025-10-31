import ImagesOnClick from "@/components/shared/images-onClick";
import ProductStyleTaste from "@/components/shared/product-style-taste";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { Plus, Trash } from "lucide-react";
import { normalizeProduct } from "@/lib/normalizers";

interface CartItemProps {
  product: ProductType & {
    selectedSize?: string;
    selectedColor?: string;
    cartItemId: string;
  };
}

const CartItem = ({ product }: CartItemProps) => {
  const { removeItem, updateItemSize, updateItemColor, duplicateItem } = useCart();
  const normalized = normalizeProduct(product);

  return (
    <li className="flex flex-wrap items-center py-6 border-b mt-5 gap-4">
      {/* Imagen */}
      <ImagesOnClick
        slug={normalized.attributes.slug}
        url={normalized.attributes.images?.data?.[0]?.attributes?.url}
      />

      {/* Info principal */}
      <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4 px-4">
        <div className="flex-1">
          <h2 className="text-2xl mt-2 font-sans">{normalized.attributes.productName}</h2>

          {/* Talla */}
          <div className="mt-3">
            <label
              htmlFor={`size-${product.id}`}
              className="text-md font-bold text-gray-600 mb-1 block dark:text-gray-300"
            >
              Talla:
            </label>
            <select
              id={`size-${product.id}`}
              value={product.selectedSize || ""}
              onChange={(e) => updateItemSize(product.cartItemId, e.target.value)}
              className="border px-3 py-1 rounded-md text-md dark:bg-gray-300 dark:text-black font-sans w-full sm:w-auto"
            >
              <option value="" disabled>
                Selecciona una talla
              </option>
              {normalized.attributes?.sizes?.data?.map((sizeObj) => {
                const size = sizeObj.attributes?.name;
                return (
                  <option key={sizeObj.id} value={size}>
                    {size}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Color */}
          <div className="mt-3">
            <label
              htmlFor={`color-${product.id}`}
              className="text-md font-bold text-gray-600 mb-1 block dark:text-gray-300"
            >
              Color:
            </label>
            <select
              id={`color-${product.id}`}
              value={product.selectedColor || ""}
              onChange={(e) => updateItemColor(product.cartItemId, e.target.value)}
              className="border px-3 py-1 rounded-md text-md mb-2 dark:bg-gray-300 dark:text-black font-sans w-full sm:w-auto"
            >
              <option value="" disabled>
                Selecciona un color
              </option>
              {normalized.attributes?.colors?.data?.map((color) => (
                <option key={color.id} value={color.attributes?.name}>
                  {color.attributes?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Precio y estilos */}
          <p className="font-bold mt-3 text-lg">{formatPrice(normalized.attributes.price)}</p>
          <ProductStyleTaste
            style={normalized.attributes.style}
            taste={normalized.attributes.taste}
          />
        </div>

        {/* Botones */}
        <div className="flex sm:flex-col flex-row sm:justify-between items-center gap-3 mt-3 sm:mt-0">
          {/* Eliminar */}
          <button
            onClick={() => removeItem(product.cartItemId)}
            className={cn(
              "rounded-full border bg-white flex items-center justify-center px-3 py-1 mb-4 hover:scale-110 transition dark:text-black shadow-sm"
            )}
            title="Eliminar"
          >
            <Trash size={22} />
          </button>

          {/* Duplicar */}
          <button
            onClick={() => duplicateItem(product)}
            className={cn(
              "rounded-full flex items-center justify-center bg-white border shadow-sm px-3 py-1  mb-4 hover:scale-110 transition dark:text-black"
            )}
            title="Duplicar producto"
          >
            <Plus size={22} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
