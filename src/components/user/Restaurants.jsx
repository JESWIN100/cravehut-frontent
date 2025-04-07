import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { axiosInstance } from "../../config/axisoInstance";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/resturent/getall");
        console.log(response.data.data);
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextPage = (id) => {
    navigate(`/resturant/${id}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === "left") {
        current.scrollLeft -= 300;
      } else {
        current.scrollLeft += 300;
      }
    }
  };

  return (
    <div className="relative px-6 py-6 max-w-6xl mx-auto">
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold mb-4">
        Top restaurant chains in Kozhikode
      </h2>
    </div>
  
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {restaurants.map((restaurant) => (
       <div
       key={restaurant._id}
       className="rounded-xl shadow-lg bg-white overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
     >
     
          <div
            className="relative cursor-pointer"
            onClick={() => nextPage(restaurant._id)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-40 object-cover cursor-pointer"
            />
            {restaurant.offers && (
              <div className="absolute bottom-2 left-2 bg-black text-white text-sm px-2 py-1 rounded-lg">
                {restaurant.offers}
              </div>
            )}
          </div>
          <div className="p-3 shadow-2xl w-auto max-w-sm bg-white">
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <span className="flex items-center text-green-600 font-bold">
                <Star size={14} className="mr-1" />
                {restaurant.ratings}
              </span>
              <span className="mx-2">•</span>
              <span>{restaurant.time}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{restaurant.category}</p>
            <p className="text-gray-400 text-sm mt-2">{restaurant.address}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Restaurants;
