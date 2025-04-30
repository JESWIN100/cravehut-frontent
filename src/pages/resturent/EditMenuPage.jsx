import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axisoInstance';

export default function EditFoodPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    category: '',
    // rating: '',
    description: '',
    // ingredients: '',
    // discount: '',
    // availability: true,
    restaurant: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const res = await axiosInstance.get(`/resturent/food-getbyid/${id}`, { withCredentials: true });

        setFoodData({
          name: res.data.foods.name,
          price: res.data.foods.price,
          category: res.data.foods.category,
          description: res.data.foods.description || '',
          // rating: res.data.foods.rating,
          // ingredients: res.data.foods.ingredients || '',
          // discount: res.data.foods.discount || '',
          availability: res.data.foods.availability !== false,
          restaurant: res.data.foods.restaurant
        });
        setPreviewImage(res.data.foods.image);
      } catch (err) {
        console.error('Error fetching food details:', err);
        setError('Failed to load food details');
      }
    };


    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/resturent/getallcategory", { withCredentials: true });
        setCategories(response.data.categories);
        console.log(response.data.categories);

      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };

    fetchFoodDetails();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData(prev => ({
      ...prev,
      [name]: name === 'availability' ? e.target.checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('name', foodData.name);
      formData.append('price', foodData.price);
      formData.append('category', foodData.category);
      // formData.append('rating', foodData.rating);
      formData.append('description', foodData.description);
      // formData.append('ingredients', foodData.ingredients);
      // formData.append('discount', foodData.discount);
      formData.append('availability', foodData.availability);
      formData.append('restaurant', foodData.restaurant);
      console.log('📦 FormData contents:');

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const { data } = await axiosInstance.put(`/resturent/edit-food/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Food item updated successfully');
      

      setTimeout(() => navigate('/restaurants/my-menu'), 1500);
    } catch (err) {
      console.error('Error updating food item:', err);
      setError(err.response?.data?.msg || 'Failed to update food item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ ml: { lg: '280px' }, p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Edit Food Item</Typography>

      <Box display="flex" flexDirection="column" gap={2} maxWidth={500}>
        <TextField
          label="Food Name"
          name="name"
          value={foodData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          value={foodData.price}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            name="category"
            value={foodData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>



        <TextField
          label="Description"
          name="description"
          value={foodData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />





        <Box display="flex" alignItems="center">
          <input
            type="checkbox"
            name="availability"
            checked={foodData.availability}
            onChange={handleChange}
            id="availability-checkbox"
          />
          <label htmlFor="availability-checkbox" style={{ marginLeft: '8px' }}>
            Available
          </label>
        </Box>

        {/* Image Upload */}
        <Box mt={2}>
          <InputLabel>Food Image</InputLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '8px' }}
          />
          {previewImage && (
            <Box mt={1}>
              <img
                src={previewImage}
                alt="preview"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: 8
                }}
              />
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Updating...' : 'Update Food'}
        </Button>
      </Box>

      {/* Feedback messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Box>
  );
}