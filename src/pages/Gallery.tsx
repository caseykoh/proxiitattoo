import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";
import { useEffect, useState } from "react";
import goToTop from "../GoToTop.tsx";

type Image = {
  src: string;
  alt: string;
};

function organizeImagesIntoRows(images: Image[]): Image[][] {
  const rows: Image[][] = [];
  let remainingImages = [...images];

  while (remainingImages.length > 0) {
    // Generate a random number of images for the current row (0-2).
    const imagesInRow = Math.floor(Math.random() * 3); // Random number between 0 and 2.

    // Pull that many images from the remaining array, but don't exceed the available images.
    const row = remainingImages.splice(0, imagesInRow);

    // Only add the row if it contains images (to avoid adding empty rows).
    if (row.length > 0) {
      rows.push(row);
    }
  }

  return rows;
}

const Gallery = () => {
  const [rows, setRows] = useState<Image[][]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const [showDefaultView, setShowDefaultView] = useState(true);

  useEffect(() => {
    goToTop();
    const rows = organizeImagesIntoRows(workImages);
    setRows(rows);
    console.log(rows);
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      console.log(isMobile);
      console.log(showDefaultView);
    };

    // Check on initial render
    checkIsMobile();

    // Listen for window resize events
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <section className="gallery-container">
      {isMobile ? (
        <></>
      ) : (
        <div className="w-full flex flex-row justify-start">
          <div className="flex flex-row gap-2">
            <span
              onClick={() => setShowDefaultView(true)}
              className={`${
                showDefaultView
                  ? "text-gray-600"
                  : "text-gray-800/50 hover:text-gray-800"
              } cursor-pointer`}
            >
              [Scattered]
            </span>
            <span
              onClick={() => {
                setShowDefaultView(false);
              }}
              className={`${
                showDefaultView
                  ? "text-gray-800/50 hover:text-gray-800"
                  : "text-gray-600"
              } cursor-pointer`}
            >
              [Grid]
            </span>
          </div>
        </div>
      )}

      <div>
        {showDefaultView && !isMobile ? (
          rows?.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4"
              style={{ transform: `translateY(-${i * 20}%)` }}
            >
              {row.map((image, index) => {
                // Randomly assign the image to one of the 6 columns
                const randomColumn = Math.floor(Math.random() * 6) * 2; // Randomly select 0, 2, 4, 6, 8, 10
                return (
                  <div
                    key={index}
                    className="col-span-2 column min-w-44"
                    style={{ gridColumnStart: `${randomColumn + 1}` }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-2 items-end md:pl-0 md:grid md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] md:gap-4 md:max-w-[1040px] md:mx-auto">
            {workImages?.map((img, i) => (
              <div
                className="md:bg-[#c9c9c9] md:w-full md:object-cover md:overflow-hidden md:aspect-[3/4] md:flex md:items-center md:justify-center"
                key={i}
              >
                <img
                  className="w-full h-full object-cover"
                  width="400"
                  height="400"
                  alt={img.alt}
                  src={img.src}
                  loading={i > 3 ? "lazy" : "eager"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
