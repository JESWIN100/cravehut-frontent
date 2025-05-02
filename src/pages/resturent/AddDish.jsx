import {
  Button,
  DialogContent,
  MenuItem,
  FormControlLabel,
  Switch,
  TextField,
  Box,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axisoInstance';
import { toast } from 'sonner';

export default function AddDish() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [availability, setAvailability] = useState(true);
  const [profile, setProfile] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await axiosInstance.get("/resturent/getallbyid", { withCredentials: true });
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };
    getRestaurant();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('category', data.category);
      // formData.append('rating', data.rating);
      // formData.append('discount', data.discount || '');
      // formData.append('ingredients', data.ingredients);
      formData.append('restaurant', profile._id);
      formData.append('availability', availability);
      formData.append('image', imageFile);

      const res = await axiosInstance.post('/food/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

     console.log(res);
     
      toast.error(res.data.msg)
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error adding dish:', error);
      toast.error(error.response.data.msg[0] || error.response.data.error)
      // alert('Failed to add dish. Please try again.');
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get("/resturent/getallCategory", { withCredentials: true });
        const categoryNames = response.data.categories.map(category => category.name);
        console.log(categoryNames);
        setCategories(categoryNames);
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchCategory();
  }, []);

  return (
    <DialogContent className="lg:ml-64">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          p: 2
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: 900,
            p: 4,
            borderRadius: 4,
            boxShadow: `
              0 4px 20px 0 rgba(0, 0, 0, 0.1),
              inset 0 0 15px rgba(255, 255, 255, 0.5),
              inset 0 0 20px rgba(0, 0, 0, 0.05)
            `,
            background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '8px',
              // background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
            }
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                // background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                margin: '10px auto 0',
                borderRadius: '2px'
              }
            }}
          >
            Add New Dish
          </Typography>
          
          <form id="add-dish-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr' },
                  gap: 3
                }}
              >
                <TextField
                  label="Dish Name"
                  {...register('name', { required: 'Dish name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }
                  }}
                />
                <TextField
                  label="Price"
                  type="number"
                  {...register('price', { required: 'Price is required' })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }
                  }}
                />
              </Box>
              
              <TextField
                label="Description"
                multiline
                rows={3}
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                  }
                }}
              />
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr 1fr' },
                  gap: 3
                }}
              >
                <TextField
                  label="Category"
                  select
                  defaultValue=""
                  {...register('category', { required: 'Category is required' })}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                
                {/* <TextField
                  label="Rating"
                  type="number"
                  inputProps={{ step: '0.1', min: '0', max: '5' }}
                  {...register('rating', { required: 'Rating is required' })}
                  error={!!errors.rating}
                  helperText={errors.rating?.message}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }
                  }}
                /> */}
                
                {/* <TextField
                  label="Any Discount?"
                  {...register('discount')}
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }
                  }}
                /> */}
              </Box>
              
              {/* <TextField
                label="Ingredients"
                {...register('ingredients', { required: 'Ingredients are required' })}
                error={!!errors.ingredients}
                helperText={errors.ingredients?.message}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                  }
                }}
              /> */}
              
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={availability}
                      onChange={() => setAvailability(!availability)}
                      color="primary"
                    />
                  }
                  label="Available"
                  sx={{ ml: 0 }}
                />
                
                <Button 
                  variant="outlined" 
                  component="label" 
                  sx={{
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px'
                    }
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Button>
              </Box>
              
              {imagePreview && (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'cover',
                    borderRadius: 3,
                    mt: 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                />
              )}
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                size="small"
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                 
                }}
              >
                Add Dish
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </DialogContent>
  );
}