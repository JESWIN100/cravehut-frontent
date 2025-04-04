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
        <div className="flex">
          <button
            className="bg-white shadow-md p-2 rounded-full z-10 hidden md:block"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="bg-white shadow-md p-2 rounded-full z-10 hidden md:block"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-auto no-scrollbar scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="min-w-[260px] md:min-w-[300px] rounded-xl shadow-lg bg-white overflow-hidden"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => nextPage(restaurant._id)}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover"
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
                <p className="text-gray-500 text-sm mt-1">
                  {restaurant.category}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {restaurant.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
