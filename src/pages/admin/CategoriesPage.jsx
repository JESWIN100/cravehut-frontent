import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { axiosInstance } from '../../config/axisoInstance';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get("/admin/getallCategory", { withCredentials: true });
        console.log("rs",response.data.categories);
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCategory();
  }, []);
  


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image[0]); // First file from file input

    try {
      const response = await axiosInstance.post('/admin/createCategory', formData,{withCredentials:true} ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
console.log(response);

      // Update categories state with response from backend
    //   setCategories([...categories, response.data]);
    //   reset();
    } catch (err) {
      console.error('Error uploading category:', err);
    }
  };

  return (
    <div className="lg:ml-64 p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Manage Categories</h1>

      {/* Add Category Form */}
      <div className="bg-white p-6 rounded shadow mb-8 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" encType="multipart/form-data">
          <div>
            <input
              type="text"
              placeholder="Category name"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <textarea
              placeholder="Category description"
              {...register('description', { required: 'Description is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: 'Image is required' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </form>
      </div>

      {/* Display Categories */}
      <div className="bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Category List</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories added yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-4 grid-cols-2">
            {categories.map((category, index) => (
              <div key={index} className="border  rounded p-4">
                <img
                  src={category.image} // Ensure backend sends the image URL
                  alt={category.name}
                  className="w-full h-40 object-contain rounded mb-3"
                />
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-gray-700 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
