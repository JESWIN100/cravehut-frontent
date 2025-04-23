import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Utensils,
  Bike,
  CookingPot,
  CircleCheck,
  User
} from 'lucide-react';
import { axiosInstance } from '../../config/axisoInstance';
import { useParams } from 'react-router-dom';

const OrderTrackingPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status timeline configuration
  const statusSteps = [
    { id: 'placed', label: 'Order Placed', icon: <CircleCheck className="text-green-500" size={20} /> },
    { id: 'preparing', label: 'Preparing your food', icon: <CookingPot className="text-orange-500" size={20} /> },
    { id: 'on-the-way', label: 'On the way', icon: <Bike className="text-blue-500" size={20} /> },
    { id: 'delivered', label: 'Delivered', icon: <CheckCircle className="text-green-500" size={20} /> },
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/payment/getby/${id}`, { 
          withCredentials: true 
        });
        // Ensure the response data is in the expected format
        if (response.data && Array.isArray(response.data)) {
          setOrder(response.data[0]); // Take first item if array
        } else if (response.data) {
          setOrder(response.data); // Use directly if not array
        } else {
          throw new Error('Invalid order data format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch order details');
        console.log(err);
        
      } finally {
        setLoading(false);
      }
  }

    fetchOrder();
  }, [id])

  // Calculate total items count safely
  // const totalItems = order?.data?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const totalItems =order?.data?.length 

  // Format time remaining based on status
  const getTimeRemaining = () => {
    switch (order?.orderStatus) {
      case 'preparing':
        return '30-40 mins';
      case 'on-the-way':
        return '15-20 mins';
      case 'delivered':
        return 'Delivered';
        case 'cancelled':
        return 'Cancelled';
      default:
        return 'Processing';
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Track Your Order</h1>
              <p className="text-gray-600">Order ID: {order.orderId || 'N/A'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full ${
                order.orderStatus === 'delivered' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {order.orderStatus === 'delivered' ? (
                  <span className="flex items-center">
                    <CheckCircle className="mr-2" size={18} /> Delivered
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Clock className="mr-2" size={18} /> {getTimeRemaining()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Timeline */}
          <div className="lg:w-2/3 p-6 md:p-8 border-r">
            <div className="relative">
              <div className="flex justify-between items-start mb-12 overflow-x-auto pb-4">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="relative flex flex-col items-center min-w-[120px]">
                    <div className={`mb-3 p-3 rounded-full ${
                      order.orderStatus === step.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : statusSteps.findIndex(s => s.id === order.orderStatus) > index 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {React.cloneElement(step.icon, {
                        className: `${order.orderStatus === step.id 
                          ? 'text-blue-600' 
                          : statusSteps.findIndex(s => s.id === order.orderStatus) > index 
                            ? 'text-green-600' 
                            : 'text-gray-400'}`
                      })}
                    </div>
                    <div className="text-center">
                      <p className={`font-medium ${
                        order.orderStatus === step.id 
                          ? 'text-gray-800' 
                          : statusSteps.findIndex(s => s.id === order.orderStatus) > index 
                            ? 'text-gray-700' 
                            : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`absolute top-5 left-3/4 w-1/2 h-1 ${
                        statusSteps.findIndex(s => s.id === order.orderStatus) > index 
                          ? 'bg-green-500' 
                          : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Status Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Delivery Progress</h2>
                {order.orderStatus === 'on-the-way' && (
                  <span className="text-blue-600 text-sm">Live tracking available</span>
                )}
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 h-48 flex items-center justify-center mb-4">
                {order.orderStatus === 'on-the-way' ? (
                  <div className="text-center">
                    <Bike className="mx-auto text-blue-500 mb-2" size={32} />
                    <p className="text-gray-700">Your order is on the way</p>
                  </div>
                ) : order.orderStatus === 'delivered' ? (
                  <div className="text-center">
                    <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                    <p className="text-gray-700">Your order has been delivered</p>
                    <p className="text-sm text-gray-500">Enjoy your meal!</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <CookingPot className="mx-auto text-orange-500 mb-2" size={32} />
                    <p className="text-gray-700">Restaurant is preparing your order</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="lg:w-1/3 p-6 md:p-8 bg-gray-50">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="space-y-3 mt-2">
                  {order.data?.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name || 'Unnamed Item'}
                      </span>
                      <span className="text-gray-800">₹{(item.price || 0) * (item.quantity || 1)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total ({totalItems} items)</span>
                    <span>₹{order.totalCost || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-start">
                  <MapPin className="text-red-500 mt-1 mr-3" size={20} />
                  <p className="text-gray-600">{order.address || 'Address not specified'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Details</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="text-gray-800">{order.name || 'Customer'}</p>
                    <p className="text-gray-600 text-sm">{order.email || 'No email provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;