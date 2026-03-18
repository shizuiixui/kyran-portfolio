import "./navbar.css";
import data from "./data";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
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

        <div className="nav_cta">
          <a href="#contact" className="btn nav_btn">Contact Me</a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;