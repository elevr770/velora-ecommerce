"use client"

import products from '../../data/products'
import { useWishlist } from '../../components/WishlistContext'
import ProductCard from '../../components/ProductCard'
import Link from 'next/link'

export default function WishlistPage(){
  const { items, toggle } = useWishlist()
  const list = products.filter(p => items.includes(p.id))

  if(list.length === 0) return (
    <main className="container py-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-2">Save products to your wishlist and come back later.</p>
        <Link href="/" className="btn-primary mt-4 inline-block">Start Shopping</Link>
      </div>
    </main>
  )

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  )
}
