"use client"

export default function Footer(){
  return (
    <footer className="bg-velora-50 mt-12 py-12 border-t">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold">VELORA</h3>
          <p className="text-sm text-gray-600 mt-2">Premium marketplace — Everything you need in one place.</p>
        </div>
        <div>
          <h4 className="font-semibold">Customer Service</h4>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>Help Center</li>
            <li>Delivery</li>
            <li>Returns & Refunds</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Sell With Us</h4>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>Become a Seller</li>
            <li>Seller Center</li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600">© 2026 VELORA. All rights reserved.</div>
    </footer>
  )
}
