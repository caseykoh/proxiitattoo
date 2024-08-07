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
