import React, { useEffect, useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  Search, 
  Filter, 
  Utensils, 
  Bike,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { axiosInstance } from '../../config/axisoInstance';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchdata = async() => {
      const response = await axiosInstance.get("/payment/get", { withCredentials: true });
      console.log(response.data);
      setOrders(response.data);
    }
    fetchdata();
  }, []);

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'delivered' && order.orderStatus === 'delivered') ||
                      (activeTab === 'cancelled' && order.orderStatus === 'cancelled');
    
    // Convert search to lowercase once
    const searchLower = searchQuery.toLowerCase();
    
    // Check if orderId or any item in data matches the search
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchLower) ||
      (order.data && order.data.some(item => 
        item.name && item.name.toLowerCase().includes(searchLower)
      ));
    
    return matchesTab && matchesSearch;
  });

  const getStatusIcon = (orderStatus) => {
    switch(orderStatus) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={18} />;
      default:
        return <Clock className="text-orange-500" size={18} />;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600">View and track your past orders</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by restaurant or order ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50">
            <Filter className="text-gray-500 mr-2" size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'all' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'delivered' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('delivered')}
          >
            Delivered
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'cancelled' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-800 mr-2">{order.name || 'Order'}</h2>
                        {order.orderStatus === 'delivered' && order.rating && (
                          <div className="flex items-center bg-green-50 px-2 py-0.5 rounded-full">
              
                            <Star className="text-yellow-400 mr-1" size={14} fill="currentColor" />
                            <span className="text-green-700 text-sm">{order.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">{order.orderId} • {formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.orderStatus)}
                      <span className={`ml-2 text-sm font-medium ${
                        order.orderStatus === 'delivered' ? 'text-green-600' : 
                        order.orderStatus === 'cancelled' ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {order.orderStatus === 'delivered' ? 'Delivered' : 
                         order.orderStatus === 'cancelled' ? 'Cancelled' : 'In Progress'}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <div className="flex items-center text-gray-500 mb-2">
                      <Utensils className="mr-2" size={16} />
                      <span className="text-sm">Order Items</span>
                    </div>
                    <div className="pl-6 space-y-3">
  {order.data && order.data.map((item, index) => (
    <div key={index} className="flex items-center justify-between  text-sm mb-1">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-cover rounded-md mr-2"
      />
      <span className="text-gray-600 flex-1">
        {item.quantity}x {item.name}
      </span>
      <span className="text-gray-800">₹{item.price}</span>
    </div>
  ))}
</div>

                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100">
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center text-gray-500 mb-1">
                        <MapPin className="mr-2" size={16} />
                        <span className="text-sm">{order.address}</span>
                      </div>
                      {order.orderStatus === 'delivered' && (
                        <div className="flex items-center text-gray-500">
                          <Calendar className="mr-2" size={16} />
                          <span className="text-sm">Delivered on {order.updatedAt && formatDate(order.updatedAt)}</span>
                        </div>
                      )}
                      {order.orderStatus === 'cancelled' && (
                        <p className="text-red-500 text-sm mt-1">Order was cancelled</p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="text-lg font-semibold">₹{order.totalCost}</p>
                      </div>
                      <Link to={`/track-order/${order.orderId}`}>
                      <button onclick className="flex items-center text-orange-500 hover:text-orange-600">
                        <span className="mr-1">Details</span>
                        <ChevronRight size={18} />
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto max-w-md">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
              <p className="text-gray-500">
                {searchQuery ? 
                  'Try adjusting your search or filter to find what you\'re looking for.' : 
                  'You haven\'t placed any orders yet.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;