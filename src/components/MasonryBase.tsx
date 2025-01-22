import React, { useEffect, useState } from "react";
import MasonryGrid from "./MasonryGrid.tsx";
import goToTop from "../GoToTop.tsx";
import { Flash } from "../types/types";

interface MasonryBaseProps {
  images: Flash[];
  columnsDefault: number; // Default number of columns for large screens
  columnsMobile: number; // Number of columns for mobile screens
  children?: React.ReactNode; // Allow passing additional content
  onImageClick: (flash: Flash) => void;
}

const MasonryBase: React.FC<MasonryBaseProps> = ({
  images,
  columnsDefault,
  columnsMobile,
  children,
  onImageClick,
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
      <MasonryGrid
        images={images}
        columns={columns}
        onImageClick={onImageClick}
      />
    </section>
  );
};

export default MasonryBase;
