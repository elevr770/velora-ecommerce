import ProductCard from '../components/ProductCard'
import products from '../data/products'
import Link from 'next/link'

export default function Home(){
  const featured = products.slice(0,4)
  const flash = products.filter(p => p.discountPct && p.discountPct >= 15).slice(0,4)
  const popular = products.slice(0,8)
  const newArrivals = products.slice(-6)

  return (
    <main className="container py-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 card p-8">
          <h1 className="text-4xl font-bold text-velora-800">Everything You Need. One Place.</h1>
          <p className="text-gray-600 mt-3">Discover great products, incredible deals, and everyday essentials delivered to your door.</p>
          <div className="mt-6 flex gap-4">
            <Link href="/category/electronics" className="btn-primary">Shop Electronics</Link>
            <Link href="/category/fashion" className="px-4 py-2 border rounded-md">Explore Fashion</Link>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold">Flash Deal</h3>
          <p className="text-sm text-gray-500 mt-2">Limited time offers on selected items</p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {flash.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.images[0]} alt="" className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-sm text-velora-800 font-semibold">₦{p.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popular.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold">Sign up for our newsletter</h3>
          <p className="text-sm text-gray-500 mt-2">Get exclusive deals and new arrivals straight to your inbox.</p>
          <div className="mt-4">
            <input placeholder="Enter your email" className="w-full border rounded-md px-3 py-2" />
            <button className="mt-3 btn-primary w-full">Subscribe</button>
          </div>
        </div>
        <div className="col-span-2 card p-6">
          <h3 className="font-semibold">Promotions</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-velora-800 text-white rounded-lg p-6">Electronics sale — up to 30% off</div>
            <div className="bg-velora-500 text-white rounded-lg p-6">Fashion picks — new season arrivals</div>
          </div>
        </div>
      </section>
    </main>
  )
}
