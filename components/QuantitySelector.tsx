"use client"

import React from 'react'

export default function QuantitySelector({ value, onChange }: { value: number, onChange: (v:number)=>void }){
  return (
    <div className="inline-flex items-center border rounded-md overflow-hidden">
      <button aria-label="decrease" className="px-3 py-1" onClick={() => onChange(Math.max(1, value-1))}>-</button>
      <div className="px-4 py-1">{value}</div>
      <button aria-label="increase" className="px-3 py-1" onClick={() => onChange(value+1)}>+</button>
    </div>
  )
}
