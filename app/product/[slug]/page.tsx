import ProductCard from '../../../components/ProductCard'
import { products } from '../../../data/products'

export default function ProductPage({ params }: any){
  const { slug } = params
  const product = products.find(p => p.slug === slug)
  if (!product) return <main className="container py-8"> <div className="text-center text-gray-500">Product not found.</div></main>
  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img src={product.images[0]} alt={product.name} className="w-full rounded-md" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-3 text-2xl font-semibold">₦{product.price.toLocaleString()}</div>
          <p className="mt-4 text-gray-600">{product.shortDesc}</p>

          <div className="mt-6">
            <button className="btn-primary w-full">Add to cart</button>
            <button className="mt-3 w-full border rounded-md py-2">Buy Now</button>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Similar Products</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0,4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  )
}
