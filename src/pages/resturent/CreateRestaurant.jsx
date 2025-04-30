import React, { useState } from "react";
import { axiosInstance } from "../../config/axisoInstance";
import { useNavigate } from "react-router-dom";

const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    cuisineType: "",
    ratings: 0,

    deliveryAvailable: true,
    category: "",
    offers: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "open" || name === "close") {
      setFormData((prev) => ({
        ...prev,
      
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMenuItemChange = (index, value) => {
    const updatedMenuItems = [...formData.menuItems];
    updatedMenuItems[index] = value;
    setFormData((prev) => ({ ...prev, menuItems: updatedMenuItems }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "menuItems") {
        value.forEach((item, index) => {
          form.append(`menuItems[${index}]`, item);
        });
      }  else {
        form.append(key, value);
      }
    });

    if (image) {
      form.append("image", image);
    }

    try {
      const res = await axiosInstance.post("/resturent/create", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.msg);
      navigate("/restaurants/dashboard")
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error creating restaurant.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      {/* Wider container (max-w-4xl) with reduced height */}
      <div className="w-full max-w-4xl bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        {/* Header with accent bar */}
        <div className="bg-amber-600 px-6 py-4 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-white sm:text-3xl">Fill out the details to create your restaurant page</h2>
  <p className="text-white text-sm sm:text-base mt-2">Please provide all necessary information to set up your restaurant profile.</p>
</div>

    
        <form onSubmit={handleSubmit} className="p-6">
          {/* Grid with 3 columns for wider screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="name"
                  placeholder="Restaurant Name"
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="address"
                  placeholder="Full Address"
                  onChange={handleChange}
                  required
                />
              </div>
    
            
            </div>
    
            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type*</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="cuisineType"
                  placeholder="Italian, Indian, etc."
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact*</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="contactNumber"
                  placeholder="+1 234 567 890"
                  onChange={handleChange}
                  required
                />
              </div>
    
            </div>
    
            {/* Column 3 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="category"
                  placeholder="Fine Dining, Cafe, etc."
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ratings</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="ratings"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                  onChange={handleChange}
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offers</label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
                  name="offers"
                  placeholder="Happy Hour, 10% Off"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
    
          {/* Full-width elements below the 3 columns */}
          <div className="mt-4 space-y-4">
            {/* Menu Items (single row scroll if many) */}
          
    
            {/* Delivery + File Upload in one row */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="deliveryAvailable"
                  name="deliveryAvailable"
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <label htmlFor="deliveryAvailable" className="ml-2 text-sm text-gray-700">
                  Delivery Available
                </label>
              </div>
    
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Image</label>
                <label className="inline-flex items-center px-3 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:border-amber-400">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Upload Image</span>
                  <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>
    
          {/* Submit button centered */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-amber-600 text-white px-8 py-2 rounded-md font-medium hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Create Restaurant
            </button>
          </div>
    
          {message && (
            <div className={`mt-4 p-2 rounded-md text-center text-sm ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
