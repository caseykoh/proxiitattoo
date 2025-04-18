import { useEffect, useState } from "react";
import { FlashGallery } from "../components/FlashGallery";
import { ImageUpload } from "../components/ImageUpload";
import { Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { getFlashes, getImageUrls, uploadFlash } from "../api";
import { Flash } from "../types/types";

const defaultFormData = {
  title: "",
  price: "",
  dimensions: "",
  isActive: true,
  mainImageUrl: "",
  extraImageUrls: [],
};

export default function AdminFlashPage() {
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [extraImages, setExtraImages] = useState<File[]>([]);
  const [flashes, setFlashes] = useState<Flash[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setFlashes(await getFlashes());
    };
    fetchData();
  }, []);

  const handleMainImageChange = (images: File[] | null) => {
    setMainImages(images || []);
  };

  const handleExtraImageChange = (images: File[] | null) => {
    setExtraImages(images || []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainImages || mainImages.length === 0) {
      console.log("Missing main image");
      return;
    }
    setLoading(true);
    const uniqueMainImages = mainImages.map((file) => {
      return {
        file,
        id: uuidv4(),
      };
    });
    const uniqueExtraImages = extraImages.map((file) => {
      return {
        file,
        id: uuidv4(),
      };
    });
    try {
      const mainImageUrl = await getImageUrls(uniqueMainImages);
      if (!mainImageUrl) {
        console.log("Could not get url from api.ts for main image");
        return;
      }
      const extraImageUrls = await getImageUrls(uniqueExtraImages);

      const formFields = {
        title: formData.title,
        price: formData.price,
        dimensions: formData.dimensions,
        isActive: formData.isActive,
        mainImageUrl: mainImageUrl[0],
        extraImageUrls: extraImageUrls || [],
      };
      console.log(mainImageUrl);
      console.log(formFields);
      console.log("Form submitted successfully!");
      await uploadFlash(formFields);
      // Reset form and preview
      setFormData(defaultFormData);
      setMainImages([]);
      setExtraImages([]);
      //   setPreview(null);
      //   const form = document.querySelector("form") as HTMLFormElement;
      //   form?.reset();
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
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
                  value={formData.title}
                  onChange={handleInputChange}
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
                  value={formData.price}
                  onChange={handleInputChange}
                  className="p-2 text-base rounded-lg py-2 px-3 border border-solid border-slate-300 duration-150 focus:outline-none focus:border-slate-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="font-semibold">
                  Upload Main Image <span className="required-q">*</span>
                </label>
                <ImageUpload
                  images={mainImages}
                  key="main-image"
                  onChange={handleMainImageChange}
                  maxImages={1}
                  acceptTypes={["image/jpeg", "image/png"]}
                />
              </div>
              <div className="grid gap-2">
                <label className="font-semibold">
                  Upload Extra Images (Max 3)
                  <span className="required-q">*</span>
                </label>
                <ImageUpload
                  images={extraImages}
                  key="extra-images"
                  onChange={handleExtraImageChange}
                  maxImages={3}
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
        <FlashGallery designs={flashes} />
      </div>
    </div>
  );
}
