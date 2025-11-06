import { useEffect } from "react";
import Navbar from './sections/navbar/Navbar';
import Header from './sections/header/Header';
import About from './sections/about/About';
import Portfolio from './sections/portfolio/Portfolio';
import Contact from './sections/contact/Contact';
import Footer from './sections/footer/Footer';
import Skills from './sections/skills/Skills';
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      easing: "ease-out",
    });
  }, []);

  return (
    <main>
      <Navbar />
      <Header />
      <section data-aos="fade-up"><About /></section>
      <section data-aos="fade-up" data-aos-delay="100"><Skills /></section>
      <section data-aos="fade-up" data-aos-delay="200"><Portfolio /></section>
      <section data-aos="fade-up" data-aos-delay="300"><Contact /></section>
      <Footer />
    </main>
  );
};

export default App;
