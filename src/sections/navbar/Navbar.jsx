import { useState, useEffect } from "react";
import "./navbar.css";
import data from "./data";
import Logo from "../../assets/Logo.png";
import { useTheme } from "../../context/ThemeContext";
import { IoSunny, IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState("#");

  useEffect(() => {
    const handleScroll = () => {
      // If at the very top of the page
      if (window.scrollY < 120) {
        setActiveNav("#");
        return;
      }

      // If at the very bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveNav("#contact");
        return;
      }

      const sections = [
        { id: "header", link: "#" },
        { id: "about", link: "#about" },
        { id: "skills", link: "#skills" },
        { id: "portfolio", link: "#portfolio" },
        { id: "contact", link: "#contact" }
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is currently active in the viewport
          if (rect.top <= 220 && rect.bottom >= 160) {
            setActiveNav(section.link);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar"> 
      <div className="container nav_container">
        
        <a href="index.html" className="nav_logo">
          <img src={Logo} alt="Logo" />
          <span className="logo_text">Kyran</span>
        </a>
        
        <ul className="nav_menu">
          {data.map(item => {
            const isActive = activeNav === item.link || (item.link === "#" && activeNav === "#header");
            return (
              <li key={item.id}>
                <a 
                  href={item.link}
                  className={isActive ? "active" : ""}
                  onClick={() => setActiveNav(item.link)}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav_actions">
          <button 
            className="theme_toggle_btn" 
            onClick={toggleTheme} 
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <IoSunny className="theme_icon sun" /> : <IoMoon className="theme_icon moon" />}
          </button>

          <div className="nav_cta">
            <a href="#contact" className="btn nav_btn">Contact Me</a>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;