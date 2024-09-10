import React, { useEffect, useState } from "react";
import MasonryGrid from "./MasonryGrid";
import goToTop from "../GoToTop.tsx";

interface GalleryBaseProps {
  images: { src: string; alt: string }[];
  columnsDefault: number; // Default number of columns for large screens
  columnsMobile: number; // Number of columns for mobile screens
  children?: React.ReactNode; // Allow passing additional content
}

const GalleryBase: React.FC<GalleryBaseProps> = ({
  images,
  columnsDefault,
  columnsMobile,
  children,
}) => {
  const [columns, setColumns] = useState<number>(columnsDefault);

  useEffect(() => {
    goToTop();
    const updateColumns = () => {
      if (window.innerWidth < 1024) {
        setColumns(columnsMobile);
      } else {
        setColumns(columnsDefault);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [columnsDefault, columnsMobile]);

  return (
    <section className="gallery-container">
      {children} {/* Render additional content if provided */}
      <MasonryGrid images={images} columns={columns} />
    </section>
  );
};

export default GalleryBase;
