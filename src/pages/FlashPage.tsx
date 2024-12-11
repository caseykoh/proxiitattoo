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
    <MasonryBase images={flashes} columnsDefault={4} columnsMobile={2}>
      {/* You can pass additional content here if needed */}
      <h1>Available Flash</h1>
    </MasonryBase>
  );
};

export default FlashPage;
