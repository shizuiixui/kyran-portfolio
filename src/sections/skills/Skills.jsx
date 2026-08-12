import './skills.css'
import data from './data'

const Skills = () => {
  return (
    <section id="skills">
      <div className="skills_header fade-up">
        <h2>My Skills</h2>
        <p>
          These are the technologies and tools I continuously use and 
          improve as I grow in the field of development and design.
        </p>
      </div>

      <div className="container skills_container">
        {data.map(item => (
          <div key={item.id} className="fade-up" style={{ height: '100%' }}>
            <div className="skill_card">
              <h3 className="skill_category">{item.category}</h3>
              
              <div className="skill_pills">
                {item.skills.map((skill, index) => (
                  <span key={index} className="skill_pill">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="skill_description">{item.description}</p>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills