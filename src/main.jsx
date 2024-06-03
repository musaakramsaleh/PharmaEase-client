import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import Firebase_Provider from './Component/Firebase-provider/Firebase_Provider'


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Firebase_Provider>
      <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
    </Firebase_Provider>
  
)
