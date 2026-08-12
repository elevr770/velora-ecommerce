"use client"

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ShoppingCart, Heart, Menu } from 'lucide-react'
import { useCart } from './CartContext'
import { useWishlist } from './WishlistContext'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const cart = useCart()
  const wishlist = useWishlist()

  function onSearch(e?: React.FormEvent){
    if(e) e.preventDefault()
    if(query.trim().length === 0) return router.push('/')
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

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

        <form onSubmit={onSearch} className="flex-1 mx-6 hidden md:flex">
          <input aria-label="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products, brands and categories" className="w-full border rounded-lg px-4 py-3 shadow-sm" />
        </form>

        <div className="flex items-center gap-3">
          <Link href="/wishlist" className="relative">
            <Heart className="w-5 h-5 text-gray-700" />
            {wishlist.items.length > 0 && <span className="absolute -top-2 -right-2 bg-velora-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">{wishlist.items.length}</span>}
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cart.count > 0 && <span className="absolute -top-2 -right-2 bg-velora-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">{cart.count}</span>}
          </Link>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="toggle menu"><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {open && (
        <nav className="bg-white border-t md:hidden">
          <div className="container py-4 flex flex-col gap-3">
            <Link href="/category/electronics" className="font-medium">Electronics</Link>
            <Link href="/category/phones-tablets" className="font-medium">Phones & Tablets</Link>
            <Link href="/category/computers" className="font-medium">Computers</Link>
            <Link href="/category/fashion" className="font-medium">Fashion</Link>
            <Link href="/category/home-kitchen" className="font-medium">Home & Kitchen</Link>
          </div>
        </nav>
      )}
    </header>
  )
}
