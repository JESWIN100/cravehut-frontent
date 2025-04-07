import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axisoInstance';
const CartPage = () => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [cart, setCarts] = useState([]);
  
  const updateQuantity = async (index, delta) => {
    const updatedItem = { ...cart[index] };
    const newQty = updatedItem.quantity + delta;
  
    if (newQty < 1) return; // avoid quantity < 1
  console.log(updatedItem);
  
    try {
      const response = await axiosInstance.put(
        "/cart/update",
        {
          productId: updatedItem.foodId,
          quantity: newQty,
        },
        { withCredentials: true }
      );

  
      // If backend update succeeds, update state
      setCarts(prevCart => {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity = newQty;
        return updatedCart;
      });
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };
  

  useEffect(()=>{
    const fetchCart=async()=>{
      const response=await axiosInstance.get("/cart",{withCredentials:true})
      console.log(response.data.items)
      setCarts(response.data.items)
    }
    fetchCart()
  },[])
  


  

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen mt-6 bg-gray-50 p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart Summary</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white rounded-lg shadow p-4 w-full md:w-1/2">
          <h2 className="font-semibold text-lg mb-2">Name & Address</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Delivery Address"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <button className="w-full bg-green-500 text-white py-2 rounded font-medium hover:bg-green-600 transition">
            SAVE ADDRESS & PROCEED
          </button>
        </div>

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
                  <div className="text-gray-600">
                  
                    {item.price * item.quantity}
                  </div>
                  {/* Quantity controls */}
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
  );
};

export default CartPage;
