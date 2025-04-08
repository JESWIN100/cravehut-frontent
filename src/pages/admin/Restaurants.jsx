import { Search, Plus, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axisoInstance";

export default function Restaurants() {
  const [resturants, setResturant] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResturent = async () => {
      try {
        const response = await axiosInstance.get("/admin/AdminResturantgetall",{withCredentials:true});
        console.log(response.data.data);
        setResturant(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // ✅ Ensures loading is always turned off
      }
    };

    fetchResturent();
  }, []);

  const filteredRestaurants = resturants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='lg:ml-64 p-6'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Restaurants Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition">
          <Plus size={18} className="mr-2" />
          Add Restaurant
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search restaurants..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No restaurants found.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRestaurants.map((restaurant) => (
                        <tr key={restaurant._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                                <img src={restaurant.image} alt="" className="h-full w-full object-cover" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              restaurant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {restaurant.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <span className="mr-1">{restaurant.ratings}</span>
                              <div className="text-yellow-400">★</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">Showing 1 to 5 of {filteredRestaurants.length} entries</div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-lg">Previous</button>
                    <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">1</button>
                    <button className="px-3 py-1 border rounded-lg">2</button>
                    <button className="px-3 py-1 border rounded-lg">3</button>
                    <button className="px-3 py-1 border rounded-lg">Next</button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
