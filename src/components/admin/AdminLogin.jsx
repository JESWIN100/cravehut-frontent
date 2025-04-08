import { useState } from "react";
import { axiosInstance } from "../../config/axisoInstance";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate=useNavigate()
const handleLogin =async (e) => {
  e.preventDefault();
  try {
    const response=await axiosInstance.post("/admin/login", {
      email,
      password,

    },
    {withCredentials:true}
  )
  console.log(response.data);
    if(response.data.success=true){
      navigate("/admin/dashboard")
      
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message)
    
  }

}
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800"> Admin</h1>
            <p className="text-gray-600 mt-2">Sign in to your admin account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="admin@example.com"
       onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="••••••••"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }