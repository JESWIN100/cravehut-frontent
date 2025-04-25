import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axisoInstance';
import image from '../../assets/empty-cart.png'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [cart, setCarts] = useState([]);
  const [cartId, setCartId] = useState('');
  const [details, setDetails] = useState([]);
  setDetails
  const navigate=useNavigate()

  const updateQuantity = async (index, delta) => {
    const updatedItem = { ...cart[index] };
    const newQty = updatedItem.quantity + delta;
  
    if (newQty < 1) return;
  
    try {
      const responsePromise = axiosInstance.put(
        "/cart/update",
        {
          productId: updatedItem.productId,
          quantity: newQty,
        },
        { withCredentials: true }
      );
  
      await toast.promise(responsePromise, {
        loading: 'Updating cart...',
        success: (res) => {
          const productName = res?.data?.productName || "Item";
          return {
            message: `${productName} updated successfully`,
            description: `Quantity changed to ${newQty}`,
          };
        },
        error: (err) => {
          return {
            message: 'Failed to update cart',
            description: err.response?.data?.message || "Something went wrong",
          };
        },
      });
  
      // Update local cart state after success
      setCarts(prevCart => {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity = newQty;
        return updatedCart;
      });
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };
  
  const removeItem = async (index) => {
    const itemToRemove = cart[index];
    console.log("ds",itemToRemove);
    
    try {
    
      const response = await axiosInstance.delete(`/cart/remove`, {
        params: { productId: itemToRemove.productId },
        withCredentials: true
      });
      await toast.promise(response, {
        loading: 'Deleting cart...',
        success: (res) => {
          const productName = res?.data?.productName || "Item";
         
            localStorage.removeItem("cartRestaurantId");

          
          
          return {
            message: `${productName} Deleted successfully`,
            description: `Item has been deleted from your cart.`,
          };
        },
        error: (err) => {
          return {
            message: 'Failed to update cart',
            description: err.response?.data?.message || "Something went wrong",
          };
        },
      });
  
      setCarts(prevCart => prevCart.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };
  

  useEffect(()=>{
    const fetchCart=async()=>{
      const response=await axiosInstance.get("/cart",{withCredentials:true})
   console.log("res",response.data);
   
      setCarts(response.data.items)
      setCartId(response.data._id)
      setDetails(response.data)
    }
    fetchCart()
  },[])
  



  

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


  const formData = {
    name: name,
    phone: '9876543210',
    email: 'test@example.com'
  };

  const totalDue = totalPrice;
  // const cartId = "67f119b215000dc3d4d0a141";

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axiosInstance.post('/payment/create-order', {
        amount: totalDue,
        cartId,
        name:name,
        address:address,
        data:cart,
        resturentId:details.restaurantId,
        resturentName:details.restaurant,
        resturentImage:details.restaurantImage


      }, {
        withCredentials: true
      });

      const paymentOrder = data.order;

      if (!window.Razorpay) {
        console.error('Razorpay SDK not loaded');
        return;
      }

      const options = {
        key: 'rzp_test_pEZkADDtQIAgoQ',
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: formData.name,
        description: "Order Payment",
        order_id: paymentOrder.id,
        handler: async function (response) {
          console.log('Payment successful', response);

          const res =  await axiosInstance.post('/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          },{withCredentials:true});

          toast.success("Payment successful!");
          console.log("res",response);
          localStorage.removeItem("cartResturentId");
          navigate('/success', { state: { order: res.data.order } });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          cart_summary: JSON.stringify(
            cart.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            }))
          ),
          delivery_address: address,
        },
        
        
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert("Payment failed.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      toast.promise(
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                // Use a geocoding service to get the address
                const response = await axiosInstance.get(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                console.log('Geocoding response:', response.data);
                const address = response.data.display_name;
                setAddress(address);
                resolve(address);
              } catch (error) {
                reject(error);
              }
            },
            (error) => {
              reject(error);
            }
          );
        }),
        {
          loading: 'Fetching your location...',
          success: (address) => `Location found: ${address}`,
          error: (err) => `Could not get location (${err.message})`,
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src={image}
            alt="No Data"
            className="w-40 h-40 mb-6 opacity-80"
          />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Oops! Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven’t added anything yet. Start exploring and add some delicious food!</p>
         
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto mt-6">
          <h1 className="text-2xl font-bold mb-6">Cart Summary</h1>
  
          <div className="flex flex-col md:flex-row gap-4">
            {/* Name & Address Section */}
            <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/2">
              <h2 className="font-semibold text-lg mb-2">Name & Address</h2>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded mb-2 "
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full p-2 border border-gray-300 rounded mb-4 "
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <button onClick={handlePayment} className="w-full bg-green-500 text-white py-2 rounded font-medium hover:bg-green-600 transition">
                SAVE ADDRESS & PROCEED
              </button>
              <button 
  type="button"
  onClick={getLocation}
  className="w-full mb-4 mt-5 bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
  Click here to get your correct location
</button>
            </div>
  
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-600">₹{item.price * item.quantity}</div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
  
              <div className="flex gap-1 font-bold text-lg mb-4">
                <span>Total Price</span>
                <span>₹{totalPrice}</span>
              </div>
  
              <input
                type="text"
                placeholder="Apply Coupon"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
              />
            </div>
          </div>
  
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 text-sm text-gray-700 rounded">
            <p className="mb-2">✅ Review your order and address details before proceeding.</p>
            <p className="mb-2">⏱️ Cancel within 60 seconds for a full refund. No refund after that.</p>
            <p>🍲 Avoid cancellations to help reduce food waste.</p>
          </div>
         
        </div>
      )}
    </div>
  );
  
};

export default CartPage;
