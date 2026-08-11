import ProductCard from '../../components/ProductCard'
import { products } from '../../data/products'
import Link from 'next/link'

export default function CategoryPage({ params }: any){
  const { slug } = params
  // simple filter by slug in name
  const items = products.filter(p => p.slug.includes(slug))
  return (
    <main className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{slug.replace('-', ' ').toUpperCase()}</h1>
        <Link href="/">Back</Link>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.length === 0 && <div className="col-span-full text-center text-gray-500">No products found.</div>}
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  )
}
