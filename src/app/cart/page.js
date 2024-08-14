"use client";
import Link from 'next/link';
import useCartStore from '../../store/store';
import { useEffect } from 'react';
import { saveCartToFirebase } from '../../utils/firebase';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { CircleMinus, CircleMinusIcon, CirclePlus, CirclePlusIcon, Frown, ShoppingCart, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { user } = useUser();
  const [discount, setDiscount] = useState(null);
  const [finalTotal, setFinalTotal] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState('');
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  console.log(cart);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      useCartStore.setState({ cart: cartItems });
    }
  }, []); 

  const calculateDiscount = () => {
    const randomDiscount = Math.floor(Math.random() * 41); // Random discount between 0-40%
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (subtotal * randomDiscount) / 100;
    const newTotal = subtotal - discountAmount;

    setDiscount(randomDiscount);
    setFinalTotal(newTotal.toFixed(2));
    setCongratsMessage(`Congratulations! You have received a ${randomDiscount}% discount!`);
  };

  const handleSave = () => {
    if (user && user.id) {
      saveCartToFirebase(cart, user.id)
        .then(() => {
          console.log('Cart saved successfully.');
          clearCart();  // Clear the cart after saving
          setThankYouMessage('Thank you for shopping! Your cart has been saved.');
          setShowFeedback(true);

      // Hide the feedback after 1.5 seconds
      setTimeout(() => {
        setShowFeedback(false);
      }, 1000);
        })
        .catch((error) => {
          console.error('Error saving cart:', error);
        });
    } else {
      console.error('User is not authenticated.');
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-2/3 text-white shadow-md rounded-md">
          {cart.length === 0 ? (
            thankYouMessage ? (
              <>
              <p className="text-center text-green-600">{thankYouMessage}</p>
              {showFeedback && (
              <div className="absolute top-0 left-0 w-full h-full bg-green-500 text-white flex items-center justify-center rounded-md opacity-90 animate-pulse">
          <ShoppingCart size={48} />
        </div>
         )}
              </>
            ) : (
              <>
              <p className="text-center text-gray-600 m-12 ">Your cart is empty. </p>

              </>
            )
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-500 rounded-md mb-4">
                <div className="flex items-center">
                  <img src={item?.image} alt={item?.title} className="h-20 w-20 object-cover rounded-md" />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-white">{item?.title}</h2>
                    <p className="text-gray-100">${item?.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-white py-2 rounded hover:scale-125"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <CircleMinusIcon />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="mx-2 w-12 text-center  rounded text-black"
                  />
                  <button
                    className="text-white py-2 rounded hover:scale-125"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <CirclePlusIcon />
                  </button>
                  <button
                    className="ml-4 text-red py-2 px-4 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="text-red-700 hover:scale-125"/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-1/3 md:ml-6 mt-6 md:mt-0">
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-black">Order Summary</h2>
            <div className="mt-4">
              <p className="text-lg text-black">Subtotal: ${subtotal.toFixed(2)}</p>
              {discount !== null && (
                <>
                  <p className="text-lg text-red-500">Discount: {discount}%</p>
                  <p className="text-lg text-black">Total after Discount: ${finalTotal}</p>
                </>
              )}
              {congratsMessage && <p className="mt-2 text-green-600">{congratsMessage}</p>}
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 hover:scale-105"
                onClick={calculateDiscount}
              >
                Apply Discount
              </button>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 hover:scale-105"
                onClick={handleSave}
              >
                Checkout
              </button>
              <div className="flex gap-4">
              <button
                className="mt-4 w-full bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 hover:scale-105"
              >
                <Link href="/">
                  Home
                </Link>
              </button>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 hover:scale-105"
                onClick={() => {
                  clearCart();
                  setCongratsMessage('');
                  setDiscount(null);
                  setFinalTotal(null);
                  setThankYouMessage('');  // Reset the thank you message
                }}
              >
                Clear Cart
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
