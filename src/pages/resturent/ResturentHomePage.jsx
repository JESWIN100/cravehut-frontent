import React, { useEffect } from 'react'
import { axiosInstance } from '../../config/axisoInstance';
import { useNavigate } from 'react-router-dom';
export default function ResturentHomePage() {
const navigate=useNavigate()
  useEffect(()=>{
const check=async()=>{
  const response=await axiosInstance.get("/resturent/check/hasrestaurant",{withCredentials:true})
  console.log(response.data);
  if(response.data.hasRestaurant==false){
    navigate("/owner/create-restaurant")
  }
}
check()
  })

  return (
    <div className='lg:ml-64 space-x-6'>
      
    </div>
  )
}
