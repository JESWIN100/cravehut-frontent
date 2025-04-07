import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axisoInstance'
import axios from 'axios'

export default function ResturentDetailPage() {
  const [resturant,setResturant]=useState([])
  const [foods,setFoods]=useState([])
  const {id}=useParams()


  useEffect(()=>{
    const fetchResturent=async()=>{
      const response=await axiosInstance.get(`resturent/getallbyid/${id}`)
      setResturant(response.data.data);
      
    }
    fetchResturent()
  },[])

    useEffect(()=>{
    const fetchResturentFoods=async()=>{
      const response=await axiosInstance.get(`resturent/getresturantfood/${id}`)
      console.log(response.data.foods);
      setFoods(response.data.foods);
      
    }
    fetchResturentFoods()
  },[])


  const addToCart=async(foodItem)=>{
      try {
        const payload={
          productId:foodItem._id,
          quantity:1
        }
        const response=await axiosInstance.post("/cart/add",payload,{
          withCredentials:true
        })
        console.log(response.data)
      } catch (error) {
        console.log(error);
        alert('Failed to add item to cart.')
      }
  }
  return (
    <div>
        <div className="flex flex-col items-center bg-gray-100 w- p-6 min-h-screen">
      {/* Restaurant Info Card */}
      <div className="bg-white shadow-lg rounded-2xl p-5 min-w-[300px] md:min-w-[400px] lg:min-w-[800px] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{resturant.name}</h2>
          <p className="text-gray-600">{resturant.address}</p>
          <p className="text-gray-500">{resturant.category}</p>
          <div className="flex items-center mt-2 text-yellow-500">
            <span className="font-semibold">{resturant.ratings}</span>
            <span className="ml-1">⭐</span>
          </div>
          <p className="text-gray-600 mt-2 flex items-center">
            Order above 500 for free delivery
            <span className="ml-2">🚚</span>
          </p>
        </div>
        <img
          src={resturant.image}
          alt="restaurant"
          className="rounded-xl object-cover w-[100px] h-[80px]"
        />
      </div>

      {/* Menu Item Card */}
      {foods.map((food,index)=>(
        <div className="bg-white shadow-lg rounded-2xl p-4 flex mt-4 min-w-[200px] md:min-w-[300px] lg:min-w-[990px]">
        <img
          src={food.image}
          alt="Chicken Kebab"
          className="rounded-xl object-cover w-[80px] h-[80px]"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-bold">{food.name}</h3>
          <p className="text-gray-600 text-sm">
            {food.description}.
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-700">Rating: {food.ratings}</p>
          <p className="text-gray-700">Price: ₹{food.price}</p>
          <button className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded-lg"onClick={() => addToCart(food)}>Add</button>
        </div>
      </div>
      ))}
    
   
    </div>
    </div>
  )
}
