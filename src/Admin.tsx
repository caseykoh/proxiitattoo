import DashboardPage from "./pages/DashboardPage";
import { AdminNav } from "./components/AdminNav";

function Admin() {
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

export default Admin;
