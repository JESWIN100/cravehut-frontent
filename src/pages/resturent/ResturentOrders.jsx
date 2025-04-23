import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  User,
  Phone,
  MapPin,
  Utensils,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Printer,
  ChefHat,
  Package,
  Truck,
  CircleDollarSign
} from 'lucide-react';
import { axiosInstance } from '../../config/axisoInstance';

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/resturent/orders", { withCredentials: true });
        if (response.data?.payments) {
          const formatted = response.data.payments.map((order) => ({
            id: order.orderId,
            customer: order.name,
            email: order.email,
            address: order.address,
            phone: 'N/A',
            type: order.address ? 'delivery' : 'pickup',
            items: order.data.map(item => ({
              name: item.name,
              qty: item.quantity,
              price: item.price,
              image: item.image
            })),
            total: order.totalCost,
            status: order.orderStatus,
            paymentStatus: order.paymentStatus,
            createdAt: new Date(order.createdAt),
            time: new Date(order.createdAt).toLocaleTimeString(),
            date: new Date(order.createdAt).toLocaleDateString(),
            paymentMethod: 'Online', // You might want to get this from your API
            restaurantId: order.restaurantId,
            userId: order.userId
          }));
          setOrders(formatted);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id?.includes(search) || 
      order.customer?.toLowerCase().includes(search.toLowerCase()) ||
      order.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const updateStatus = async (orderId, newStatus) => {
    try {
      // Update in backend first
      await axiosInstance.patch(`/resturent/orders/${orderId}`, {
        status: newStatus
      }, { withCredentials: true });
      
      // Then update locally
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'placed':
        return <Clock size={16} className="text-yellow-500" />;
      case 'preparing':
        return <ChefHat size={16} className="text-blue-500" />;
      case 'ready':
        return <Package size={16} className="text-green-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-gray-500" />;
      default:
        return <Clock size={16} />;
    }
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <CheckCircle size={12} /> Paid
        </span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Clock size={12} /> Pending
        </span>;
      case 'failed':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <XCircle size={12} /> Failed
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
          {status}
        </span>;
    }
  };



  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axiosInstance.put(`/resturent/status/${orderId}`, {
        status: newStatus
      }, { withCredentials: true });
  
      console.log("Status updated:", res.data);
  
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className='lg:ml-64'>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Utensils className="text-amber-600" size={24} />
          Restaurant Orders
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-gray-500 text-sm">Total Orders</div>
            <div className="text-2xl font-bold">{orders.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-gray-500 text-sm">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'placed').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-gray-500 text-sm">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'preparing').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-gray-500 text-sm">Completed</div>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'completed').length}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders by ID, name or email..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="placed">Placed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="border-b">
                {/* Order Summary */}
                <div
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 text-amber-800 p-2 rounded-lg">
                      <CircleDollarSign size={20} />
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <span className="text-amber-600 font-mono">#{order.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          order.status === 'ready' ? 'bg-green-100 text-green-800' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>{order.customer}</span>
                        <span>{order.date} • {order.time}</span>
                        <span className="font-medium">₹{order.total}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                      order.type === 'delivery' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {order.type === 'delivery' ? <Truck size={14} /> : <Package size={14} />}
                      {order.type === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                    <ChevronDown
                      className={`transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                      size={18}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="p-4 bg-gray-50 border-t">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border">
                          <h3 className="font-medium mb-3 flex items-center gap-2">
                            <User size={16} />
                            Customer Info
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-gray-600">{order.email}</p>
                            </div>
                            <p className="flex items-center gap-2 text-sm">
                              <Phone size={14} />
                              {order.phone || 'Not provided'}
                            </p>
                            {order.type === 'delivery' && (
                              <div>
                                <p className="flex items-start gap-2 text-sm">
                                  <MapPin size={14} className="mt-0.5" />
                                  <span>
                                    <span className="font-medium">Delivery address:</span><br />
                                    {order.address}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white p-4 rounded-lg border">
                          <h3 className="font-medium mb-3 flex items-center gap-2">
                            <CreditCard size={16} />
                            Payment Details
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              {getPaymentStatusBadge(order.paymentStatus)}
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Method:</span>
                              <span className="font-medium">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium">₹{order.total}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order ID:</span>
                              <span className="font-mono text-sm">{order.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="bg-white p-4 rounded-lg border md:col-span-2">
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <Utensils size={16} />
                          Order Details
                        </h3>
                        <div className="divide-y">
                          {order.items.map((item, i) => (
                            <div key={i} className="py-3 flex gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                {item.image && (
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">₹{item.price} each</p>
                              </div>
                              <div className="text-right">
                                <p>₹{item.price * item.qty}</p>
                                <p className="text-sm text-gray-500">× {item.qty}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t font-medium flex justify-between text-lg">
                          <span>Total Amount:</span>
                          <span>₹{order.total}</span>
                        </div>

                        {/* Order Timeline */}
                        <div className="mt-6">
                          <h4 className="font-medium mb-2">Order Timeline</h4>
                          <div className="relative">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                            <div className="space-y-4">
                              <div className="relative pl-8">
                                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-amber-100"></div>
                                <div>
                                  <p className="font-medium">Order Placed</p>
                                  <p className="text-sm text-gray-500">{order.date} at {order.time}</p>
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${
                                  order.status === 'preparing' || order.status === 'ready' || order.status === 'completed' 
                                    ? 'bg-blue-500 border-4 border-blue-100' 
                                    : 'bg-gray-300 border-4 border-gray-100'
                                }`}></div>
                                <div>
                                  <p className={`${
                                    order.status === 'preparing' || order.status === 'ready' || order.status === 'completed' 
                                      ? 'font-medium' 
                                      : 'text-gray-400'
                                  }`}>Preparing</p>
                                  {order.status === 'preparing' && (
                                    <p className="text-sm text-blue-500">Currently being prepared</p>
                                  )}
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${
                                  order.status === 'ready' || order.status === 'completed' 
                                    ? 'bg-green-500 border-4 border-green-100' 
                                    : 'bg-gray-300 border-4 border-gray-100'
                                }`}></div>
                                <div>
                                  <p className={`${
                                    order.status === 'ready' || order.status === 'completed' 
                                      ? 'font-medium' 
                                      : 'text-gray-400'
                                  }`}>Ready</p>
                                  {order.status === 'ready' && (
                                    <p className="text-sm text-green-500">Ready for {order.type === 'delivery' ? 'delivery' : 'pickup'}</p>
                                  )}
                                </div>
                              </div>
                              <div className="relative pl-8">
                                <div className={`absolute left-0 top-0 w-4 h-4 rounded-full ${
                                  order.status === 'completed' 
                                    ? 'bg-gray-500 border-4 border-gray-100' 
                                    : 'bg-gray-300 border-4 border-gray-100'
                                }`}></div>
                                <div>
                                  <p className={`${
                                    order.status === 'completed' 
                                      ? 'font-medium' 
                                      : 'text-gray-400'
                                  }`}>Completed</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {order.status !== 'completed' && (
                        <>
                          {order.status === 'placed' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'preparing')}
                              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 flex items-center gap-2 transition"
                            >
                              <ChefHat size={16} /> Start Preparing
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'ready')}
                              className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 flex items-center gap-2 transition"
                            >
                              <Package size={16} /> Mark as Ready
                            </button>
                          )}
                          <button
                            onClick={() => handleStatusChange(order.id, 'completed')}
                            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition"
                          >
                            <CheckCircle size={16} /> Complete Order
                          </button>
                        </>
                      )}
                      <button className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 flex items-center gap-2 transition">
                        <Printer size={16} /> Print Receipt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              {search || filter !== 'all' ? (
                <p>No orders match your search criteria</p>
              ) : (
                <p>No orders found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrders;