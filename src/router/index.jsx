import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import ClientLayout from "../layouts/ClientLayout";
import NotFound from "../pages/NotFound/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import User from "../pages/admin/User";
import ProductAdd from "../pages/admin/ProductAdd";
import ProductEdit from "../pages/admin/ProductEdit";
import ProductDetail from "./../pages/admin/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <Product /> },
      { path: "product/add", element: <ProductAdd /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "product/edit/:id", element: <ProductEdit /> },
      { path: "user", element: <User /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
