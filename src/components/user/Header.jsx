import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axisoInstance";

export default function Header() {
  const [cart, setCarts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart", {
          withCredentials: true,
        });
      
        setCarts(response?.data?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4">
      <Link to="/" className="text-3xl font-bold text-yellow-500">
        CraveHut
      </Link>
      <div className="flex space-x-4">
        {/* <Link to="/" className="text-gray-700 hover:text-yellow-500">
          Home
        </Link> */}
        {/* <a
          href="/#restaurants"
          className="text-gray-700 hover:text-yellow-500"
        >
          Restaurants
        </a> */}
        <Link
  to="/cart"
  className="relative flex items-center text-black hover:text-yellow-400 transition-colors duration-300"
  aria-label="View Cart"
>
  <div className="relative">
    <ShoppingBag size={24} />
    {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
        {cart.length}
      </span>
    )}
  </div>
</Link>

      </div>
    </nav>
  );
}
