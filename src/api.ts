import axios from "axios";
const imageReferencesAccessBase = import.meta.env.VITE_AWS_IMAGE_REFERENCES_URL;
const presignedApiUrl = import.meta.env.VITE_AWS_PRESIGNED_URLS;
const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT;

export async function uploadFileToS3(imageLink: File, url: string) {
  //PUT request with the body as the file.
  const response = await axios.put(url, imageLink, {
    headers: {
      "Content-Type": "application/png",
    },
  });
  console.log(response);
}

export async function getFlashes() {
  try {
    const response = await fetch(`${apiUrl}/api/flashes`);
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFlash(formData: {
  title: string;
  price: string;
  dimensions: string;
  isActive: boolean;
  mainImageUrl: any;
  extraImageUrls: string[];
}) {
  const response = await axios
    .post(import.meta.env.VITE_APP_API_ENDPOINT + "/admin/flash", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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

export async function deleteFlash(id: string) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_APP_API_ENDPOINT + `/admin/flash/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(response);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}

export async function getImageUrls(images: { file: File; id: any }[]) {
  try {
    const payload = {
      imageList: images.map(({ id, file }) => {
        const lowExtension = file.type.split("/")[1].toLowerCase();
        const extension = lowExtension === "jpeg" ? "jpg" : lowExtension;
        return { id, extension };
      }),
    };
    // payload that is being sent to lambda: " + payload
    const response = await axios.post(presignedApiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const presignedUrls = response.data.presignedUrls;

    const urls = await Promise.all(
      presignedUrls.map(
        async (imageData: { imageId: any; url: any; key: any }) => {
          // console.log(imageData);
          const imgToUpload = images.find(
            (image) => image.id.toString() === imageData.imageId.toString()
          )?.file;
          if (imgToUpload) {
            await uploadFileToS3(imgToUpload, imageData.url);
          } else {
            throw "No matching image with id";
          }
          const accessUrl = imageReferencesAccessBase + imageData.key;
          return accessUrl;
        }
      )
    );
    return urls;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
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
