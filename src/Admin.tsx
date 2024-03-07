import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
  const [submissionsData, setSubmissionsData] = useState<any[]>([]);
  const endpoint = `http://127.0.0.1:8000/app/inquiry-submission/`;
  const fetchData = async () => {
    console.log("fetching..");
    const response = await axios.get(endpoint);
    console.log(response);
    const data = response.data;
    setSubmissionsData(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ul>
        {submissionsData.map((el) => (
          <li key={el.id}>{el.first_name}</li>
        ))}
      </ul>
    </>
  );
}

export default Admin;
