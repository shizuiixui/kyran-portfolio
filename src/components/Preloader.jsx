import { useState, useEffect } from "react";
import LogoDark from "../assets/Logo_dark.png";
import "./preloader.css";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll during intro loading
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0 to 100
    const duration = 1200; // 1.2s total count duration
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small pause at 100% before starting curtain reveal
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 200);

      // Unmount after curtain slide animation completes
      const doneTimeout = setTimeout(() => {
        setIsDone(true);
        document.body.style.overflow = "unset";
      }, 950);

      return () => {
        clearTimeout(exitTimeout);
        clearTimeout(doneTimeout);
      };
    }
  }, [progress]);

  if (isDone) return null;

  return (
    <div 
      className={`preloader_overlay ${isExiting ? "exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader_content">
        {/* Glowing Logo */}
        <div className="preloader_logo_box">
          <img src={LogoDark} alt="Kyran Logo" className="preloader_logo" />
          <div className="preloader_logo_glow" />
        </div>

        {/* Brand Name & Tagline */}
        <h2 className="preloader_title">Kyran Gabriel</h2>
        <p className="preloader_subtitle">Mobile Developer • UI/UX Designer</p>

        {/* Sleek Progress Track */}
        <div className="preloader_progress_track">
          <div 
            className="preloader_progress_bar" 
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>

        {/* Counter Percentage */}
        <span className="preloader_percentage">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
