import { useState, useEffect } from 'react';
import './portfolio.css';
import data from './data';
import Cards from "../../components/Cards";
import { IoClose, IoExpandOutline } from "react-icons/io5";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="portfolio">
      <div className="portfolio_header fade-up">
        <h2>My Projects</h2>
        <p>
          Here are some of the projects I’ve worked on — showcasing my experience in development, design, and collaboration.
        </p>
      </div>

      <div className="container projects_container portrait">
        {data.slice(0, 5).map((item) => (
          <Cards key={item.id} className="project_card fade-up">
            <div 
              className="project_image"
              onClick={() => setSelectedProject(item)}
              title="Click to zoom preview"
            >
              <img src={item.image} alt={item.title} />
              <div className="project_image_overlay">
                <IoExpandOutline className="overlay_icon" />
                <span className="overlay_text">Preview Design</span>
              </div>
            </div>
            <div className="project_details">
              <h3>{item.title}</h3>
              {item.skills && (
                <div className="project_pills">
                  {item.skills.map((skill, index) => (
                    <span key={index} className="project_pill">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <p className="project_description">{item.description}</p>
              <div className="project_meta">
                <p><strong>Role:</strong> {item.role}</p>
                <p><strong>Date:</strong> {item.date}</p>
              </div>
              
              {item.apkLink && (
                <div className="project_links">
                  <a href={item.apkLink} download className="btn primary">
                    Download APK
                  </a>
                </div>
              )}
            </div>
          </Cards>
        ))}
      </div>

      <div className="container projects_container landscape">
        {data.slice(5).map((item) => (
          <Cards key={item.id} className="project_card landscape_card fade-up">
            <div className="landscape_content">
              <div 
                className="project_image landscape_image"
                onClick={() => setSelectedProject(item)}
                title="Click to zoom preview"
              >
                <img src={item.image} alt={item.title} />
                <div className="project_image_overlay">
                  <IoExpandOutline className="overlay_icon" />
                  <span className="overlay_text">Preview Design</span>
                </div>
              </div>
              <div className="project_details">
                <h3>{item.title}</h3>
                {item.skills && (
                  <div className="project_pills">
                    {item.skills.map((skill, index) => (
                      <span key={index} className="project_pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <p className="project_description">{item.description}</p>
                <div className="project_meta">
                  <p><strong>Role:</strong> {item.role}</p>
                  <p><strong>Date:</strong> {item.date}</p>
                </div>
                {item.apkLink && (
                  <div className="project_links">
                    <a href={item.apkLink} download className="btn primary">
                      Download APK
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Cards>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedProject && (
        <div 
          className="lightbox_backdrop" 
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox_card" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox_header">
              <div>
                <h3>{selectedProject.title}</h3>
                <p className="lightbox_subtitle">{selectedProject.role}</p>
              </div>
              <button 
                className="lightbox_close_btn" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close preview"
                title="Close preview"
              >
                <IoClose />
              </button>
            </div>

            <div className="lightbox_image_container">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="lightbox_footer">
              {selectedProject.skills && (
                <div className="project_pills">
                  {selectedProject.skills.map((skill, index) => (
                    <span key={index} className="project_pill">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {selectedProject.apkLink && (
                <a href={selectedProject.apkLink} download className="btn primary">
                  Download APK
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;