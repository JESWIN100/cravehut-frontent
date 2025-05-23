import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { axiosInstance } from "../../config/axisoInstance";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/resturent/getall");
        if(response.data){
          setLoading(false)

        }
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
        Our Top Restaurants
      </h2>
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {restaurants.map((restaurant) => (
    <div
      key={restaurant._id}
      className="rounded-xl shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div
        className="relative cursor-pointer w-full  rounded-t-xl"
        onClick={() => nextPage(restaurant._id)}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full  h-40 object-cover rounded-t-xl"
        />
        {restaurant.offers && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md shadow-md">
            {restaurant.offers}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-semibold text-lg text-gray-800">
            {restaurant.name}
          </h3>
          <div className="flex items-center text-sm text-green-600 font-semibold">
            <Star size={14} className="mr-1" />
            {restaurant.ratings}
          </div>
        </div>

        <p className="text-gray-500 text-sm">{restaurant.cuisineType}</p>
        <p className="text-gray-400 text-xs mt-2">{restaurant.address}</p>
      </div>
    </div>
  ))}
</div>
{loading && (
  <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative flex items-center justify-center">
            <div
              className="w-16 h-16 border-4 border-t-orange-500 border-b-orange-300 border-l-transparent border-r-transparent rounded-full animate-spin"
              role="status"
              aria-label="Loading"
            ></div>
            {/* Optionally uncomment to add emoji inside spinner */}
            {/* <div className="absolute text-2xl font-semibold text-orange-500">🍔</div> */}
          </div>
          <p className="mt-4 text-base text-gray-700 font-medium">
            Loading...
          </p>
        </div>


)}
  </div>
  
  );
};

export default Restaurants;
