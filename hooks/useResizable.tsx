"use client";

import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 300; // Minimum width for both columns

export const useResizable = (initialWidth = 50) => {
  const [width, setWidth] = useState(initialWidth);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (!isResizing.current) return;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(window.innerWidth - MIN_WIDTH, e.clientX)
      );
      setWidth((newWidth / window.innerWidth) * 100);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    isResizing.current = true;
  };

  return { width, startResizing };
};
