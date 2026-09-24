import { useState, useEffect } from "react";
import "./navbar.css";
import data from "./data";
import Logo from "../../assets/Logo.png";
import LogoDark from "../../assets/Logo_dark.png";
import { useTheme } from "../../context/ThemeContext";
import { 
  IoSunny, 
  IoMoon, 
  IoMenu, 
  IoClose,
  IoHomeOutline,
  IoPersonOutline,
  IoCodeSlashOutline,
  IoBriefcaseOutline,
  IoMailOutline
} from "react-icons/io5";

const navIcons = {
  '#': <IoHomeOutline className="mobile_nav_icon" />,
  '#about': <IoPersonOutline className="mobile_nav_icon" />,
  '#skills': <IoCodeSlashOutline className="mobile_nav_icon" />,
  '#portfolio': <IoBriefcaseOutline className="mobile_nav_icon" />,
  '#contact': <IoMailOutline className="mobile_nav_icon" />
};

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState("#");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (link) => {
    setActiveNav(link);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav id="navbar"> 
      <div className="container nav_container">
        
        <a href="index.html" className="nav_logo" onClick={() => setIsMobileMenuOpen(false)}>
          <img src={isDarkMode ? LogoDark : Logo} alt="Logo" className="nav_logo_img" />
          <span className="logo_text">Kyran</span>
        </a>
        
        {/* Desktop Navigation Links */}
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

        {/* Action Controls */}
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

          {/* Mobile Hamburger Toggle Button */}
          <button
            className={`mobile_menu_toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            title={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <IoClose className="menu_icon" /> : <IoMenu className="menu_icon" />}
          </button>
        </div>

      </div>

      {/* Mobile Glassmorphic Drawer Backdrop & Menu */}
      {isMobileMenuOpen && (
        <div 
          className="mobile_drawer_backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="mobile_drawer_content" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile_drawer_header">
              <span className="mobile_drawer_title">Navigation</span>
              <button 
                className="mobile_drawer_close" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <IoClose />
              </button>
            </div>

            <ul className="mobile_nav_list">
              {data.map(item => {
                const isActive = activeNav === item.link || (item.link === "#" && activeNav === "#header");
                return (
                  <li key={item.id}>
                    <a 
                      href={item.link}
                      className={`mobile_nav_link ${isActive ? "active" : ""}`}
                      onClick={() => handleNavLinkClick(item.link)}
                    >
                      {navIcons[item.link] || <IoHomeOutline className="mobile_nav_icon" />}
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mobile_drawer_footer">
              <a 
                href="#contact" 
                className="btn mobile_cta_btn"
                onClick={() => handleNavLinkClick("#contact")}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;