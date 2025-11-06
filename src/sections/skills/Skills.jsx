import './skills.css'
import data from './data'
import Cards from "../../components/Cards"

const Skills = () => {
  return (
    <section id="skills">
      <h2>My Skills</h2>
      <p>
        These are the skills I’ve learned and continuously
        improve as I grow in the field of development and design.
      </p>

      <div className="container skills_container">
        {data.map(item => (
          <Cards key={item.id} className="cards skills light">
            <div className="skills_icon">{item.icon}</div>
            <div className="skills_details">
              <h4>{item.skill}</h4>
              <p>{item.description}</p>
            </div>
          </Cards>
        ))}
      </div>
    </section>
  )
}

export default Skills
