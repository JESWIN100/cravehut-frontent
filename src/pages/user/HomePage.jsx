import React, { useEffect, useState } from 'react';
import Category from '../../components/user/Category';
import Restaurants from '../../components/user/Restaurants';
import { ShoppingBag, Search, User, Home, Utensils } from "lucide-react";
import { axiosInstance } from '../../config/axisoInstance';
import { useLocation } from 'react-router-dom';
export default function HomePage() {
 const [cart, setCarts] = useState([]);
 const location = useLocation();
 const user = location.state?.user;
 
 const [searchQuery, setSearchQuery] = useState('');
 const [searchResults, setSearchResults] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);

// const searchResults=
//   [
//     {
//       "id": 1,
//       "name": "Burger Palace",
//       "cuisine": "American, Fast Food",
//       "location": "Downtown",
//       "image": "https://example.com/burger.jpg",
//       "rating": 4.5,
//       "deliveryTime": "20-30 min"
//     },
//     {
//       "id": 2,
//       "name": "Pizza Heaven",
//       "cuisine": "Italian",
//       "location": "Midtown",
//       "image": "https://example.com/pizza.jpg",
//       "rating": 4.7,
//       "deliveryTime": "25-35 min"
//     },
//     {
//       "id": 3,
//       "name": "Sushi World",
//       "cuisine": "Japanese",
//       "location": "Uptown",
//       "image": "https://example.com/sushi.jpg",
//       "rating": 4.6,
//       "deliveryTime": "30-40 min"
//     },
//     {
//       "id": 4,
//       "name": "Taco Fiesta",
//       "cuisine": "Mexican, Street Food",
//       "location": "Old Town",
//       "image": "https://example.com/taco.jpg",
//       "rating": 4.3,
//       "deliveryTime": "15-25 min"
//     },
//     {
//       "id": 5,
//       "name": "Curry House",
//       "cuisine": "Indian",
//       "location": "City Center",
//       "image": "https://example.com/curry.jpg",
//       "rating": 4.8,
//       "deliveryTime": "20-30 min"
//     },
//     {
//       "id": 6,
//       "name": "Green Garden",
//       "cuisine": "Vegan, Healthy",
//       "location": "West Side",
//       "image": "https://example.com/vegan.jpg",
//       "rating": 4.4,
//       "deliveryTime": "25-35 min"
//     }
//   ]
  


 
 // ... other useEffect hooks ...

 // Search handler with debounce
 useEffect(() => {
   const timer = setTimeout(() => {
     if (searchQuery.trim() !== '') {
       fetchSearchResults(searchQuery);
     } else {
       setSearchResults([]);
     }
   }, 300); // 300ms debounce

   return () => clearTimeout(timer);
 }, [searchQuery]);

 const fetchSearchResults = async (query) => {
   try {
     const response = await axiosInstance.get(`/user/search?q=${query}`);
     console.log(response.data.foods);
     
     setSearchResults(response.data.foods);
     setShowDropdown(true);
   } catch (error) {
     console.error("Search error:", error);
     setSearchResults([]);
   }
 };

 const handleSearchChange = (e) => {
   setSearchQuery(e.target.value);
 };

 const handleSearchSubmit = (e) => {
   e.preventDefault();
   // Handle search submission
   if (searchQuery.trim() !== '') {
     // You can navigate to search results page or filter existing content
     console.log("Searching for:", searchQuery);
   }
 };
 
  useEffect(()=>{
    const fetchCart=async()=>{
      const response=await axiosInstance.get("/cart",{withCredentials:true})
  
      setCarts(response.data.items)
    }
    fetchCart()
  },[])
  


  return (
    <>
       <header
        className="relative bg-black text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${"https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "70vh",
          minHeight: "500px"
        }}
      >
        {/* Navigation Bar */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Utensils className="text-yellow-400" size={28} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">CraveHut</h1>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8 items-center">
                <li>
                  <a
                    href="#category"
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#restaurant"
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    <Utensils size={18} />
                    <span>Restaurants</span>
                  </a>
                </li>
                <li>
  <a
    href="/cart"
    className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-300"
    aria-label="View Cart"
  >
    <ShoppingBag size={18} />
    <span>Cart</span>
    {cart.length > 0 && (
      <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-yellow-900 bg-yellow-300 rounded-full">
        {cart.length}
      </span>
    )}
  </a>
</li>

                <li>
                  <a
                    href="/login"
                    className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    <User size={18} />
                    <span>Sign In</span>
                  </a>
                </li>
              </ul>
            </nav>
            
            {/* Mobile menu button would go here */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full pt-16 pb-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover & Order <span className="text-yellow-400">Delicious Food</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Order from your favorite restaurants and get it delivered to your doorstep
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl relative">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Search for restaurants, cuisines, or dishes..."
              className="w-full pl-12 pr-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Search Dropdown */}
        {showDropdown && searchResults.length > 0 && (
         <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
         <ul className="py-2">
           {searchResults.map((result) => (
             <li key={result.id}>
               <a
                 href={`/resturant/${result.restaurant._id}`}
                 className="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200"
               >
                 <div className="flex items-start space-x-4">
                   {result.image && (
                     <img 
                       src={result.image} 
                       alt={result.name}
                       className="w-12 h-12 rounded-full object-cover"
                     />
                   )}
                   <div className="flex-1">
                     <div className="flex justify-between items-center">
                       <h4 className="font-semibold text-gray-900">{result.name}</h4>
                       <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                         ₹{result.price}
                       </span>
                     </div>
                     <p className=" text-sm text-gray-600">
                       {result?.restaurant?.name} • {result?.restaurant?.address}
                     </p>
                     <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                       <span>⭐ {result?.rating}</span>
                       <span>🍽️ {result?.category}</span>
                       {result.discount > 0 && (
                         <span className="text-red-500 font-medium">🔥 {result?.discount}% OFF</span>
                       )}
                       <span className={result.availability ? "text-green-600" : "text-red-600"}>
                         {result.availability ? "Available" : "Out of stock"}
                       </span>
                     </div>
                   </div>
                 </div>
               </a>
             </li>
           ))}
         </ul>
       </div>
       
        )}
        
        {/* No results message */}
        {showDropdown && searchQuery && searchResults.length === 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg py-4 px-4">
            <p className="text-gray-600">No results found for "{searchQuery}"</p>
          </div>
        )}
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
      src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" 
      alt="Descriptive Alt Text" 
      className="w-full  mx-auto  rounded-lg shadow-md"
    />
  </div>
</section>


<footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Utensils className="text-yellow-400" size={28} />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">CraveHut</h2>
              </div>
              <p className="text-gray-400">Delivering happiness to your doorstep since 2023.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Blog</a></li>

                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} CraveHut. All rights reserved.
          </div>
        </div>
      </footer>
    </div>


    
    </>

  );
}
