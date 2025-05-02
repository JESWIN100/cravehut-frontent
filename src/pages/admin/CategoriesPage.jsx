import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axisoInstance';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get('/admin/getallCategory', { withCredentials: true });
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image[0]) formData.append('image', data.image[0]);

    try {
      if (isEditing && editCategoryId) {
        // Edit category
      const res=  await axiosInstance.put(`/admin/update-category/${editCategoryId}`, formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(res);
        toast.success(res.data.msg);
      } else {
        // Create category
      const response=  await axiosInstance.post('/admin/createCategory', formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response);
        
        toast.success(response.data.message);
      }

      reset();
      setIsEditing(false);
      setEditCategoryId(null);
      fetchCategory();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditCategoryId(category._id);
    setValue('name', category.name);
    setValue('description', category.description);
    // Image field can't be set programmatically
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    
    if (!confirmDelete) return;
  
    try {
      await axiosInstance.delete(`/admin/delete-Category/${id}`, { withCredentials: true });
     toast.success("Category deleted successfully");
      fetchCategory();
      
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  return (
    <div className="lg:ml-64 p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Manage Categories</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-8 max-w-md">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Category name"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

          <textarea
            placeholder="Category description"
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}

          <input
            type="file"
            accept="image/*"
            {...register('image')}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {isEditing ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Display Categories */}
      <div className="bg-white p-6 rounded shadow ">
        <h2 className="text-xl font-semibold mb-4">Category List</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories added yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-4 grid-cols-2">
            {categories.map((category) => (
              <div key={category._id} className="border rounded p-4 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-contain rounded mb-3"
                />
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-gray-700 text-sm mb-2">{category.description}</p>

                <div className="flex justify-between mt-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
