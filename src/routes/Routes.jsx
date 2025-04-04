import { createBrowserRouter } from "react-router-dom";
import UserErrorPage from "../pages/user/UserErrorPage";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/user/HomePage";
import ResturentDetailPage from "../pages/user/ResturentDetailPage";
import CategoryDetailPage from "../pages/user/CategoryDetailPage";
import Cartpage from "../pages/user/Cartpage";


export const router=createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement:<UserErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomePage />
                },
                {
                    path: "resturant/:id",
                    element: <ResturentDetailPage/>
                    },
                    {
                        path: "category/:id",
                        element: <CategoryDetailPage/>
                        },
                        {
                            path: "cart",
                            element: <Cartpage/>
                            },
                      
                  
               
            ],
},
])