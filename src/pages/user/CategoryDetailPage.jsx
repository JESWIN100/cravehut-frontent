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
    <div className='px-6 py-6 max-w-6xl mx-auto '>

    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
    {resturentee.map((dish) => (
      <div
        key={dish.id}
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
            <div className="flex items-center space-x-2">
              {/* <span className="text-gray-800 font-medium">₹{dish.price}</span> */}
              {/* <button className="w-8 h-8 bg-yellow-400 text-white rounded-full text-lg leading-none hover:bg-yellow-500">
                +
              </button> */}
            </div>
          </div>
          <div className='flex justify-between'>
          <p className="text-sm text-gray-600 mt-1">{dish.address}</p>

          <p className="text-yellow-600 font-semibold mt-1">{dish.ratings}</p>
          </div>
          <p className="text-sm text-gray-600 mt-1">{dish.category}</p>

        </div>
      </div>
    ))}
  </div>
  </div>

  );
}
