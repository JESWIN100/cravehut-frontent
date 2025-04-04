import { ShoppingBag } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <header
      className="bg-black h-96 text-white p-6"
      style={{
        backgroundImage: `url(${"https://png.pngtree.com/background/20230528/original/pngtree-an-arrangement-of-various-indian-food-picture-image_2778221.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navigation Section */}
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-bold">CreaveHut</h1>
        <nav>
          <ul className="flex space-x-6 items-center md:space-x-8">
            <li>
              <a
                href="#"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                Restaurants
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative flex items-center after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                <ShoppingBag />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                Sign in
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Search Bar Section */}
      <div className="mt-6 text-center  ">
        <h2 className="text-lg font-semibold">Discover the best food & drinks near you</h2>
        <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for restaurants or dishes here"
          className="mt-4 p-3 w-full max-w-xl rounded-lg border text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        </div>
        
      </div>
    </header>
  );
}
