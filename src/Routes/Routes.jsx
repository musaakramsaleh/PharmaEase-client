import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Login from "../Component/Login/Login";
import Register from "../Component/Login/Register/Register";
import Product from "../Product/Product";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

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
        element:<ShoppingCart></ShoppingCart>
      }
    ]
    },
  ]);
  
export default router;