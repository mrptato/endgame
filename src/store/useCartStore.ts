import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { Product } from '../types';

// what we add to the base product for cart items
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        total: 0,

        addItem: (product) =>
          set((state) => {
            // check if we already got this item
            const existingItem = state.items.find((item) => item.id === product.id);
            let newItems;

            if (existingItem) {
              // bump up the quantity by 1
              newItems = state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              // first time adding this item
              newItems = [...state.items, { ...product, quantity: 1 }];
            }

            // recalculate the total
            const newTotal = newItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return {
              items: newItems,
              total: newTotal,
            };
          }),

        removeItem: (productId) =>
          set((state) => {
            // yeet this item out
            const newItems = state.items.filter((item) => item.id !== productId);
            // update the total
            const newTotal = newItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            return { items: newItems, total: newTotal };
          }),

        updateQuantity: (productId, quantity) =>
          set((state) => {
            // update how many we want
            const newItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            );
            // get the new total
            const newTotal = newItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            return { items: newItems, total: newTotal };
          }),
      }),
      {
        name: 'shopping-cart',
        version: 1,
      }
    )
  )
);

export default useCartStore; 