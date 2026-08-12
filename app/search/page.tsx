"use client"

import products from '../../data/products'
import ProductCard from '../../components/ProductCard'
import { useSearchParams } from 'next/navigation'

export default function SearchPage(){
  const params = useSearchParams()
  const q = params?.get('q') || ''
  const sort = params?.get('sort') || 'relevance'
  const min = Number(params?.get('min') || 0)
  const max = Number(params?.get('max') || 0)

  let results = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
  if(min) results = results.filter(r => r.price >= min)
  if(max) results = results.filter(r => r.price <= max)

  if(results.length === 0){
    return <main className="container py-8"> <div className="text-center text-gray-500">No products found for "{q}"</div></main>
  }

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Search results for "{q}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  )
}
