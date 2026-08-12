"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type WishlistContextType = {
  items: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }){
  const [items, setItems] = useState<string[]>([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('velora_wishlist')
      if(raw) setItems(JSON.parse(raw))
    }catch(e){}
  }, [])

  useEffect(()=>{
    localStorage.setItem('velora_wishlist', JSON.stringify(items))
  }, [items])

  function toggle(id: string){
    setItems(prev => prev.includes(id) ? prev.filter(i=>i!==id) : [...prev, id])
  }

  function has(id: string){
    return items.includes(id)
  }

  return <WishlistContext.Provider value={{ items, toggle, has }}>{children}</WishlistContext.Provider>
}

export function useWishlist(){
  const ctx = useContext(WishlistContext)
  if(!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
