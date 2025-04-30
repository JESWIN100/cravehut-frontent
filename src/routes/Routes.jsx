import { createBrowserRouter } from "react-router-dom";
import UserErrorPage from "../pages/user/UserErrorPage";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/user/HomePage";
import ResturentDetailPage from "../pages/user/ResturentDetailPage";
import CategoryDetailPage from "../pages/user/CategoryDetailPage";
import Cartpage from "../pages/user/Cartpage";
import LoginPage from "../pages/user/LoginPage";
import RestutrantLayout from "../layout/RestutrantLayout";
import ResturentHomePage from "../pages/resturent/ResturentHomePage";
import ResturantLogin from "../components/resturant/ResturantLogin";
import CreateRestaurant from "../pages/resturent/CreateRestaurant";
import { ResturantAuth } from "./protectedRoutes/ResturantAuth";
import AdminLayout from "../layout/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import Restaurants from "../pages/admin/Restaurants";
import Foods from "../pages/admin/Foods";
import Orders from "../pages/admin/Orders";
import Reviews from "../pages/admin/Reviews";
import AdminLogin from "../components/admin/AdminLogin";
import { AdminAuth } from "./protectedRoutes/AdminAuth";
import TermsAndCondition from "../pages/user/TermsAndCondition";
import AboutUs from "../pages/user/AboutPage";
import MyMenuPage from "../pages/resturent/MyMenuPage";
import AddDish from "../pages/resturent/AddDish";
import CategoriesPage from "../pages/admin/CategoriesPage";
import OrderTrackingPage from "../pages/user/OrderTrackingPage";
import PaymentSuccessPage from "../pages/user/PaymentSuccessPage";
import MyOrdersPage from "../pages/user/MyOdersPage";
import ResturantOrders from "../pages/resturent/ResturentOrders";
import EditMenuPage from "../pages/resturent/EditMenuPage";
import { UserAuth } from "./protectedRoutes/UserAuth";



export const router = createBrowserRouter([
  {
    path: "/",
    // element: <RootLayout />,
    errorElement: <UserErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },

      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "track-order/:id",
        element: <OrderTrackingPage />
      },
      {
        path: "success",
        element: <PaymentSuccessPage />
      },

    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <UserErrorPage />,
    children: [

      {
        path: "resturant/:id",
        element: <ResturentDetailPage />
      },
      {
        path: "category/:name",
        element: <CategoryDetailPage />
      },

     
      {
        path: "/terms",
        element: <TermsAndCondition />
      },
      {
        path: "/about",
        element: <AboutUs />
      },
     

    ],
  },
  {
    path: "/",
    element:<UserAuth><RootLayout /></UserAuth> ,
    errorElement: <UserErrorPage />,
    children: [

      {
        path: "cart",
        element: <Cartpage />
      },
     
      {
        path: "my-orders",
        element: < MyOrdersPage />
      },

    ],
  },


  {
    path: "/restaurants",
    element: <ResturantAuth><RestutrantLayout /></ResturantAuth>,
    // errorElement:<UserErrorPage/>,
    children: [

      {
        path: "dashboard",
        element: <ResturentHomePage />
      },

      {
        path: "my-menu",
        element: <MyMenuPage />
      },
      {
        path: "add-dish",
        element: <AddDish />
      },
      {
        path: "orders",
        element: <ResturantOrders />
      },
      {
        path: "editmenu/:id",
        element: <EditMenuPage />
      },
    ],
  },
  {
    path: "/owner",
    // element: <RestutrantLayout />,
    // errorElement:<UserErrorPage/>,
    children: [
      {
        path: "login",
        element: <ResturantLogin />
      },
      {
        path: "create-restaurant",
        element: <CreateRestaurant />
      },




    ],
  },
  {
    path: "/admin",
    element: <AdminAuth><AdminLayout /></AdminAuth>,
    // errorElement: <UserErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />
      },
      {
        path: "restaurants",
        element: <Restaurants />
      },
      {
        path: "foods",
        element: <Foods />
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "reviews",
        element: <Reviews />
      },
      {
        path: "categories",
        element: <CategoriesPage />
      },

    ]
  },
  {
    path: "/admin",
    // element: <AdminLayout />,
    // errorElement: <UserErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminLogin />
      }

    ]
  }

])