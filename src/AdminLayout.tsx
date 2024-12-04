import { Navigate } from "react-router-dom";
import { AdminNav } from "./components/AdminNav";
import DashboardPage from "./pages/DashboardPage";

export default function AdminLayout() {
  const token = localStorage.getItem("jwt"); // Retrieve token from localStorage

  // If no token, redirect to the login page
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <div>
        <div className="">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <AdminNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                {/* <UserNav /> */}
              </div>
            </div>
          </div>
          <DashboardPage />
        </div>
      </div>
    </>
  );
}
