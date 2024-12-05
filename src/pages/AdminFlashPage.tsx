import { useState } from "react";
import { FlashGallery } from "../components/FlashGallery";
import { ImageUpload } from "../components/ImageUpload";
import { Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { getImageUrls } from "../api";

// Mock data - in a real app, this would come from your database
const flashDesigns = [
  {
    id: "1",
    title: "Traditional Rose",
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 150,
    available: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Skull Design",
    imageUrl: "/placeholder.svg?height=200&width=200",
    price: 200,
    available: true,
    createdAt: "2024-01-19T15:30:00Z",
  },
];

export default function AdminFlashPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    dimensions: "",
    isActive: true,
    mainImageUrl: "",
    extraImageUrls: [],
  });
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState<{ file: File; id: any }[] | null>(
    []
  );
  const [extraImages, setExtraImages] = useState<
    { file: File; id: any }[] | null
  >([]);

  const onMainImageChange = (selectedImages: File[] | null) => {
    if (selectedImages) {
      const uniqueList = selectedImages.map((file) => {
        return {
          file,
          id: uuidv4(),
        };
      });
      setMainImage(uniqueList);
    }
  };

  const onExtraImageChange = (selectedImages: File[] | null) => {
    if (selectedImages) {
      const uniqueList = selectedImages.map((file) => {
        return {
          file,
          id: uuidv4(),
        };
      });
      setExtraImages(uniqueList);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainImage) {
      return;
    }
    setLoading(true);
    try {
      if (!extraImages || extraImages.length == 0) {
        return;
      }
      const mainImageUrl = await getImageUrls(mainImage);
      if (!mainImageUrl) {
        console.log("Could not get url from api.ts for main image");
        return;
      }
      const extraImageUrls = await getImageUrls(extraImages);
      console.log(mainImageUrl);
      console.log(extraImageUrls);

      const formFields = {
        title: formData.title,
        price: formData.price,
        dimensions: formData.dimensions,
        isActive: formData.isActive,
        mainImageUrl: mainImageUrl[0],
        extraImageUrls: mainImageUrl,
      };
      console.log(formFields);
      //   await submitForm(formFields);
      console.log("Form submitted successfully!");
      //   await uploadFlashDesign(formData);
      //   // Reset form and preview
      //   setPreview(null);
      //   const form = document.querySelector("form") as HTMLFormElement;
      //   form?.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Flash Designs</h2>
          <p className="text-muted-foreground">
            Upload and manage your flash tattoo designs.
          </p>
        </div>
      </div>
      <div className="grid gap-8">
        <div>
          <div className="p-6 border border-solid border-slate-300 rounded-lg flex">
            <form
              onSubmit={handleSubmit}
              className="grid gap-6 w-full max-w-md"
            >
              <div>
                <h3 className="text-xl font-medium">Upload New Design</h3>
                <p>Add a new flash design to your portfolio.</p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="title">Design Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="p-2 text-base rounded-lg py-2 px-3 border border-solid border-slate-300 duration-150 focus:outline-none focus:border-slate-700"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  className="p-2 text-base rounded-lg py-2 px-3 border border-solid border-slate-300 duration-150 focus:outline-none focus:border-slate-700"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-semibold">
                  Upload Extra Images (Max 3)
                  <span className="required-q">*</span>
                </label>
                <ImageUpload
                  key="extra-images"
                  onChange={onExtraImageChange}
                  maxImages={3}
                  acceptTypes={["image/jpeg", "image/png"]}
                />
              </div>
              <div className="grid gap-2">
                <label className="font-semibold">
                  Upload Main Image <span className="required-q">*</span>
                </label>
                <ImageUpload
                  key="main-image"
                  onChange={onMainImageChange}
                  maxImages={1}
                  acceptTypes={["image/jpeg", "image/png"]}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Design
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <FlashGallery designs={flashDesigns} />
      </div>
    </div>
  );
}
