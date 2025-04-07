import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axisoInstance";

export default function ResturantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin =async (e) => {
    e.preventDefault();
  try {
    const resposne=await axiosInstance.post("/resturent/login",
        {
            email: email,
            password: password
            },
            {withCredentials:true}
       )
       console.log(resposne.data.success=true);
       if(resposne.data.success=true){
        navigate("/restaurants/dashboard", { state: { user: resposne.data.data } });

       }
    
  } catch (error) {
    console.log(error);
    
  }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Restaurant Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
}
