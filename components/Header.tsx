"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-velora-800 flex items-center justify-center text-white font-bold">V</div>
            <div className="hidden md:block">
              <div className="text-lg font-semibold">VELORA</div>
              <div className="text-sm text-gray-500">Everything You Need. One Place.</div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 mx-6">
          <input aria-label="search" placeholder="Search products, brands and categories" className="w-full border rounded-lg px-4 py-2" />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/wishlist" className="hidden md:inline-block text-sm">Wishlist</Link>
          <Link href="/cart" className="text-sm">Cart</Link>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="toggle menu">{open ? 'Close' : 'Menu'}</button>
        </div>
      </div>

      {open && (
        <nav className="bg-white border-t md:hidden">
          <div className="container py-4 flex flex-col gap-3">
            <a className="font-medium">Electronics</a>
            <a className="font-medium">Phones & Tablets</a>
            <a className="font-medium">Computers</a>
            <a className="font-medium">Fashion</a>
            <a className="font-medium">Home & Kitchen</a>
          </div>
        </nav>
      )}
    </header>
  )
}
