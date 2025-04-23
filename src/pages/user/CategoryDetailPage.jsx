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
      
  console.log(response);
  
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
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {resturentee.map((dish) => (
          <div
            key={dish._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => onclick(dish._id)}
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="h-48 w-full object-cover rounded-t-xl cursor-pointer"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{dish.name}</h2>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 mt-1">{dish.address}</p>
                <p className="text-yellow-600 font-semibold mt-1">{dish.ratings}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{dish.category}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center mt-10">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?semt=ais_country_boost&w=740"
          alt="No Food Data"
          className="w-52  mx-auto"
        />
        <p className="text-gray-500 mt-4">No food items found</p>
      </div>
    )}
  </div>
  

  );
}
