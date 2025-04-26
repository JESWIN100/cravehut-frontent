import React, { useEffect, useState } from 'react';
import Category from '../../components/user/Category';
import Restaurants from '../../components/user/Restaurants';
import { ShoppingBag, Search, User, Home, Utensils,LogOut, BriefcaseBusiness  } from "lucide-react";
import { axiosInstance } from '../../config/axisoInstance';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import LoginPage from './LoginPage';
export default function HomePage() {
 const [cart, setCarts] = useState([]);
 const location = useLocation();
 const user = location.state?.user;
 
 const [searchQuery, setSearchQuery] = useState('');
 const [searchResults, setSearchResults] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 const [userState, setUserState] = useState([]);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [showAuthModal, setShowAuthModal] = useState(false);
 const [authMode, setAuthMode] = useState("login"); // or "signup"
 const [step, setStep] = useState(1);
 const [emailInput, setEmailInput] = useState("");
 const [otpInput, setOtpInput] = useState("");
 const [nameInput, setNameInput] = useState("");
 const [passwordInput, setPasswordInput] = useState("");
 const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
 
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
  // console.log(response.data);
  
      setCarts(response.data.items)
      // setUserState(response.data)
    }
    fetchCart()
  },[])
  
  useEffect(()=>{
    const fetchCart=async()=>{
      const response=await axiosInstance.get("/user/profile",{withCredentials:true})
  console.log(response.data);
  
      // setCarts(response.data.items)
      setUserState(response.data)
    }
    fetchCart()
  },[])
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout", {}, {
        withCredentials: true,
      });
      localStorage.removeItem("cartResturentId");
      console.log("Logout successful", response.data);
      toast.success(response.data.msg)
      setCarts([]);       // Clear cart
      setUserState(null); // Reset user
      
    } catch (error) {
      console.error("Logout failed", error);
    }
  };








  


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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              CraveHut
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <li>
                <a href="#category" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                  <Home size={18} />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#restaurant" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                  <Utensils size={18} />
                  <span>Restaurants</span>
                </a>
              </li>
              {!userState || Object.keys(userState).length === 0 ?(
          null
) : 
<Link to={"/my-orders"}>
<button 

className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
>
<BriefcaseBusiness size={18}  />

<span>My Orders</span>
</button>
</Link>
 }

              <li>
                <a href="/cart" className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-300" aria-label="View Cart">
                  <div className="relative">
                    <ShoppingBag size={23} />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </a>
              </li>
              <li>
                {!userState || Object.keys(userState).length === 0 ? (
                  <button onClick={() => setShowAuthModal(true)}>Login / Sign Up</button>

                ) : (
                  <button onClick={handleLogout} className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                )}
              </li>
            </ul>
          </nav>

          {showAuthModal && (
  <LoginPage setShowAuthModal={setShowAuthModal} />
)}

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 max-h-3">
            <ul className="flex flex-col space-y-4">
              <li><a href="#category" className="flex items-center space-x-1 text-white hover:text-yellow-400"><Home size={18} /><span>Home</span></a></li>
              <li><a href="#restaurant" className="flex items-center space-x-1 text-white hover:text-yellow-400"><Utensils size={18} /><span>Restaurants</span></a></li>
              {!userState || Object.keys(userState).length === 0 ?(
          null
) : 
<Link to={"/my-orders"}>
<button 

className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300"
>
<BriefcaseBusiness size={18}  />

<span>My Orders</span>
</button>
</Link>
 }
              <li><a href="/cart" className="flex items-center space-x-1 text-white hover:text-yellow-400"><ShoppingBag size={18} /><span>Cart</span></a></li>
              <li>
                {!userState || Object.keys(userState).length === 0 ? (
                 <button onClick={() => setShowAuthModal(true)}>Login / Sign Up</button>
                ) : (
                  <button onClick={handleLogout} className="flex items-center space-x-1 text-white hover:text-yellow-400">
                    <LogOut size={18} /><span>Logout</span>
                  </button>
                )}
              </li>
            </ul>
          </nav>
        )}
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
                placeholder="Search for restaurants or dishes..."
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

          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
              <ul className="py-2">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <a href={`/resturant/${result.restaurant._id}`} className="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-start space-x-4">
                        {result.image && <img src={result.image} alt={result.name} className="w-12 h-12 rounded-full object-cover" />}
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-gray-900">{result.name}</h4>
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">₹{result.price}</span>
                          </div>
                          <p className=" text-sm text-gray-600">{result?.restaurant?.name} • {result?.restaurant?.address}</p>
                          <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                            <span>⭐ {result?.rating}</span>
                            <span>🍽️ {result?.category}</span>
                            {result.discount > 0 && <span className="text-red-500 font-medium">🔥 {result?.discount}% OFF</span>}
                            <span className={result.availability ? "text-green-600" : "text-red-600"}>{result.availability ? "Available" : "Out of stock"}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
      {/* <section className=' px-6 py-6 w-full '>
  <div className=" text-white py-16 px-6 rounded-lg text-center ">
    <img 
      src="https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-58b0-622f-82cf-29cbc7f46789/raw?se=2025-04-10T15%3A42%3A11Z&sp=r&sv=2024-08-04&sr=b&scid=c3a71234-177b-564b-b88a-71fa123d1c66&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-09T20%3A10%3A01Z&ske=2025-04-10T20%3A10%3A01Z&sks=b&skv=2024-08-04&sig=84v70XMrKPUHTT/%2B2NUB4mZ%2BmaHe6E7wrlDbZ1iUev8%3D" 
      alt="Descriptive Alt Text" 
      className="w-full h-auto mx-auto rounded-lg shadow-md"
    />
  </div>
</section> */}



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
