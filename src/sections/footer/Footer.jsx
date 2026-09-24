import { FaGithub, FaLinkedin, FaDribbble, FaEnvelope } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container footer_container">
        <ul className="footer_links">
          <li><a href="#header">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#portfolio">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer_socials">
          <a href="https://github.com/shizuiixui" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/kyran-gabriel-josafat-37a1432a1/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://dribbble.com/shizuii" target="_blank" rel="noreferrer" aria-label="Dribbble">
            <FaDribbble />
          </a>
          <a href="mailto:kyjosafat02@gmail.com" target="_blank" rel="noreferrer" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>

        <p>© 2025 Kyran Gabriel E. Josafat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;