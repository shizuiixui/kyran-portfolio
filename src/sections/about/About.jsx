import "./about.css"
import Picture from "../../assets/picture.jpg"
import data from "./data"
import Cards from "../../components/Cards"

const About = () => {
  return (
    <section id="about">
      <div className="container about_container">
        <div className="about_left">
          <div className="about_portrait">
            <img src={Picture} alt="About Portrait"/>
          </div>
        </div>
        <div className="about_right">
          <h2>About Me</h2>
          <div className="about_cards">
            {
              data.map(item => (
              <Cards key={item.id} className="about_card">
                <span className='about_card-icon'>{item.icon}</span>
                <h5>{item.title}</h5>
                <small>{item.description}</small>
              </Cards>
            ))
            }
          </div>
          <p>I’m Kyran Gabriel E. Josafat from Bocacliw, Aguilar, Pangasinan. 
            I’m currently a third-year Information Technology student at PHINMA–University of Pangasinan. 
            I have a growing interest in front-end development and UI design, 
            and I aim to apply my developing skills to solve real-world problems. 
            I’m always eager to learn new technologies and continuously improve through practice and collaboration.</p>
        </div>
      </div>
    </section>
  )
}

export default About