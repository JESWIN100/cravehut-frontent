import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axisoInstance';
import { useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({ title, value, icon, trend, percentage, additionalText }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend === 'up' ? '↑' : '↓';

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {additionalText && <p className="text-gray-400 text-xs mt-1">{additionalText}</p>}
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <span className="text-blue-600 text-xl">{icon}</span>
        </div>
      </div>
      {trend && percentage && (
        <div className="mt-4 flex items-center">
          <span className={`${trendColor} text-sm font-medium`}>
            {trendIcon} {percentage}
          </span>
          <span className="text-gray-400 text-sm ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

const RecentOrders = ({ orders }) => {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.reverse().map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.orderId.slice(0, 8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.data?.length}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalCost}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  order {order.orderStatus}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                   {order.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RevenueChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 8000, 12000, 15000, 18000, 21000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `₹${value.toLocaleString()}`;
          }
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default function RestaurantDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    finalTotal: 0,
    recentOrders: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/admin/getall", { withCredentials: true });
        const data = response.data;


const totalPaid = data.payments
.filter(payment => payment.paymentStatus === "paid")
.reduce((sum, payment) => sum + payment.totalCost, 0);

console.log("Total Paid:", totalPaid);
        const totalOrders = data?.payments?.length || 0;
        const finalTotal = totalPaid || 0;
        const recentOrders = data?.payments?.slice(0, 6) || [];
        const totalUsers=data.totalUser



       

        setDashboardData({
          totalOrders,
          finalTotal,
          recentOrders,
          totalUsers
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className=" bg-gray-100 min-h-screen lg:ml-64 p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Total Orders" value={dashboardData.totalOrders} icon="🛒" trend="up" percentage="8.5%" />
        <DashboardCard title="Final Total" value={`₹${dashboardData.finalTotal}`} icon="💰" trend="up" percentage="12%" />
        <DashboardCard title="Active Users" value={dashboardData.totalUsers} icon="👥" trend="up" percentage="5%" />
      </div>

      {/* <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
        <RevenueChart />
      </div> */}

      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <RecentOrders orders={dashboardData.recentOrders} />
      </div>
    </div>
  );
}
