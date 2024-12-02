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
import Admin from "./Admin.tsx";
import FlashPage from "./pages/FlashPage.tsx";
import ConfirmationPage from "./pages/ConfirmationPage.tsx";
import axios from "axios";
import DashboardPage from "./pages/DashboardPage.tsx";

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
    element: <Admin />,
  },
  {
    path: "/admin/dashboard",
    element: <DashboardPage />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Navbar /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
