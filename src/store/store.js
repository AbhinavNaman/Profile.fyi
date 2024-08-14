import create from 'zustand';

const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = state.cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...state.cart, product];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () => set(() => {
    localStorage.removeItem('cart');
    return { cart: [] };
  }),
}));

export default useCartStore;
