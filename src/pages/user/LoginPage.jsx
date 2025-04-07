import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axisoInstance';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post('/user/login', data,{withCredentials:true});
      console.log('Login successful:', res.data);
      
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Invalid credentials');
      console.log(err);
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 border rounded-md"
            {...register('email', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded-md"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
