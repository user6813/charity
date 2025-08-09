import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from "./routes.tsx"
import "./global.css"
import { UserProvider } from './context/UserContext.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
      <ToastContainer />
    </UserProvider>
  </StrictMode>
)