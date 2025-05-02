import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axisoInstance'
import axios from 'axios'
import { toast } from 'sonner'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
export default function ResturentDetailPage() {
  const [resturant,setResturant]=useState([])
  const [foods,setFoods]=useState([])
   const [showAuthModal, setShowAuthModal] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
   const [pendingItem, setPendingItem] = useState(null);
  const {id}=useParams()
console.log(id);

const navigate=useNavigate()
  useEffect(()=>{
    const fetchResturent=async()=>{
      const response=await axiosInstance.get(`resturent/getid/${id}`)
      console.log(response);
      setResturant(response.data.data);
      
    }
    fetchResturent()
  },[])

    useEffect(()=>{
    const fetchResturentFoods=async()=>{
   try {
    const response=await axiosInstance.get(`resturent/getresturantfood/${id}`)
   
    
    setFoods(response.data.foods);
   } catch (error) {
    console.log(error);
    
   }
      
    }
    fetchResturentFoods()
  },[])

console.log(foods);

const addToCart = (foodItem) => {
  const newRestaurantId = foodItem.restaurant._id;
  const existingRestaurantId = localStorage.getItem("cartResturentId");

  if (existingRestaurantId && existingRestaurantId !== newRestaurantId) {
    setPendingItem(foodItem);
    setShowConfirm(true);
    return;
  }

  handleAddToCart(foodItem);
};

const handleAddToCart = async (foodItem) => {
  try {
    const payload = {
      productId: foodItem._id,
      quantity: 1,
      restaurant: foodItem.restaurant.name,
      restaurantId: foodItem.restaurant._id,
      restaurantImage: foodItem.restaurant.image,
    };

    const response = await axiosInstance.post("/cart/add", payload,{withCredentials:true});

    localStorage.setItem("cartResturentId", foodItem.restaurant._id);

    toast.success(
      <div>
        Added to Cart{' '}
        <a href="/cart" target="_blank" rel="noopener noreferrer" className="underline">
          View Cart
        </a>
      </div>
    );
  } catch (error) {
    console.log(error.response);
    if (error.response?.data?.token === false) {
      toast.warning("Your session has expired. Please log in again.");
    }
  }
};

  

  const handleConfirmNo = () => {
    setPendingItem(null);
    setShowConfirm(false);
  };

  const handleConfirmYes = () => {
    if (pendingItem) {
      handleAddToCart(pendingItem);
      setPendingItem(null);
    }
    setShowConfirm(false);
  };



  
  return (
    <div className="flex flex-col items-center bg-gray-100 w-full p-6 min-h-screen">
  {/* Check if restaurant data is available */}
  {resturant ? (
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
  ) : (
    <div className="text-center mt-10">
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486790.png"
        alt="No Restaurant Data"
        className="w-32 h-32 mx-auto"
      />
      <p className="text-gray-500 mt-4">No restaurant data available</p>
    </div>
  )}

  {/* Check if food data is available */}
  {foods && foods.length > 0 ? (
  <div className="grid gap-3 p-2 w-11/12">
    {foods.map((food, index) => (
    <div
    key={index}
    className= "bg-white  rounded-2xl shadow-sm p-4 flex justify-between items-center  "
  >
    <div className="flex-1">
      <h4 className="text-md font-bold">{food.name}</h4>
      {food.category}
      <p className="text-gray-900 text-xl font-bold mt-1">₹{food.price}</p>


      <div className="text-green-600 text-sm mt-1">
        ★ {food.ratings} ({food.totalRatings})
      </div>
      <p className="text-gray-500 text-sm mt-1">{food.description}</p>
    </div>
    <div className="flex flex-col items-center">
      <img
        src={food.image}
        alt={food.name}
        className="rounded-lg object-cover w-24 h-20 mb-2"
      />
      <button
        className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
        onClick={() => addToCart(food)}
      >
        ADD
      </button>
    </div>
  </div>
    ))}
  </div>
) : (
  <div className="flex flex-col items-center justify-center p-4 h-[60vh]">
    <img
      src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
      alt="No Food Data"
      className="w-48 opacity-80"
    />
    <p className="text-gray-400 mt-4 text-sm">No food items found</p>
    <button 
      className="mt-4 text-yellow-500 text-sm font-medium"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
)}
   <Dialog open={showConfirm} onClose={handleConfirmNo}>
        <DialogTitle>Replace Cart?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your cart contains items from another restaurant. Do you want to clear it and add this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmYes} color="error" variant="contained">
            Yes, Replace
          </Button>
        </DialogActions>
      </Dialog>
</div>




  )
}
