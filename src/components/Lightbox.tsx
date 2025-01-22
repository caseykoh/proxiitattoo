import { FC } from "react";

interface LightboxProps {
  imageSrc: string; // URL of the image to display in the lightbox
  onClose: () => void; // Function to close the lightbox
}

const Lightbox: FC<LightboxProps> = ({ imageSrc, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75"
      onClick={onClose} // Close lightbox when clicking outside the image
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white leading-3 bg-black bg-opacity-50 p-2 focus:outline-none hover:bg-opacity-75"
        aria-label="Close Lightbox"
      >
        [close]
      </button>
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()} // Prevent click event propagation to the overlay
      >
        <img
          src={imageSrc}
          alt="Lightbox"
          className="max-w-full max-h-[90vh]"
        />
      </div>
    </div>
  );
};

export default Lightbox;
