import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../components/CartContext'
import { WishlistProvider } from '../components/WishlistContext'

export const metadata = {
  title: 'VELORA — Everything You Need. One Place.',
  description: 'VELORA marketplace — discover great products and deals.'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
