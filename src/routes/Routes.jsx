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


export const router=createBrowserRouter([
    {
        path: "/",
        // element: <RootLayout />,
        errorElement:<UserErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage />
                },
                
                      
                  
               
            ],
},
{
    path: "/",
    element: <RootLayout />,
    errorElement:<UserErrorPage/>,
    children: [
        
            {
                path: "resturant/:id",
                element: <ResturentDetailPage/>
                },
                {
                    path: "category/:name",
                    element: <CategoryDetailPage/>
                    },
                    
                    {
                        path: "cart",
                        element: <Cartpage/>
                        },
                        {
                            path: "login",
                            element: <LoginPage/>
                            },
                  
              
           
        ],
},
{
    path: "/restaurants",
    element: <ResturantAuth><RestutrantLayout /></ResturantAuth>,
    // errorElement:<UserErrorPage/>,
    children: [
        {
            path: "login",
            element: <ResturantLogin />
            },
        {
            path: "dashboard",
            element: <ResturentHomePage />
            },
            {
                path:"create-restaurant",
                element:<CreateRestaurant/>
            }
                  
              
           
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
            }
        
                  
              
           
        ],
},
{
    path: "/admin",
    element: <AdminLayout />,
    // errorElement:<UserErrorPage/>,
    children: [
        
            {
                path: "dashboard",
                element: <DashboardPage/>
                }
                
              
           
        ],
},
])