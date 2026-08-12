"use client"

import React from 'react'

export default function Rating({ value }: { value: number }){
  const stars = Array.from({length:5}).map((_,i)=>i+1)
  return (
    <div className="flex items-center text-yellow-500">
      {stars.map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(value) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  )
}
