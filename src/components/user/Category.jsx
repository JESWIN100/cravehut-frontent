;
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axisoInstance';
import { useNavigate } from 'react-router-dom';

const Category = () => {
const [foodItems,setFoodItems]=useState([])
const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/getallcategory");
     console.log(response);
     
        setFoodItems(response.data.categories)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextPage = (id) => {
    navigate(`/category/${id}`);
  }
  
  
  return (
    <div className="p-4 relative px-6 py-6 max-w-6xl mx-auto ">
  <h2 className="text-center text-2xl font-bold mb-4">What's on your mind?</h2>
  
  {/* Make sure this div allows horizontal scroll */}
  <div className="">
    {/* This is the scrollable row */}
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-6">
      {foodItems.map((item, index) => (
        <div 
          key={index} 
          className="flex-none flex flex-col items-center w-48  transform transition-transform duration-300 hover:scale-110 hover:rounded-shadow-xl"  
          onClick={() => nextPage(item.name)}
        >
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-36 rounded-full object-cover mb-2 cursor-pointer" 
          />
          <span className="text-center">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>

  
  
  );
};

export default Category;