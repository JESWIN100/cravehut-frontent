import { CirclePlus, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axisoInstance'
export default function CategoryDetailPage() {
  const [resturentee,setRestaurants]=useState([])
 
  const {name}=useParams()
const navigate=useNavigate()

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get(`food/restaurants/food/${name}`);
      

  
        // Ensure restaurants is always an array
        setRestaurants(response.data.data );
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
  
    fetchRestaurants();
  }, [name]);
  
  const onclick=async(id)=>{
navigate(`/resturant/${id}`)
  }

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto min-h-screen">
  {resturentee && resturentee.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {resturentee.map((dish) => (
        <div
          key={dish._id}
          className=" rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
          onClick={() => onclick(dish.restaurantDetails._id)}
        >
          <div className="relative">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-48 w-full object-cover"
            />
            {dish.offer && (
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white text-sm px-3 py-1 font-semibold">
                {dish.offer}
              </div>
            )}
          </div>
          <div className="p-4">
            {dish.isAd && (
              <span className="text-xs text-gray-400 uppercase font-bold">Ad</span>
            )}
            <h2 className="text-lg font-semibold mt-1">{dish.restaurantDetails.name} ({dish.name})</h2>
            <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
              <span className="text-green-600 font-semibold">★ {dish.ratings}</span>
              <span>•</span>
              
            </div>
            <p className="text-sm text-gray-600 truncate mt-1">{dish.restaurantDetails.address}</p>
            <p className="text-sm text-gray-500">{dish.address}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center mt-10">
      <img
        src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?semt=ais_country_boost&w=740"
        alt="No Food Data"
        className="w-52 mx-auto"
      />
      <p className="text-gray-500 mt-4">No food items found</p>
    </div>
  )}
</div>

  

  );
}
