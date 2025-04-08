import { Search, MoreVertical, Frown, CheckCircle, Clock, XCircle, Sliders } from 'lucide-react';
import { useState } from 'react';

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: "#1234",
      customer: "John Doe",
      restaurant: "Burger King",
      items: 3,
      total: "$24.50",
      status: "delivered",
      date: "2023-05-15 14:30"
    },
    {
      id: "#1235",
      customer: "Jane Smith",
      restaurant: "Pizza Hut",
      items: 2,
      total: "$32.75",
      status: "preparing",
      date: "2023-05-15 13:45"
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      restaurant: "Sushi Palace",
      items: 4,
      total: "$45.20",
      status: "pending",
      date: "2023-05-15 12:15"
    },
    {
      id: "#1237",
      customer: "Sarah Williams",
      restaurant: "Taco Bell",
      items: 1,
      total: "$8.99",
      status: "cancelled",
      date: "2023-05-14 18:20"
    },
    {
      id: "#1238",
      customer: "David Brown",
      restaurant: "McDonald's",
      items: 2,
      total: "$14.50",
      status: "delivered",
      date: "2023-05-14 17:30"
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 lg:ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.restaurant}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.total}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'preparing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'pending'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status === 'delivered' ? (
                          <CheckCircle size={14} className="inline mr-1" />
                        ) : order.status === 'preparing' ? (
                          <Clock size={14} className="inline mr-1" />
                        ) : order.status === 'cancelled' ? (
                          <XCircle size={14} className="inline mr-1" />
                        ) : null}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <MoreVertical size={18} />
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
            <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
            <div className="text-sm text-gray-500 mb-2 sm:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">{filteredOrders.length}</span> orders
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Previous
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
