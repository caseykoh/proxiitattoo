import "./FlashPage.css";
import { useEffect, useState } from "react";
import MasonryBase from "../components/MasonryBase.tsx";
import { getFlashes } from "../api.ts";
import { Flash } from "../types/types";

const FlashPage = () => {
  const [flashes, setFlashes] = useState<Flash[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setFlashes(await getFlashes());
    };
    fetchData();
  }, []);
  return (
    <MasonryBase
      images={flashes.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })}
      columnsDefault={6}
      columnsMobile={2}
    >
      <div className="w-full flex flex-row justify-end px-4">
        <h1 className="font-normal text-gray-500 text-end">available flash</h1>
      </div>
    </MasonryBase>
  );
};

export default FlashPage;
