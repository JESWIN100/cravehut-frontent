import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axisoInstance';
import { useNavigate } from 'react-router-dom';

export default function ResturentHomePage() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        // Check if user has a restaurant
        const hasRestaurantRes = await axiosInstance.get("/resturent/check/hasrestaurant", { withCredentials: true });
        
        if (hasRestaurantRes.data.hasRestaurant === false) {
          navigate("/owner/create-restaurant");
        } else {
          // Fetch restaurant details
          const restaurantRes = await axiosInstance.get("/resturent/getallbyid", { withCredentials: true });
          setRestaurant(restaurantRes.data.data);
          console.log(restaurantRes);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    check();
  }, [navigate]);

  if (loading) {
    return <div className='lg:ml-64 p-4'>Loading...</div>;
  }

  if (!restaurant) {
    return <div className='lg:ml-64 p-4'>No restaurant data found</div>;
  }

  return (
    <div className='lg:ml-64 p-6'>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Restaurant Image */}
        <div className="h-48 bg-gray-200 overflow-hidden">
          {restaurant.image && (
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Restaurant Details */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{restaurant.name}</h1>
              <p className="text-gray-600">{restaurant.address}</p>
              <p className="text-gray-600 mt-1">Contact: {restaurant.contactNumber}</p>
            </div>
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-800 font-medium">{restaurant.ratings} ★</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Cuisine Type</h2>
            <p className="text-gray-600">{restaurant.cuisineType}</p>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Category</h2>
            <p className="text-gray-600">{restaurant.category}</p>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Delivery Available</h2>
            <p className="text-gray-600">{restaurant.deliveryAvailable ? "Yes" : "No"}</p>
          </div>
          
          {restaurant.offers && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-700">Special Offers</h2>
              <p className="text-gray-600">{restaurant.offers}</p>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}