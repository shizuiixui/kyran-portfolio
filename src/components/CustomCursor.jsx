import { useEffect, useState, useRef } from "react";
import "./customCursor.css";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only activate for devices with a fine pointer (mice / trackpads)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantly position the inner precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth animation loop for the trailing outer ring
    const renderLoop = () => {
      // Smooth spring interpolation (lerp)
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    // Event delegation to detect hovering over clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        "a, button, input, textarea, .project_card, .contact_option, .about_card, .skill_card, .project_image, [role='button'], .theme_toggle_btn, .scroll_to_top"
      );
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  return (
    <div
      className={`custom_cursor_container ${isVisible ? "visible" : "hidden"} ${
        isHovered ? "hovered" : ""
      } ${isClicked ? "clicked" : ""}`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div ref={dotRef} className="cursor_dot" />

      {/* Fluid Trailing Glow Ring */}
      <div ref={ringRef} className="cursor_ring" />
    </div>
  );
};

export default CustomCursor;
