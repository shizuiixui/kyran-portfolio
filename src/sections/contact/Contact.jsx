import { useRef, useState, useEffect } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa";
import { 
  IoPaperPlaneOutline, 
  IoCheckmarkCircle, 
  IoAlertCircle, 
  IoInformationCircle,
  IoCopyOutline,
  IoCheckmarkDoneOutline
} from "react-icons/io5";
import Cards from "../../components/Cards";
import "./contact.css";

const Contact = () => {
  const formRef = useRef();
  const nameInputRef = useRef();
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error" | "unconfigured"
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

  // Listen for Smart Auto-Focus trigger event (e.g. from "Hire Me" button)
  useEffect(() => {
    const handleAutoFocus = () => {
      if (nameInputRef.current) {
        // Wait for smooth scroll arrival before triggering focus & pulse
        setTimeout(() => {
          nameInputRef.current.focus();
          nameInputRef.current.classList.add("input_pulse_highlight");
          setTimeout(() => {
            nameInputRef.current?.classList.remove("input_pulse_highlight");
          }, 2200);
        }, 650);
      }
    };

    window.addEventListener("focus-contact-form", handleAutoFocus);
    return () => window.removeEventListener("focus-contact-form", handleAutoFocus);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("kyjosafat02@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    // Check if user has set their access key in .env
    if (!accessKey) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const formData = new FormData(formRef.current);
      formData.append("access_key", accessKey);
      formData.append("from_name", "Portfolio Visitor");
      formData.append("subject", "New Message from Portfolio");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        formRef.current.reset();

        // Automatically reset status back to idle after 6 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Web3Forms submission error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please email directly or try again later.");
    }
  };

  return (
    <section id="contact">
      <div className="contact_header fade-up">
        <h2>Contact Me</h2>
        <p>
          I’m always open to new opportunities, or collaborations.
          Feel free to reach out through any of the channels below.
        </p>
      </div>

      <div className="container contact_container fade-up">
        <div className="contact_options">
          {/* Email option with 1-Click Copy & Floating Tooltip */}
          <Cards className="contact_option email_option">
            <FaEnvelope className="contact_icon" />
            <h4>Email</h4>
            <button 
              type="button"
              className="copy_email_btn" 
              onClick={handleCopyEmail}
              title="Click to copy email address"
              aria-label="Copy email address"
            >
              <span className="email_text">kyjosafat02@gmail.com</span>
              {copied ? (
                <IoCheckmarkDoneOutline className="copy_icon copied" />
              ) : (
                <IoCopyOutline className="copy_icon" />
              )}
            </button>

            {/* Floating Tooltip Bubble */}
            {copied && (
              <div className="copy_tooltip" role="status">
                ✓ Copied to clipboard!
              </div>
            )}
          </Cards>

          <Cards className="contact_option">
            <FaLinkedin className="contact_icon" />
            <h4>LinkedIn</h4>
            <a href="https://www.linkedin.com/in/kyran-gabriel-josafat-37a1432a1/" target="_blank" rel="noreferrer">
              linkedin.com/in/kyran-josafat
            </a>
          </Cards>

          <Cards className="contact_option">
            <FaGithub className="contact_icon" />
            <h4>GitHub</h4>
            <a href="https://github.com/shizuiixui" target="_blank" rel="noreferrer">
              github.com/shizuiixui
            </a>
          </Cards>

          <Cards className="contact_option">
            <FaDribbble className="contact_icon" />
            <h4>Dribbble</h4>
            <a href="https://dribbble.com/shizuii" target="_blank" rel="noreferrer">
              dribbble.com/shizuii
            </a>
          </Cards>
        </div>

        <form ref={formRef} onSubmit={handleSendEmail} className="contact_form">
          <div className="form_group">
            <input 
              ref={nameInputRef}
              id="contact-name-input"
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              disabled={status === "sending"}
            />
          </div>

          <div className="form_group">
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              disabled={status === "sending"}
            />
          </div>

          <div className="form_group">
            <textarea 
              name="message" 
              rows="6" 
              placeholder="Your Message" 
              required
              disabled={status === "sending"}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className={`btn contact_btn ${status === "sending" ? "loading" : ""}`}
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span className="spinner"></span>
                <span>Sending Message...</span>
              </>
            ) : status === "success" ? (
              <>
                <IoCheckmarkCircle className="btn_icon" />
                <span>Message Sent!</span>
              </>
            ) : (
              <>
                <IoPaperPlaneOutline className="btn_icon" />
                <span>Send Message</span>
              </>
            )}
          </button>

          {/* Feedback Status Banners */}
          {status === "success" && (
            <div className="contact_status_banner success" role="alert">
              <IoCheckmarkCircle className="status_banner_icon" />
              <div>
                <strong>Message sent successfully!</strong>
                <p>Thank you for reaching out. I’ll get back to you as soon as possible.</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="contact_status_banner error" role="alert">
              <IoAlertCircle className="status_banner_icon" />
              <div>
                <strong>Oops! Something went wrong.</strong>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {status === "unconfigured" && (
            <div className="contact_status_banner info" role="alert">
              <IoInformationCircle className="status_banner_icon" />
              <div>
                <strong>Web3Forms Key Not Found</strong>
                <p>
                  Please ensure <code>REACT_APP_WEB3FORMS_ACCESS_KEY</code> is set in your <code>.env</code> file and restart the dev server.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;