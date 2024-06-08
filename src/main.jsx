import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import Firebase_Provider from './Component/Firebase-provider/Firebase_Provider'
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <QueryClientProvider client={queryClient}>
    <Firebase_Provider>
      <React.StrictMode>
   <div className='max-w-[1440px] mx-auto'>
   <RouterProvider router={router} />
   </div>
  </React.StrictMode>
    </Firebase_Provider>
    </QueryClientProvider>
  
)
