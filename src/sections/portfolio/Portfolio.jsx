import './portfolio.css';
import data from './data';
import Cards from "../../components/Cards";

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h2>My Projects</h2>
      <p>
        Here are some of the projects I’ve worked on — showcasing my experience in development, design, and collaboration.
      </p>

      <div className="container projects_container portrait">
        {data.slice(0, 2).map((item) => (
          <Cards key={item.id} className="project_card light">
            <div className="project_image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="project_details">
              <h3>{item.title}</h3>
              <p className="project_description">{item.description}</p>
              <p><strong>Role:</strong> {item.role}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <div className="project_links">
                <a href={item.github} target="_blank" rel="noopener noreferrer" className="btn">
                  View on GitHub
                </a>
              </div>
            </div>
          </Cards>
        ))}
      </div>

      <div className="container projects_container landscape">
        {data.slice(2, 3).map((item) => (
          <Cards key={item.id} className="project_card light landscape_card">
            <div className="landscape_content">
              <div className="project_image landscape_image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="project_details">
                <h3>{item.title}</h3>
                <p className="project_description">{item.description}</p>
                <p><strong>Role:</strong> {item.role}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <div className="project_links">
                  <a href={item.github} target="_blank" rel="noopener noreferrer" className="btn">
                    View on GitHub
                  </a>
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
