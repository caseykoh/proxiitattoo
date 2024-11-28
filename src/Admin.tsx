import axios from "axios";
import { useEffect, useState } from "react";

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
      <div>Hello admin!</div>
      <ul>
        {submissionsData.map((el) => (
          <li key={el.id}>{el.full_name}</li>
        ))}
      </ul>
    </>
  );
}

export default Admin;
