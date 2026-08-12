"use client"

import products from '../../../data/products'
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '../../../components/CartContext'
import { useWishlist } from '../../../components/WishlistContext'
import QuantitySelector from '../../../components/QuantitySelector'
import Rating from '../../../components/Rating'

export default function ProductPage({ params }: any){
  const { slug } = params
  const product = products.find((p:any)=>p.slug === slug)
  const { add } = useCart()
  const { toggle, has } = useWishlist()
  const [qty, setQty] = useState(1)

  if(!product) return <main className="container py-8"> <div className="text-center text-gray-500">Product not found.</div></main>

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="w-full bg-gray-100 rounded-md overflow-hidden">
            <Image src={product.images[0]} alt={product.name} width={1200} height={1200} className="object-cover w-full h-full" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {product.images.map((img:any,i:number)=> (
              <div key={i} className="w-full h-20 bg-gray-50 rounded overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3"><Rating value={product.rating} /><div className="text-sm text-gray-500">({product.reviewCount} reviews)</div></div>
          <div className="mt-4 text-2xl font-semibold text-velora-800">₦{product.price.toLocaleString()}</div>
          {product.oldPrice && <div className="text-sm text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</div>}
          <div className="mt-4 text-sm">{product.shortDesc}</div>

          <div className="mt-6 flex items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} />
            <button className="btn-primary" onClick={()=>add(product, qty)}>Add to cart</button>
            <button className="px-4 py-2 border rounded-md" onClick={()=>toggle(product.id)}>{has(product.id)? 'Remove Wishlist' : 'Add to Wishlist'}</button>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <div><strong>Availability:</strong> {product.stock > 0 ? 'In stock' : 'Out of stock'}</div>
            <div className="mt-2"><strong>Category:</strong> {product.category}</div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Similar Products</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.filter(p=>p.category===product.category && p.slug!==product.slug).slice(0,4).map(p=> (
            <div key={p.id}><img src={p.images[0]} alt="" className="w-full h-40 object-cover rounded" /></div>
          ))}
        </div>
      </section>
    </main>
  )
}
