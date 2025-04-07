import React from 'react';
import Category from '../../components/user/Category';
import Restaurants from '../../components/user/Restaurants';
import { ShoppingBag } from "lucide-react";
export default function HomePage() {
  return (
    <>
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
                href="#category"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#restaurant"
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                Restaurants
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="relative flex items-center after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-yellow-400 after:transition-all after:duration-300"
              >
                <ShoppingBag />
              </a>
            </li>
            <li>
              <a
                href="/login"
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
    <div className="container mx-auto px-4 py-6">
      
      {/* Category Section */}
      <section id='category'>
        <Category />
      </section>

      {/* Restaurants Section */}
      <section className="mt-10"  id="restaurant">
        <Restaurants />
      </section>
      <section className='relative px-6 py-6 max-w-full mx-16'>
  <div className="bg-center text-white py-16 px-6 rounded-lg shadow-lg text-center">
    <img 
      src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-8b70-51f7-bc18-a7910b50c58a/raw?se=2025-04-03T16%3A26%3A41Z&sp=r&sv=2024-08-04&sr=b&scid=92336f2a-f8a6-52c3-b8b4-29d249b0a634&skoid=0abefe37-d2bd-4fcb-bc88-32bccbef6f7d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-03T03%3A36%3A49Z&ske=2025-04-04T03%3A36%3A49Z&sks=b&skv=2024-08-04&sig=HkNtzS/kw595rDIUfuxlj63bAyytB7UC1V58F864W9E%3D" 
      alt="Descriptive Alt Text" 
      className="w-full  mx-auto  rounded-lg shadow-md"
    />
  </div>
</section>

    </div>
    </>

  );
}
