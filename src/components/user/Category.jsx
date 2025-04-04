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
        const response = await axiosInstance.get("/food/getall");
     
        setFoodItems(response.data.foods)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextPage=(id)=>{
    navigate(`/category/${id}`)
  }
  
  return (
    <div className="p-4 relative px-6 py-6 max-w-6xl mx-auto">
    <h2 className="text-center text-2xl font-bold mb-4">What's on your mind?</h2>
    <div className="relative w-full overflow-x-auto overflow-hidden">
      <div className="flex  animate-scroll">
        {foodItems.map((item, index) => (
          <div key={index} className="flex-none flex flex-col items-center w-48"  onClick={() => nextPage(item._id)}>
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-36 rounded-full object-cover mb-2" 
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