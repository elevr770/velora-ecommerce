"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import products from '../data/products'

type CartItem = {
  id: string
  product: any
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  add: (product: any, qty?: number) => void
  remove: (id: string) => void
  update: (id: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }){
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try{
      const raw = localStorage.getItem('velora_cart')
      if(raw) setItems(JSON.parse(raw))
    }catch(e){
      // ignore
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(items))
  }, [items])

  function add(product: any, qty = 1){
    setItems((prev) => {
      const existing = prev.find(i => i.product.id === product.id)
      if(existing){
        return prev.map(i => i.product.id === product.id ? {...i, quantity: Math.min(i.quantity + qty, product.stock)} : i)
      }
      return [...prev, { id: product.id, product, quantity: Math.min(qty, product.stock) }]
    })
  }

  function remove(id: string){
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function update(id: string, qty: number){
    setItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, Math.min(qty, i.product.stock))} : i))
  }

  function clear(){
    setItems([])
  }

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
