import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Gallery from "./pages/Gallery.tsx";
import Info from "./pages/Info.tsx";
import Booking from "./pages/Booking.tsx";

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
        path: "/booking",
        element: <Booking />,
      },
    ],
  },
]);

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     // errorElement: <ErrorPage />,
//   },
//   {
//     path: "/info",
//     element: <Info />,
//   },
//   {
//     path: "/gallery",
//     element: <Gallery />,
//   },
//   {
//     path: "/booking",
//     element: <Booking />,
//     // children: [
//     //   {
//     //     path: "name",
//     //     element: <NamePrompt />,
//     //   },
//     // ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Navbar /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
