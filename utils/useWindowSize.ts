import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const resize = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return { dimensions };
}
