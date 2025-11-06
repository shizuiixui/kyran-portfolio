import Picture from '../../assets/picture.jpg'
import "./header.css"

const Header = () => {
  return (
    <header id="header">
      <div className="container header_container">
       <div className="header_profile">
          <img src = {Picture} alt="Header Profile"/>
        </div>

        <h3> Kyran Gabriel E. Josafat</h3>
        <p>Hello! I am Kyran Gabriel E. Josafat, a passionate 3rd year Information Technology student
        at PHINMA-University of Pangasinan, aspiring to become a skilled developer dedicated to creating meaningful digital experiences.</p>

        <div className="header_cta">
          <a href="#contact" className='btn primary'>Let's Talk</a>
          <a href="#projects" className='btn light'>My Projects</a>
        </div>
      </div>
    </header>
  )
}

export default Header