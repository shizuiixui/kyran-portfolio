import { useRef, useState } from 'react';
import './cards.css';

const Cards = ({ children, className = '', onClick, maxTilt = 7 }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
    });

    setGlareStyle({
      opacity: 0.18,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease',
    });
  };

  return (
    <article
      ref={cardRef}
      className={`card ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className="card_glare" style={glareStyle} aria-hidden="true" />
      {children}
    </article>
  );
};

export default Cards;