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
import Invoice from "../ShoppingCart/Invoice";
import Sales from "../Dashboard/Sales";
import Adminhome from "../Dashboard/Adminhome";
import PaymentHistory from "../Dashboard/PaymentHistory";
import Sellerdashboard from "../Dashboard/Sellerdashboard";
import UserPayment from "../Dashboard/UserPayment";
import ManageCategory from "../Dashboard/ManageCategory";
import Bannermanage from "../Dashboard/Bannermanage";
import Adminbanner from "../Dashboard/Adminbanner";
import Detailedsell from "../Dashboard/Detailedsell";

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
    },
    {
      path:'/invoice',
      element:<Privateroute><Invoice></Invoice></Privateroute>
    }
    ]
    },
    {
     path:'dashboard',
     element:<Privateroute><Dashboard></Dashboard></Privateroute>,
     children:[
      {
       path:'admin',
       element:<Privateroute><Adminhome></Adminhome></Privateroute>
      },
      {
        path:'seller',
        element:<Privateroute><Seller></Seller></Privateroute>
      },
      {
        path:'user',
        element: <Privateroute><User></User></Privateroute>
      },
      {
        path:'detailedsell',
        element: <Privateroute><Detailedsell></Detailedsell></Privateroute>
      },
      {
        path:'sales',
        element:<Privateroute><Sales></Sales></Privateroute>
      },
      {
        path:'payment',
        element:<Privateroute><PaymentHistory></PaymentHistory></Privateroute>
      },
      {
        path:'sellerdashboard',
        element:<Privateroute><Sellerdashboard></Sellerdashboard></Privateroute>
      },
      {
        path:'userpayment',
        element:<Privateroute><UserPayment></UserPayment></Privateroute>
      },
      {
        path:'manage',
        element:<Privateroute><ManageCategory></ManageCategory></Privateroute>
      },
      {
        path:'bannermanage',
        element:<Privateroute><Bannermanage></Bannermanage></Privateroute>
      },
      {
        path:'adminbanner',
        element:<Privateroute><Adminbanner></Adminbanner></Privateroute>
      }
     ]
    },
  ]);
  
export default router;