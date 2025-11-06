import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import "./contact.css";

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>
        I’m always open to new opportunities, collaborations, or just a friendly chat.
        Feel free to reach out through any of the channels below.
      </p>

      <div className="container contact_container">
        {/* Contact Info Cards */}
        <div className="contact_options">
          <article className="contact_option">
            <FaEnvelope className="contact_icon" />
            <h4>Email</h4>
            <a href="mailto:kyjosafat02@gmail.com" target="_blank" rel="noreferrer">
              kyjosafat02@gmail.com
            </a>
          </article>

          <article className="contact_option">
            <FaLinkedin className="contact_icon" />
            <h4>LinkedIn</h4>
            <a href="https://www.linkedin.com/in/kyran-gabriel-josafat-37a1432a1/" target="_blank" rel="noreferrer">
              linkedin.com/in/kyran-josafat
            </a>
          </article>

          <article className="contact_option">
            <FaGithub className="contact_icon" />
            <h4>GitHub</h4>
            <a href="https://github.com/shizuiixui" target="_blank" rel="noreferrer">
              github.com/shizuiixui
            </a>
          </article>
        </div>

        {/* Contact Form */}
        <form className="contact_form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="6" placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
