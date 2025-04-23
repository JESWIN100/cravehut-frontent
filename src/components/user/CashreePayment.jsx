// import React, { useState, useEffect } from 'react';
// import { 
//   CheckCircle, 
//   Clock, 
//   MapPin, 
//   Phone, 
//   Utensils,
//   Bike,
//   CookingPot,
//   CircleCheck,
//   CircleDot,
//   Circle,
//   ChevronRight,
//   User
// } from 'lucide-react';

// const OrderTrackingPage = () => {
//   const [currentStatus, setCurrentStatus] = useState('preparing');
//   const [timeRemaining, setTimeRemaining] = useState('30-40 mins');

//   const orderDetails = {
//     orderId: '#SW12345678',
//     restaurant: 'Burger King',
//     contact: '+91 9876543210',
//     deliveryAddress: '123 Foodie Street, Bangalore, Karnataka - 560001',
//     items: [
//       { name: 'Whopper Meal', quantity: 1, price: 199 },
//       { name: 'Chicken Nuggets (6pc)', quantity: 1, price: 129 },
//       { name: 'Coke (500ml)', quantity: 2, price: 60 },
//     ],
//     total: 455,
//     deliveryPartner: {
//       name: 'Rahul K.',
//       rating: '4.8',
//       vehicle: 'Bike (KA-05-AB-1234)'
//     },
//     restaurantLocation: '1.2 km away'
//   };

//   const statusSteps = [
//     { id: 'placed', label: 'Order Placed', time: '12:30 PM', icon: <CircleCheck className="text-green-500" size={20} /> },
//     { id: 'preparing', label: 'Preparing your food', time: '12:35 PM', icon: <CookingPot className="text-orange-500" size={20} /> },
//     { id: 'on-the-way', label: 'On the way', time: '1:05 PM', icon: <Bike className="text-blue-500" size={20} /> },
//     { id: 'delivered', label: 'Delivered', time: '', icon: <CheckCircle className="text-green-500" size={20} /> },
//   ];

//   useEffect(() => {
//     // Simulate status changes
//     const timer = setTimeout(() => {
//       if (currentStatus === 'preparing') {
//         setCurrentStatus('on-the-way');
//         setTimeRemaining('15-20 mins');
//       } else if (currentStatus === 'on-the-way') {
//         setCurrentStatus('delivered');
//         setTimeRemaining('Delivered');
//       }
//     }, 10000);

//     return () => clearTimeout(timer);
//   }, [currentStatus]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-white p-6 border-b">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Track Your Order</h1>
//               <p className="text-gray-600">Order ID: {orderDetails.orderId}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className={`px-4 py-2 rounded-full ${currentStatus === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
//                 {currentStatus === 'delivered' ? (
//                   <span className="flex items-center">
//                     <CheckCircle className="mr-2" size={18} /> Delivered
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     <Clock className="mr-2" size={18} /> {timeRemaining}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row">
//           {/* Left Column - Timeline */}
//           <div className="lg:w-2/3 p-8 border-r">
//             <div className="relative">
//               {/* Horizontal timeline for landscape */}
//               <div className="flex justify-between items-start mb-12">
//                 {statusSteps.map((step, index) => (
//                   <div key={step.id} className="relative flex flex-col items-center" style={{ width: '22%' }}>
//                     <div className={`mb-3 p-3 rounded-full ${currentStatus === step.id ? 'bg-blue-100 text-blue-600' : 
//                       statusSteps.findIndex(s => s.id === currentStatus) > index ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
//                       {React.cloneElement(step.icon, {
//                         className: `${currentStatus === step.id ? 'text-blue-600' : 
//                           statusSteps.findIndex(s => s.id === currentStatus) > index ? 'text-green-600' : 'text-gray-400'}`
//                       })}
//                     </div>
//                     <div className="text-center">
//                       <p className={`font-medium ${currentStatus === step.id ? 'text-gray-800' : 
//                         statusSteps.findIndex(s => s.id === currentStatus) > index ? 'text-gray-700' : 'text-gray-500'}`}>
//                         {step.label}
//                       </p>
//                       {step.time && (
//                         <p className="text-sm text-gray-500">{step.time}</p>
//                       )}
//                     </div>
//                     {index < statusSteps.length - 1 && (
//                       <div className={`absolute top-5 left-3/4 w-1/2 h-1 ${statusSteps.findIndex(s => s.id === currentStatus) > index ? 'bg-green-500' : 'bg-gray-200'}`}></div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Map/Delivery Partner Section */}
//             <div className="bg-gray-50 rounded-xl p-6 mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Delivery Progress</h2>
//                 {currentStatus === 'on-the-way' && (
//                   <span className="text-blue-600 text-sm">Live tracking available</span>
//                 )}
//               </div>
              
//               <div className="bg-blue-50 rounded-lg p-4 h-48 flex items-center justify-center mb-4">
//                 {currentStatus === 'on-the-way' ? (
//                   <div className="text-center">
//                     <Bike className="mx-auto text-blue-500 mb-2" size={32} />
//                     <p className="text-gray-700">Your order is on the way</p>
//                     <p className="text-sm text-gray-500">{orderDetails.deliveryPartner.name} is delivering your food</p>
//                   </div>
//                 ) : currentStatus === 'delivered' ? (
//                   <div className="text-center">
//                     <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
//                     <p className="text-gray-700">Your order has been delivered</p>
//                     <p className="text-sm text-gray-500">Enjoy your meal!</p>
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <CookingPot className="mx-auto text-orange-500 mb-2" size={32} />
//                     <p className="text-gray-700">Restaurant is preparing your order</p>
//                     <p className="text-sm text-gray-500">{orderDetails.restaurant} is cooking your food</p>
//                   </div>
//                 )}
//               </div>

//               {currentStatus === 'on-the-way' && (
//                 <div className="flex items-center justify-between bg-white p-4 rounded-lg">
//                   <div className="flex items-center">
//                     <div className="bg-blue-100 p-2 rounded-full mr-3">
//                       <User className="text-blue-600" size={20} />
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">{orderDetails.deliveryPartner.name}</h3>
//                       <p className="text-gray-600 text-sm">{orderDetails.deliveryPartner.vehicle}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-gray-800 font-medium">{orderDetails.deliveryPartner.rating} ★</p>
//                     <button className="text-blue-600 text-sm font-medium">Contact</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Order Details */}
//           <div className="lg:w-1/3 p-8 bg-gray-50">
//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
//               <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center">
//                     <Utensils className="text-orange-500 mr-3" size={20} />
//                     <div>
//                       <h3 className="font-medium text-gray-800">{orderDetails.restaurant}</h3>
//                       <p className="text-gray-500 text-sm">{orderDetails.restaurantLocation}</p>
//                     </div>
//                   </div>
//                   <ChevronRight className="text-gray-400" size={20} />
//                 </div>
//                 <div className="space-y-3 mt-4">
//                   {orderDetails.items.map((item, index) => (
//                     <div key={index} className="flex justify-between">
//                       <span className="text-gray-600">
//                         {item.quantity}x {item.name}
//                       </span>
//                       <span className="text-gray-800">₹{item.price}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="border-t border-gray-200 mt-4 pt-4">
//                   <div className="flex justify-between font-semibold text-lg">
//                     <span>Total</span>
//                     <span>₹{orderDetails.total}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
//               <div className="bg-white rounded-lg shadow-sm p-4">
//                 <div className="flex items-start">
//                   <MapPin className="text-red-500 mt-1 mr-3" size={20} />
//                   <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm p-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h2>
//               <div className="flex items-center">
//                 <div className="bg-gray-100 p-3 rounded-full mr-3">
//                   <Phone className="text-gray-600" size={20} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-800">Contact Support</h3>
//                   <p className="text-gray-600 text-sm">{orderDetails.contact}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderTrackinage;