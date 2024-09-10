import "./Gallery.css";
import workImages from "../components/SelectWorkImages.tsx";
import TestImages from "../components/TestImages.tsx";
import { useEffect, useState } from "react";
import goToTop from "../GoToTop.tsx";
import MasonryGrid from "../components/MasonryGrid.tsx";

const Gallery = () => {
  const [columns, setColumns] = useState<number>(4); // Default to 4 columns

  useEffect(() => {
    goToTop();
    // Function to update the number of columns based on screen width
    const updateColumns = () => {
      if (window.innerWidth < 1024) {
        setColumns(2); // Set to 2 columns for mobile size
      } else {
        setColumns(4); // Set to 4 columns for larger screens
      }
    };

    // Call the function initially to set the correct number of columns
    updateColumns();

    // Add a resize event listener
    window.addEventListener("resize", updateColumns);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateColumns);
  }, []); // Empty dependency array to run only on mount and unmount

  return (
    <section className="gallery-container">
      <MasonryGrid images={TestImages} columns={columns} />
    </section>
  );
};

export default Gallery;
