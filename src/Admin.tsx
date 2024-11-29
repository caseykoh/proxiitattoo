import axios from "axios";
import { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import { AdminNav } from "./components/AdminNav";

async function fetchAppointments() {
  const response = await axios
    .get(import.meta.env.VITE_APP_API_ENDPOINT + "/appointments")
    .then((response) => {
      console.log(response.data.appointments);
      const appointments = response.data.appointments;
      return appointments;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(response);
  return response;
}

function Admin() {
  const [submissionsData, setSubmissionsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const appointments = await fetchAppointments();
      setSubmissionsData(appointments);
    }
    fetchData();
  }, []);
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
