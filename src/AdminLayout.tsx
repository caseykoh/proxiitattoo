import { Outlet } from "react-router-dom";
import { AdminNav } from "./components/AdminNav";

export default function AdminLayout() {
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
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
