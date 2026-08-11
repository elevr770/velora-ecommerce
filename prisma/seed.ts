import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Phones & Tablets', slug: 'phones-tablets' },
    { name: 'Computers', slug: 'computers' },
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Home & Kitchen', slug: 'home-kitchen' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Grocery', slug: 'grocery' },
    { name: 'Sports', slug: 'sports' }
  ]

  // Upsert categories (idempotent)
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: { name: c.name, slug: c.slug }
    })
  }

  const sampleProducts = [
    {
      name: 'Velora Wireless Bluetooth Headphones',
      slug: 'velora-wireless-headphones',
      shortDesc: 'Premium noise-cancelling wireless headphones',
      description: 'Comfortable, long battery life, crisp audio. Ideal for music and calls.',
      brand: 'Velora Audio',
      sku: 'VEL-AUD-001',
      price: 2500000, // ₦25,000.00 stored as kobo (x100)
      discountPrice: 2000000,
      discountPct: 20,
      stock: 25,
      rating: 4.5,
      reviewCount: 120,
      images: [
        { url: 'https://via.placeholder.com/800x800?text=Headphones', alt: 'Velora Headphones' }
      ],
      categories: ['electronics']
    },
    {
      name: 'Velora Smart Phone X1',
      slug: 'velora-smartphone-x1',
      shortDesc: 'Powerful performance with an elegant design',
      description: '6.5" display, 8GB RAM, 128GB storage, excellent camera.',
      brand: 'Velora Mobile',
      sku: 'VEL-PHN-001',
      price: 15000000,
      discountPrice: 13500000,
      discountPct: 10,
      stock: 40,
      rating: 4.7,
      reviewCount: 540,
      images: [
        { url: 'https://via.placeholder.com/800x800?text=Smartphone', alt: 'Velora Smartphone' }
      ],
      categories: ['phones-tablets']
    },
    {
      name: 'Velora Classic Leather Jacket',
      slug: 'velora-leather-jacket',
      shortDesc: 'Stylish genuine leather jacket',
      description: 'Premium leather, tailored fit, timeless style.',
      brand: 'Velora Apparel',
      sku: 'VEL-FSH-001',
      price: 4500000,
      discountPrice: 4000000,
      discountPct: 11,
      stock: 12,
      rating: 4.3,
      reviewCount: 80,
      images: [
        { url: 'https://via.placeholder.com/800x800?text=Leather+Jacket', alt: 'Leather Jacket' }
      ],
      categories: ['fashion']
    },
    {
      name: 'Velora Stainless Steel Cookware Set (10pcs)',
      slug: 'velora-cookware-10pcs',
      shortDesc: 'Durable cookware for everyday cooking',
      description: 'High-quality stainless steel, oven safe, easy to clean.',
      brand: 'Velora Home',
      sku: 'VEL-HOM-001',
      price: 1200000,
      discountPrice: 1000000,
      discountPct: 17,
      stock: 60,
      rating: 4.6,
      reviewCount: 200,
      images: [
        { url: 'https://via.placeholder.com/800x800?text=Cookware', alt: 'Cookware Set' }
      ],
      categories: ['home-kitchen']
    }
  ]

  for (const p of sampleProducts) {
    // Upsert product (idempotent)
    const prod = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        shortDesc: p.shortDesc,
        description: p.description,
        brand: p.brand,
        sku: p.sku,
        price: p.price,
        discountPrice: p.discountPrice,
        discountPct: p.discountPct,
        stock: p.stock,
        rating: p.rating,
        reviewCount: p.reviewCount
      },
      create: {
        name: p.name,
        slug: p.slug,
        shortDesc: p.shortDesc,
        description: p.description,
        brand: p.brand,
        sku: p.sku,
        price: p.price,
        discountPrice: p.discountPrice,
        discountPct: p.discountPct,
        stock: p.stock,
        rating: p.rating,
        reviewCount: p.reviewCount,
        images: {
          create: p.images
        }
      }
    })

    // Ensure images exist (if product existed but had no images)
    const imgs = await prisma.productImage.findMany({ where: { productId: prod.id } })
    if (imgs.length === 0 && p.images && p.images.length > 0) {
      await prisma.productImage.createMany({
        data: p.images.map((img) => ({ productId: prod.id, url: img.url, alt: img.alt }))
      })
    }

    // Connect categories via explicit ProductCategory join model
    for (const catSlug of p.categories) {
      const cat = await prisma.category.findUnique({ where: { slug: catSlug } })
      if (cat) {
        // upsert using the compound unique (productId + categoryId)
        await prisma.productCategory.upsert({
          where: { productId_categoryId: { productId: prod.id, categoryId: cat.id } },
          update: {},
          create: { productId: prod.id, categoryId: cat.id }
        })
      }
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
