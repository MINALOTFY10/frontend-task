import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import ProtectedRoute from "./layout/protected-route";
import AppShell from "./layout/app-shell";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
    ],
  },

  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
