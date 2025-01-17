import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Gallery from "./pages/Gallery.tsx";
import Info from "./pages/Info.tsx";
import Booking from "./pages/Booking.tsx";
import FlashPage from "./pages/FlashPage.tsx";
import ConfirmationPage from "./pages/ConfirmationPage.tsx";
import AdminLayout from "./AdminLayout.tsx";
import ProtectedRoute from "./ProtectedAdminRoutes.tsx";
import AdminLoginPage from "./pages/AdminLogin.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import AdminFlashPage from "./pages/AdminFlashPage.tsx";
import axios from "axios";

axios.defaults.headers["x-api-key"] = import.meta.env.VITE_REACT_APP_API_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/flash",
        element: <FlashPage />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminWrapper />, // Handles layout for admin routes
    children: [
      { path: "/admin", element: <AdminLoginPage /> }, // Login page
      {
        path: "/admin/dashboard",
        element: <ProtectedRoute element={<AdminLayout />} />, // Dashboard layout with nested routes
        children: [
          { path: "", element: <DashboardPage /> }, // Dashboard overview
          { path: "flash", element: <AdminFlashPage /> }, // Flash management
          // { path: "bookings", element: <AdminAppointments /> }, // Appointment management
        ],
      },
    ],
  },
]);

function NavbarWrapper() {
  return (
    <div>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </div>
  );
}

function AdminWrapper() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AdminWrapper;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Navbar /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
