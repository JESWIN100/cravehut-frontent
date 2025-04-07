import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Avatar,
  Grid,
  CardMedia,
  Dialog,
  DialogActions, DialogContent, DialogTitle,

} from "@mui/material";
import { axiosInstance } from "../../config/axisoInstance";
import { useForm } from "react-hook-form";
import { Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom";





export default function RestaurantOwnerDashboard() {
  const [tab, setTab] = React.useState(0);
const [profile,setProfile]=useState([])
const [dishes, setDishes] = useState([]);
const [imagePreview, setImagePreview] = useState("");
const [open, setOpen] = useState(false);
const { register, handleSubmit, formState: { errors }, reset } = useForm();
const location = useLocation();
const user = location.state?.user;

console.log("user",user);





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
    if (!profile?._id) return; // wait until profile is set

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

  
const [imageFile, setImageFile] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file); // store file for upload
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result); // just for preview
    reader.readAsDataURL(file);
  }
};

const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("rating", data.rating);
    formData.append("discount", data.discount);
    formData.append("ingredients", data.ingredients);
    formData.append("restaurant", profile._id);
    formData.append("availability", true);
    formData.append("image", imageFile);

    const res = await axiosInstance.post("/food/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    alert("Dish added!");
    setDishes([...dishes, res.data.food]); // update UI
    setOpen(false);
    reset();
    setImagePreview(null);
    setImageFile(null);
  } catch (error) {
    console.error("Error adding dish:", error);
    alert("Failed to add dish. Please try again.");
  }
};
const [showNotifications, setShowNotifications] = useState(false);
const [showProfile, setShowProfile] = useState(false);

const notifications = []; // Add some notifications here to test



  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <header className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mx-4 relative">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="flex items-center gap-4 relative">
        {/* Notification Bell */}
        <div className="relative">
          <Bell
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black"
          />
          {showNotifications && (
            <div className="absolute right-0 mt-2  w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
              <h2 className="font-semibold mb-2">Notifications</h2>
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No new notifications.</p>
              ) : (
                <ul className="text-sm text-gray-700">
                  {notifications.map((note, index) => (
                    <li key={index} className="border-b last:border-b-0 py-2">
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* User Profile Image */}
        <div className="relative">
          <img
            src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LnBuZw.png"
            alt="User Avatar"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-3">
                <button className="text-sm text-red-600 hover:underline">
                Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
    
        </div>
      </div>
    </header>
      {/* <Typography variant="h4" fontWeight="bold" mb={4}>
        MyKitchen Partner Dashboard
      </Typography> */}

      <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Overview" />
        <Tab label="Manage Menu" />
        <Tab label="Orders" />
        <Tab label="Profile" />
        <Tab label="Earnings" />
        <Tab label="Reviews" />
        <Tab label="Promotions" />
        <Tab label="Support" />
      </Tabs>

      {/* Overview */}
      {tab === 0 && (
          <Box mt={3}>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Card sx={{ flex: 1 }}><CardContent>Today's Orders: 45</CardContent></Card>
            <Card sx={{ flex: 1 }}><CardContent>Total Sales: $1,230</CardContent></Card>
            <Card sx={{ flex: 1 }}><CardContent>Pending Orders: 8</CardContent></Card>
          </Box>
          <Box mt={4}>
            <FormControlLabel control={<Switch defaultChecked />} label="Restaurant Status" />
          </Box>
        </Box>
     
      )}

      {/* Menu */}
      {tab === 1 && (
      <Box p={3}>
      {/* Add Dish Button */}
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Dish
      </Button>

      {/* Dialog for Adding Dish */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Dish</DialogTitle>
        <DialogContent>
          <form id="add-dish-form" onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Dish Name"
                {...register("name", { required: "Dish name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Price"
                type="number"
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
              <TextField
                label="Description"
                multiline
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
                <TextField
                label="Category"
                multiline
                rows={1}
                {...register("category", {
                  required: "Category is required",
                })}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
               <TextField
                label="Rating"
                multiline
                rows={1}
                {...register("rating", {
                  required: "Rating is required",
                })}
                error={!!errors.rating}
                helperText={errors.rating?.message}
              />
               <TextField
                label="Any Discount?"
                multiline
                rows={1}
                {...register("discount")}
                error={!!errors.discount}
                helperText={errors.discount?.message}
              />
              <TextField
                label="Ingredients?"
                multiline
                rows={1}
                {...register("ingredients", {
                  required: "Ingredients is required",
                })}
                error={!!errors.ingredients}
                helperText={errors.ingredients?.message}
              />
              <Box mt={4}>
            <FormControlLabel control={<Switch defaultChecked />} label="Avability" />
          </Box>
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Button>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                />
              )}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" form="add-dish-form" variant="contained">Add Dish</Button>
        </DialogActions>
      </Dialog>

      {/* Dish Cards */}
      <Grid container spacing={3} mt={3} >
        {dishes.length===0?(
             <Grid item xs={12} style={{ textAlign: 'center', marginTop: '2rem' }}>
             <img
               src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6643.jpg" // Replace this with your image path
               alt="No items"
               style={{ width: '200px', marginBottom: '1rem' }}
             />
             <Typography variant="h6" color="text.secondary">
               Oops, no items in here. Please add something!
             </Typography>
           </Grid>
        ):(
        dishes.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 950 }}> 
              {item.image && (
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ height: 100, width: 100, objectFit: 'cover', borderRadius: 2 }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{item.price}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )))}
      </Grid>
    </Box>
      )}

      {/* Orders */}
      {tab === 2 && (
        <Card sx={{ p: 3, mt: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>#1234</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Preparing</TableCell>
                  <TableCell><Button variant="outlined" size="small">Update</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Profile */}
      {tab === 3 && (
        <Card sx={{ p: 3, mt: 3 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5" fontWeight="bold">
            {profile.name}
          </Typography>
  
          {profile.image && (
            <Avatar
              src={profile.image}
              alt={profile.name}
              sx={{ width: 100, height: 100, borderRadius: 2 }}
            />
          )}
  
          <Typography variant="body1"><strong>Location:</strong> {profile.address}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {profile.contactNumber}</Typography>
          <Typography variant="body1"><strong>Cuisine:</strong> {profile.cuisineType}</Typography>
          <Typography variant="body1"><strong>Ratings:</strong> {profile.ratings}</Typography>
          <Typography variant="body1">
  <strong>Operating Hours:</strong> {profile.operatingHours?.open} - {profile.operatingHours?.close}
</Typography>

          <Typography variant="body1"><strong>Category:</strong> {profile.category}</Typography>
          <Typography variant="body1"><strong>Offers:</strong> {profile.offers}</Typography>
  
          {profile.menuItems && profile.menuItems.length > 0 && (
            <>
              <Typography variant="body1" fontWeight="bold">Menu Items:</Typography>
              <ul>
                {profile.menuItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </Box>
      </Card>
      )}

      {/* Earnings */}
      {tab === 4 && (
        <Card sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" mb={2}>Monthly Earnings Report</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Income</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>April 5</TableCell>
                  <TableCell>23</TableCell>
                  <TableCell>$456</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Reviews */}
      {tab === 5 && (
        <Card sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6">Customer Feedback</Typography>
          <Box mt={2} p={2} bgcolor="#fff" borderRadius={2} boxShadow={1}>
            <Typography fontWeight="bold">Jane Smith</Typography>
            <Typography>Delicious food! Highly recommend!</Typography>
            <Button variant="outlined" size="small" sx={{ mt: 1 }}>Reply</Button>
          </Box>
        </Card>
      )}

      {/* Promotions */}
      {tab === 6 && (
        <Card sx={{ p: 3, mt: 3 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Promo Code" />
            <TextField label="Discount (%)" type="number" />
            <Button variant="contained">Create Offer</Button>
          </Box>
        </Card>
      )}

      {/* Support */}
      {tab === 7 && (
        <Card sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6">Need Help?</Typography>
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <TextField label="Describe your issue" multiline rows={4} />
            <Button variant="contained">Send Request</Button>
          </Box>
        </Card>
      )}
    </Box>
  );
}
