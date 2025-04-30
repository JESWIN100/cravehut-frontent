import React, { useEffect } from 'react';
import { CheckCircle, Clock, MapPin, Phone, Utensils, Home } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {

const naviagte=useNavigate()
  const location = useLocation();
  const order = location.state?.order;

console.log(order);


  const orderDetails = {
    orderId: '#SW12345678',
    date: new Date(Date.now()).toLocaleString(),
    deliveryAddress: '123 Foodie Street, Bangalore, Karnataka - 560001',
    restaurant: 'Burger King',
    contact: '+91 9876543210',
    estimatedDelivery: '30-40 mins',
    items: [
      { name: 'Whopper Meal', quantity: 1, price: 199 },
      { name: 'Chicken Nuggets (6pc)', quantity: 1, price: 129 },
      { name: 'Coke (500ml)', quantity: 2, price: 60 },
    ],
    subtotal: 388,
    deliveryFee: 20,
    gst: 47,
    total: 455,
    paymentMethod: 'UPI (PhonePe)'
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      naviagte('/');
    }, 8000); // waits for 3 seconds before redirecting

  }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <CheckCircle className="text-6xl text-white mb-4 md:mb-0 md:mr-6" size={64} />
            <div>
              <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
              <p className="text-white mt-2 text-lg">Your order has been placed successfully</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Order Details */}
          <div className="lg:w-2/3 p-8 border-r">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Order ID: {order.orderId}</h2>
                <p className="text-gray-500">{orderDetails.date}</p>
              </div>
              <button className="px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium hover:bg-green-200 transition">
                Track Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Delivery Info */}
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="flex items-start mb-4">
                  <MapPin className="text-red-500 mt-1 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium text-gray-800 text-lg">Delivery Address</h3>
                    <p className="text-gray-600">{order.address}</p>
                  </div>
                </div>
                {/* <div className="flex items-start mb-4">
                  <Utensils className="text-orange-500 mt-1 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium text-gray-800 text-lg">Restaurant</h3>
                    <p className="text-gray-600">{order.restaurant}</p>
                  </div>
                </div> */}
                <div className="flex items-start">
                  <Clock className="text-blue-500 mt-1 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium text-gray-800 text-lg">Estimated Delivery</h3>
                    <p className="text-gray-600">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-medium text-gray-800 text-lg mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">₹{order.totalCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    {/* <span className="text-gray-800">₹{order.deliveryFee}</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST</span>
                    {/* <span className="text-gray-800">₹{order.gst}</span> */}
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-xl">
                      <span>Total</span>
                      <span>₹{order.totalCost}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 text-xl mb-4">Your Order</h3>
              <div className="bg-gray-50 rounded-xl p-5 shadow-md">
  {order.data.map((item, index) => (
    <div
      key={index}
      className="flex items-center justify-between gap-4 py-4 border-b border-gray-200 last:border-0"
    >
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md border"
        />
        <span className="text-gray-600 text-sm sm:text-base">
          {item.quantity}x {item.name}
        </span>
      </div>
      <span className="text-gray-800 font-semibold text-sm sm:text-base">
        ₹{item.price}
      </span>
    </div>
  ))}
</div>

            </div>
          </div>

          {/* Right Column - Payment & Support */}
          <div className="lg:w-1/3 p-8 bg-gray-50">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-gray-800 font-medium">Card(Razorpay)</p>
                <div className="mt-4 flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-green-600 text-sm">Payment successful</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h2>
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-3 rounded-full mr-3">
                    <Phone className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Contact Support</h3>
                    <p className="text-gray-600">{orderDetails.contact}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Our customer support team is available 24/7 to assist you with your order.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <Link to={'/'}>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                <Home className="mr-2" size={20} />
                Back to Home
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;