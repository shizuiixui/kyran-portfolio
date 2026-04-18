import './portfolio.css';
import data from './data';
import Cards from "../../components/Cards";

const Portfolio = () => {
  return (
    <section id="portfolio">
      <div className="portfolio_header fade-up">
        <h2>My Projects</h2>
        <p>
          Here are some of the projects I’ve worked on — showcasing my experience in development, design, and collaboration.
        </p>
      </div>

      <div className="container projects_container portrait">
        {data.slice(0, 4).map((item) => (
          <Cards key={item.id} className="project_card fade-up">
            <div className="project_image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="project_details">
              <h3>{item.title}</h3>
              <p className="project_description">{item.description}</p>
              <div className="project_meta">
                <p><strong>Role:</strong> {item.role}</p>
                <p><strong>Date:</strong> {item.date}</p>
              </div>
            </div>
          </Cards>
        ))}
      </div>

      <div className="container projects_container landscape">
        {data.slice(4, 5).map((item) => (
          <Cards key={item.id} className="project_card landscape_card fade-up">
            <div className="landscape_content">
              <div className="project_image landscape_image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="project_details">
                <h3>{item.title}</h3>
                <p className="project_description">{item.description}</p>
                <div className="project_meta">
                  <p><strong>Role:</strong> {item.role}</p>
                  <p><strong>Date:</strong> {item.date}</p>
                </div>
              </div>
            </div>
          </Cards>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;