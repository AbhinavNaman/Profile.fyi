import useCartStore from '../store/store';
import { useEffect } from 'react';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity, } = useCartStore();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      useCartStore.setState({ cart: cartItems });
    }
  }, []);

  console.log(item);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src={item.image} alt={item?.title} className="h-20 w-20 object-cover" />
        <div className="ml-4">
          <h2 className="text-lg">{item?.title}</h2>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          className="w-12 text-center border"
        />
        <button
          className="ml-4 bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
