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

export async function submitForm(formData: {
  full_name: string;
  email: string;
  instagram: string | null;
  design_type: "Flash" | "Custom" | "Freehand";
  size: string;
  placement: string;
  description: string;
  urls: any;
}) {
  const response = await axios
    .post(import.meta.env.VITE_APP_API_ENDPOINT + "/appointments", formData)
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(response);
}
