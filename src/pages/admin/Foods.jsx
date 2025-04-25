import { Search, Plus, MoreVertical, Frown, Star, Sliders, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axisoInstance';
import { toast } from 'sonner';

export default function Foods() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');


  const [foods, setFood] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axiosInstance.get("/admin/Admingetall", { withCredentials: true });
        console.log(response);

        setFood(response.data.foods);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading after fetching is done (success or fail)
      }
    };

    fetchFoods();
  }, []);


const handleDelete=async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this food?");
    
  if (!confirmDelete) return;
  try {
    const response=await axiosInstance.delete(`/admin/deletefood/${id}`,{withCredentials:true})
    console.log(response);
    toast.success(response.data.msg)
    setFood((prev) => prev.filter((r) => r._id !== id));
  } catch (error) {
    console.log(error);
    
  }
}



  const categories = [...new Set(foods.map(food => food.category))];
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || food.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 lg:ml-64 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Food Menu Management</h1>
        <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={18} className="mr-2" />
          Add Food Item
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search food items..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sliders className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Foods Table */}
        {filteredFoods.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Item</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFoods.map((food) => (
                  <tr key={food.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-lg object-cover" src={food.image} alt={food.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{food.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{food.restaurant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {food.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{food.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star size={16} className="text-amber-400 mr-1" />
                        <span className="text-sm text-gray-900">{food.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  <button onClick={()=>handleDelete(food._id)}  className="text-red-500 hover:text-red-700">
    <Trash  size={18} />
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Frown size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No food items found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredFoods.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
            <div className="text-sm text-gray-500 mb-2 sm:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">15</span> food items
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}