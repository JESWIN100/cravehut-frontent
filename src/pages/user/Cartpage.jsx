import React, { useState } from 'react';
import Lottie from 'lottie-react';
import data from '../../assets/Animation - 1743700155868.json';

export default function CartPage() {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const itemTotal = 224;
  const deliveryFee = 20;
  const platformFee = 10;
  const gstCharges = 12.28;
  
  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'save10') {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const totalAmount = itemTotal + deliveryFee + platformFee + gstCharges - discount;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full flex flex-col md:flex-row">
        {/* Left Section: Address & Animation */}
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <Lottie animationData={data} loop={true} className="w-48" />
          <h1 className="text-xl font-semibold mt-4">Delivery Address</h1>
          <input 
            type="text" 
            placeholder="Enter your name & address" 
            className="border rounded p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded px-4 py-2 w-full mt-4">
            Save Address & Proceed
          </button>
        </div>
        
        {/* Right Section: Cart Items & Summary */}
        <div className="md:w-1/2 ">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <div className="bg-white shadow-lg p-5 rounded-lg">
            <img src="https://plus.unsplash.com/premium_photo-1670984939096-f3cfd48c7408?fm=jpg&q=60&w=3000" alt="Food" className="rounded-lg w-full h-48 object-cover mb-4"/>
            <h1 className="text-xl font-bold">Jubilee Restaurant</h1>
            <h2 className="text-gray-600">Sultan Bathery</h2>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span>Chicken Biryani</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 rounded-l px-3">-</button>
                <span className="px-4">1</span>
                <button className="bg-gray-300 rounded-r px-3">+</button>
              </div>
              <a href="#" className="text-blue-500 mt-2 block">Customize</a>
            </div>

            {/* Coupon Code Section */}
            <div className="border border-gray-300 mt-4 p-3 rounded">
              <input 
                type="text" 
                placeholder="Enter Coupon Code" 
                className="border p-2 rounded w-2/3 focus:outline-none" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon} className="ml-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                Apply
              </button>
            </div>

            {/* Bill Details */}
            <h3 className="mt-5 font-semibold">Bill Details</h3>
            <div className="flex justify-between mt-2">
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>GST and Restaurant Charges</span>
              <span>₹{gstCharges}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mt-2 text-green-600">
                <span>Discount Applied</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <div className="border-t border-gray-300 mt-4 pt-3">
              <h2 className="text-xl font-bold">TO PAY</h2>
              <span className="text-xl">₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}