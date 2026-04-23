import Picture from '../../assets/picture.jpg'
import "./header.css"

const Header = () => {
  return (
    <header id="header">
      <div className="container header_container">
        
        <div className="header_left fade-up">
          <h4 className="greeting">Welcome to my Portfolio</h4>
          <h1 className="name">I Am <span className="highlight">Kyran Gabriel</span></h1>
          <h3 className="role">Aspiring UI/UX Designer & Mobile Developer</h3>
          <p>
            Hello! I am a passionate 3rd-year Information Technology student at PHINMA-University of Pangasinan. Explore my portfolio and discover how I create meaningful digital experiences.
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