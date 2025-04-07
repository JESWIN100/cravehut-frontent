import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ResturentHeader() {
  return (
    <div>
            <nav className="flex items-center justify-between bg-white shadow-md p-4">
     <Link to="/" className="text-3xl font-bold text-yellow-500">
      CraveHut
    </Link>
    {/* <div className="flex space-x-4">
        <a href="/" className="text-gray-700 hover:text-yellow-500">Home</a>
        <a href="#restaurants" className="text-gray-700 hover:text-yellow-500">Restaurants</a>
        <a href="/cart" className="text-gray-700 hover:text-yellow-500">
            <ShoppingBag/>
        </a>
    </div> */}
</nav>
    </div>
  )
}
