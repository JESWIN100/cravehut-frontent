import {
  Search,
  MoreVertical,
  Frown,
  CheckCircle,
  Clock,
  XCircle,
  Sliders,
} from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axisoInstance";

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dashboardData, setDashboardData] = useState({ recentOrders: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/admin/getall", {
          withCredentials: true,
        });
        const data = response.data;
        console.log(data);
        
        const recentOrders = data?.payments || [];
        setDashboardData({ recentOrders });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredOrders = dashboardData.recentOrders.filter((order) => {
    const customerName = order.name || "";
    const restaurantName = order.resturentName|| "Food Order"; // fallback
    const orderId = order._id || "";
    const matchesSearch =
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

console.log("dfd",paginatedOrders);


  return (
    <div className="space-y-6 lg:ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
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
                onChange={(e) => {
                  setCurrentPage(1);
                  setStatusFilter(e.target.value);
                }}
              >
                <option value="all">All Status</option>
                <option value="placed">Placed</option>
                <option value="preparing">Preparing</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {paginatedOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Restaurant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
  {paginatedOrders.map((order) => (
    <tr key={order._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium text-sm">
        {order._id.slice(-6).toUpperCase()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
        {order.name}
      </td>

      {/* Show restaurant name and food items */}
      <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
        {order.data.length > 0 && (
          <div>
            <div className="font-semibold mb-1 flex items-center">
              <img
                src={order.data[0].restaurantId?.image}
                alt={order.data[0].restaurantId?.name}
                className="w-6 h-6 object-cover rounded-full mr-2"
              />
              {order.data[0].restaurantId?.name}
            </div>
            <ul className="list-disc pl-4 text-xs text-gray-700">
              {order.data.map((item, index) => (
                <li key={index}>
                  {item?.name} (x{item?.quantity})
                </li>
              ))}
            </ul>
          </div>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
        {order.data.reduce((acc, item) => acc + item.quantity, 0)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-gray-900">
        ₹{order.data
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            order.orderStatus === "delivered"
              ? "bg-green-100 text-green-800"
              : order.orderStatus === "preparing"
              ? "bg-yellow-100 text-yellow-800"
              : order.orderStatus === "pending"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.orderStatus === "delivered" ? (
            <CheckCircle size={14} className="inline mr-1" />
          ) : order.orderStatus === "preparing" ? (
            <Clock size={14} className="inline mr-1" />
          ) : order.orderStatus === "cancelled" ? (
            <XCircle size={14} className="inline mr-1" />
          ) : null}
          {order.orderStatus}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleString()}
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
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
            <div className="text-sm text-gray-500 mb-2 sm:mb-0">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
              </span>{" "}
              of <span className="font-medium">{filteredOrders.length}</span> orders
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
