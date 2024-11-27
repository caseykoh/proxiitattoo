import React, { useState } from "react";
import { X, Upload } from "lucide-react";

interface ImageUploadProps {
  initialImages?: File[];
  onChange: (files: File[] | null) => void;
  maxImages: number;
  acceptTypes?: string[];
}

export function ImageUpload({
  initialImages = [],
  onChange,
  maxImages,
  acceptTypes = ["image/jpeg", "image/png"],
}: ImageUploadProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>(initialImages);

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - selectedImages.length;
    const newImages = files.slice(0, remainingSlots);

    const invalidFiles = files.filter(
      (file) => !acceptTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      const validTypesText = acceptTypes
        .map((item) => item.split("/")[1])
        .join(", ");
      alert(`Please upload only valid image formats: ${validTypesText}.`);
      return;
    }

    if (files.length > remainingSlots) {
      alert(`Maximum of ${maxImages} files are allowed.`);
      return;
    }

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);
    // Then update parent component with new value
    onChange(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative drop-shadow-md">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="w-full aspect-square object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-slate-900/75 text-white rounded-full p-1"
              aria-label={`Remove image ${index + 1}`}
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {selectedImages.length < maxImages && (
          <label
            htmlFor="image-upload"
            className="w-full cursor-pointer aspect-square flex items-center justify-center bg-slate-100 rounded-lg !mb-0 border-dashed border-2 border-slate-300"
          >
            <div className="flex flex-col items-center">
              <Upload size={24} className="text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload</span>
            </div>
            <input
              id="image-upload"
              type="file"
              accept={acceptTypes.join(", ")}
              onChange={handleImageSelection}
              className="hidden"
              multiple
            />
          </label>
        )}
      </div>
    </div>
  );
}
