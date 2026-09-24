import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Navbar from './sections/navbar/Navbar';
import Header from './sections/header/Header';
import About from './sections/about/About';
import Portfolio from './sections/portfolio/Portfolio';
import Contact from './sections/contact/Contact';
import Footer from './sections/footer/Footer';
import Skills from './sections/skills/Skills';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {

  useEffect(() => {
    // Initialize Lenis for buttery smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    // Synchronize AOS scroll triggers with Lenis
    lenis.on('scroll', () => {
      AOS.refresh();
    });

    AOS.init({
      duration: 800,
      offset: 80,
      easing: "ease-out",
    });

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default App;
