"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from './CartContext'
import { useWishlist } from './WishlistContext'
import Rating from './Rating'

export default function ProductCard({ product }: { product: any }){
  const { add } = useCart()
  const { toggle, has } = useWishlist()
  const [adding, setAdding] = useState(false)
  const wished = has(product.id)

  return (
    <article className="card p-4 hover:shadow-lg transition-shadow duration-150">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="w-full aspect-square bg-gray-100 rounded-md overflow-hidden">
          <Image src={product.images[0]} alt={product.name} width={600} height={600} className="object-cover w-full h-full" />
        </div>
      </Link>
      <div className="mt-3">
        <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-velora-800">{product.name}</Link>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-lg font-bold">₦{product.price.toLocaleString()}</div>
            {product.oldPrice && <div className="text-sm text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</div>}
          </div>
          <button aria-label="Add to wishlist" className={`p-2 rounded-md hover:bg-gray-100 ${wished ? 'text-velora-500' : 'text-gray-600'}`} onClick={() => toggle(product.id)}>
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2"><Rating value={product.rating} /> <span className="text-xs">({product.reviewCount})</span></div>
          <div>{product.stock > 0 ? <span className="text-green-600">In stock</span> : <span className="text-red-600">Out of stock</span>}</div>
        </div>
        <div className="mt-3">
          <button className="w-full btn-primary flex items-center justify-center gap-2" onClick={() => { setAdding(true); add(product, 1); setTimeout(()=>setAdding(false),600) }}>
            <ShoppingCart className="w-4 h-4" />
            {adding ? 'Adding...' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
