import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLogin";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token in localStorage/cookies
    const token = localStorage.getItem("jwt");
    if (token) {
      // Verify token by hitting backend (optional)
      navigate("/admin/dashboard");
    }
  }, []);

  return <AdminLoginPage />;

  // return (
  //   <>
  //     <div>
  //       <div className="">
  //         <div className="border-b">
  //           <div className="flex h-16 items-center px-4">
  //             <AdminNav className="mx-6" />
  //             <div className="ml-auto flex items-center space-x-4">
  //               {/* <UserNav /> */}
  //             </div>
  //           </div>
  //         </div>
  //         <DashboardPage />
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Admin;
