"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Heart } from 'lucide-react'

export default function ProductCard({ product }: { product: any }){
  const [adding, setAdding] = useState(false)
  return (
    <article className="card p-4">
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
          <button aria-label="Add to wishlist" className="p-2 rounded-md hover:bg-gray-100">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div>{product.rating} ★ ({product.reviewCount})</div>
          <div>{product.stock > 0 ? 'In stock' : 'Out of stock'}</div>
        </div>
        <div className="mt-3">
          <button className="w-full btn-primary" onClick={() => { setAdding(true); setTimeout(()=>setAdding(false),800) }}>
            {adding ? 'Adding...' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
