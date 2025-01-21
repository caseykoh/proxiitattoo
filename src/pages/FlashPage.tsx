import "./FlashPage.css";
import { useEffect, useState } from "react";
import MasonryBase from "../components/MasonryBase.tsx";
import { getFlashes } from "../api.ts";
import { Flash } from "../types/types";
import Lightbox from "../components/Lightbox.tsx";

const FlashPage = () => {
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const [selectedFlash, setSelectedFlash] = useState<Flash>();
  const [showLightbox, setShowLightbox] = useState(false);

  const handleImageClick = (flash: Flash) => {
    setSelectedFlash(flash);
    setShowLightbox(true);
  };

  const onLightboxClose = () => {
    setShowLightbox(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setFlashes(await getFlashes());
    };
    fetchData();
  }, []);
  return (
    <>
      <MasonryBase
        images={flashes.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })}
        columnsDefault={6}
        columnsMobile={2}
        onImageClick={handleImageClick}
      >
        <div className="w-full flex flex-row justify-end px-4">
          <h1 className="font-normal text-gray-500 text-end">
            available flash
          </h1>
        </div>
      </MasonryBase>
      {showLightbox && (
        <Lightbox
          imageSrc={selectedFlash?.mainImageUrl || ""}
          onClose={onLightboxClose}
        ></Lightbox>
      )}
    </>
  );
};

export default FlashPage;
