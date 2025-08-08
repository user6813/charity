import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from "./routes.tsx"
import "./global.css"
import { UserProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  </StrictMode>
)