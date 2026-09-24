import { useState, useEffect } from "react";
import Picture from '../../assets/picture.jpg'
import "./header.css"

const Header = () => {
  const fullText = "Kyran Gabriel";
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && text === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 600);
    } else {
      const speed = isDeleting ? 60 : 120;
      timer = setTimeout(() => {
        setText(prev => {
          if (!isDeleting) {
            return fullText.slice(0, prev.length + 1);
          } else {
            return fullText.slice(0, prev.length - 1);
          }
        });
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <header id="header">
      <div className="container header_container">
        
        <div className="header_left fade-up">
          <div className="availability_badge">
            <span className="pulsing_dot"></span>
            <span>Available for work</span>
          </div>
          <h4 className="greeting">Welcome to my Portfolio</h4>
          <h1 className="name">
            I am <span className="highlight">{text}</span>
            <span className="typewriter_cursor">|</span>
          </h1>
          <h3 className="role">Aspiring UI/UX Designer & Mobile Developer</h3>
          <p>
            Hello! I am a passionate 4th-year Information Technology student at PHINMA-University of Pangasinan. Explore my portfolio and discover how I create meaningful digital experiences.
          </p>
          
          <div className="header_cta">
            <a href="#contact" className='btn dark'>Hire Me</a>
            <a href="#portfolio" className='btn primary'>My Projects</a>
          </div>
        </div>

        <div className="header_right fade-up">
          <div className="image_wrapper">
            <div className="image_backdrop"></div>
            <img src={Picture} alt="Kyran Gabriel" className="profile_img"/>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header