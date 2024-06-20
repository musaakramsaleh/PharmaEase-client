import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Login from "../Component/Login/Login";
import Register from "../Component/Login/Register/Register";
import Product from "../Product/Product";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Payment from "../ShoppingCart/Payment";
import Privateroute from "../PrivateRoute/Privateroute";
import Seller from "../Dashboard/Seller";
import Dashboard from "../Dashboard/Dashboard";
import User from "../Dashboard/User";
import CategoryDetails from "../Home/CategoryDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
           path:'/',
           element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/product',
        element:<Product></Product>
      },
      {
        path:'/shopping',
        element:<Privateroute><ShoppingCart></ShoppingCart></Privateroute>
      },
      {
        path:'payment',
        element:<Privateroute><Payment></Payment></Privateroute>
      },
      {
        path:'/categories/:category',
        element:<CategoryDetails></CategoryDetails>,
    }
    ]
    },
    {
     path:'dashboard',
     element:<Dashboard></Dashboard>,
     children:[
      {
        path:'seller',
        element:<Seller></Seller>
      },
      {
        path:'hello',
        element: <p>Hello World</p>
      },
      {
        path:'user',
        element: <User></User>
      }
     ]
    },
  ]);
  
export default router;