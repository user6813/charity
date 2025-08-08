import { createBrowserRouter, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout/Layout";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth/>
  },
  {
    path: '/',
    element: ( <Layout children={<Outlet/>} /> ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard/>
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
])

export default routes