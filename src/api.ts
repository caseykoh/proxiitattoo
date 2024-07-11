import axios from "axios";

export async function uploadFileToS3(imageLink: File, url: string) {
  //PUT request with the body as the file.
  const response = await axios.put(url, imageLink, {
    headers: {
      "Content-Type": "application/png",
    },
  });
  console.log(response);
}

export async function submitForm(formData: FormData) {
  const response = await axios
    .post(import.meta.env.VITE_APP_API_ENDPOINT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(response);
}
