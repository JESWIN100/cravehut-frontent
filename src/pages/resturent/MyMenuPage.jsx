import {
    Box,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    InputAdornment,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    IconButton,
    Pagination,
  } from '@mui/material';

  import { Add, Search as SearchIcon, MoreVert, Star } from '@mui/icons-material';
  import React, { useEffect, useState } from 'react';
  import { axiosInstance } from '../../config/axisoInstance';
  
  export default function MyMenuPage() {
    const [profile, setProfile] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [filteredFoods, setFilteredFoods] = useState([]);
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
  
    useEffect(() => {
      const getDishes = async () => {
        if (!profile?._id) return;
        try {
          const response = await axiosInstance.get(`/resturent/getresturantfood/${profile._id}`, {
            withCredentials: true,
          });
          setDishes(response.data.foods);
        } catch (error) {
          console.error("Error fetching dishes:", error);
        }
      };
      getDishes();
    }, [profile]);
  
    useEffect(() => {
      let filtered = dishes;
  
      if (searchQuery.trim()) {
        filtered = filtered.filter(food =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      if (categoryFilter !== 'all') {
        filtered = filtered.filter(food => food.category === categoryFilter);
      }
  
      setFilteredFoods(filtered);
  
      const uniqueCategories = [...new Set(dishes.map(food => food.category))];
      setCategories(uniqueCategories);
    }, [dishes, searchQuery, categoryFilter]);
  
    return (
      <Box sx={{ ml: { lg: '280px' }, p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}>
        {/* Header */}
        <Box display="flex" flexDirection={{ xs: 'row', md: 'row' }} justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">Food Menu Management</Typography>
          <Button  variant="contained" sx={{ mt: { xs: 2, md: 0 } }}>
            Add Food 
          </Button>
        </Box>
  
        {/* Filters */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={3}>
          <TextField
            placeholder="Search food items..."
            // fullWidth
            size='small'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            // fullWidth
            size='small'
            displayEmpty
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </Box>
  
        {/* Table */}
        {filteredFoods.length > 0 ? (
          <Box sx={{ overflowX: 'auto', bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFoods.map((food) => (
                  <TableRow key={food._id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar src={food.image} variant="rounded" sx={{ width: 40, height: 40, mr: 2 }} />
                        <Typography>{food.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{profile.name}</TableCell>
                    <TableCell>
                      <Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 600, bgcolor: 'blue.100', color: 'blue.800', px: 1, py: 0.5, borderRadius: 1 }}>
                        {food.category}
                      </Box>
                    </TableCell>
                    <TableCell>₹{food.price}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Star fontSize="small" sx={{ color: '#f59e0b', mr: 0.5 }} />
                        {food.rating}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" color="text.secondary" mb={1}>No food items found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters.
            </Typography>
          </Box>
        )}
  
        {/* Pagination Placeholder */}
        {filteredFoods.length > 0 && (
          <Box mt={4} display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Showing <strong>1</strong> to <strong>{filteredFoods.length}</strong> of <strong>{filteredFoods.length}</strong> food items
            </Typography>
            <Pagination count={1} color="primary" />
          </Box>
        )}
      </Box>
    );
  }
  