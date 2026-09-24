import { useState, useEffect } from "react";
import "./scrollProgress.css";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="scroll_progress_track" 
      aria-hidden="true"
    >
      <div
        className="scroll_progress_bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
};

export default ScrollProgress;
