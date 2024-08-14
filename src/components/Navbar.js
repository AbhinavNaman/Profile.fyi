"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useUser, useClerk, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import useCartStore from '../store/store';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { cart, clearCart } = useCartStore();
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      // Use the set function directly from Zustand to avoid infinite loops
      useCartStore.setState({ cart: cartItems });
    }
  }, []);

  const handleSignOut = () => {
    clearCart(); // Clear the cart
    signOut();   // Then sign out the user
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4" style={{ backgroundColor: "#2874f0" }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold flex gap-4">
          <ShoppingBag />  Profile.fyi
        </Link>
        <div className="flex items-center gap-4">
          {isSignedIn && 
          
          <Link href="/cart" className="relative text-white text-lg flex">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          }
          {isSignedIn ? (
            <>
              <button
                onClick={handleSignOut} // Use handleSignOut here
                className="bg-transparent text-white py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-white text-lg mx-4">
                Sign In
              </Link>
              <Link href="/sign-up" className="text-white text-lg mx-4">
                Sign Up
              </Link>
            </>
          )}
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
