"use client";
import { useEffect } from 'react';
import useCartStore from '../store/store';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { cart, addToCart, } = useCartStore();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      // Use the set function directly from Zustand to avoid infinite loops
      useCartStore.setState({ cart: cartItems });
    }
  }, []); 
  const isInCart = cart.some(item => item.id === product.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-4 border border-gray-700 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-80 overflow-hidden rounded-md relative">
        <div className="h-full overflow-y-scroll no-scrollbar">
          <img
            src={product.image}
            alt={product.name}
            className={`h-40 w-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
          />
          <div className="mt-2 text-white">
            <h2 className="text-lg font-semibold truncate text-white-900">{product?.title}</h2>
            <div className="flex items-center mt-1">
              <p className="text-lg font-bold text-green-500 ">${product.price}</p>
              {product.discount && (
                <p className="text-sm text-red-500 ml-2 line-through">${product.originalPrice}</p>
              )}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 mr-1">★</span>
              <p className="text-sm text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</p>
            </div>

            <div className="mt-2 text-gray-400">
              <p className="text-sm"><strong>Category:</strong> {product.category}</p>
              <p className="text-sm mt-1"><strong>Description:</strong> {product.description}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`mt-4 py-2 px-4 w-full rounded ${
          isInCart ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        onClick={() => !isInCart && addToCart({ ...product, quantity: 1 })}
        disabled={isInCart}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
