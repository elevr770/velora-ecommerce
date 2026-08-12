"use client"

import { useCart } from '../../components/CartContext'
import ProductCard from '../../components/ProductCard'
import Link from 'next/link'

export default function CartPage(){
  const { items, remove, update, subtotal, count, clear } = useCart()

  if(items.length === 0) return (
    <main className="container py-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Browse products and add items to your cart.</p>
        <Link href="/" className="btn-primary mt-4 inline-block">Continue Shopping</Link>
      </div>
    </main>
  )

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-4">
            {items.map(i => (
              <div key={i.id} className="flex items-center gap-4 border rounded p-4">
                <img src={i.product.images[0]} alt={i.product.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{i.product.name}</div>
                  <div className="text-sm text-gray-500">₦{i.product.price.toLocaleString()}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-3 py-1 border rounded" onClick={()=> update(i.id, i.quantity-1)}>-</button>
                    <div>{i.quantity}</div>
                    <button className="px-3 py-1 border rounded" onClick={()=> update(i.id, i.quantity+1)}>+</button>
                    <button className="ml-4 text-sm text-red-600" onClick={()=> remove(i.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="card p-4">
          <div className="text-sm text-gray-500">Items: {count}</div>
          <div className="text-lg font-semibold mt-2">Subtotal: ₦{subtotal.toLocaleString()}</div>
          <div className="mt-4">
            <button className="btn-primary w-full">Proceed to Checkout</button>
            <button className="mt-3 w-full border rounded-md py-2" onClick={()=> clear()}>Clear Cart</button>
          </div>
        </aside>
      </div>
    </main>
  )
}
