import "./navbar.css";
import data from "./data";
import Logo from "../../assets/Logo.png";
import { useTheme } from "../../context/ThemeContext";
import { IoSunny, IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav id="navbar"> 
      <div className="container nav_container">
        
        <a href="index.html" className="nav_logo">
          <img src={Logo} alt="Logo" />
          <span className="logo_text">Kyran</span>
        </a>
        
        <ul className="nav_menu">
          {data.map(item => (
            <li key={item.id}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
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