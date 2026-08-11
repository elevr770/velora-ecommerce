import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home(){
  return (
    <main className="container py-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <h1 className="text-3xl font-bold">Everything You Need. One Place.</h1>
          <p className="text-gray-600 mt-2">Discover great products, quality picks, and everyday essentials delivered to your door.</p>
          <div className="mt-6">
            <button className="btn-primary">Shop Now</button>
            <button className="ml-3 px-4 py-2 border rounded-md">Explore Deals</button>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Flash Deal</h3>
          <p className="text-sm text-gray-500 mt-2">Limited time on selected items</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}
