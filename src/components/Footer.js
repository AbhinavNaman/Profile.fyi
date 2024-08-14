"use client";

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';


export default function Footer() {

  return (
    <nav className=" p-4" style={{backgroundColor: "#2874f0"}}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-semibold flex gap-4">
        <ShoppingBag />  Profile.fyi
        </Link>
      </div>
    </nav>
  );
}
