import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axisoInstance";
import { toast } from "sonner";

export default function RestaurantAuth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For register
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/resturent/login" : "/resturent/register";
      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await axiosInstance.post(url, payload, {
        withCredentials: true,
      });

      console.log("Response:", response.data);
      if (response.data.success === true) {
        navigate("/restaurants/dashboard", {
          state: { user: response.data.data },
        });
      }
    } catch (error) {
      console.error("Auth Error:", error.response.data);
      toast(error.response.data.error ||error.response.data.msg )
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Restaurant Login" : "Restaurant Register"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Restaurant Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-blue-600 ml-2 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </form>
    </div>
  );
}
