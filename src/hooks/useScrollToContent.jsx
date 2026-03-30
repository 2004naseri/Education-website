// src/hooks/useScrollToContent.jsx
import { useRef } from "react";

export const useScrollToContent = () => {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { contentRef, scrollToContent };
};
