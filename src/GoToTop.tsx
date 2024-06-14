import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log("going up!");
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default GoToTop;
