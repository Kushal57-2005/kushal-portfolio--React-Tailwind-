import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ScrollHero from "./components/ScrollHero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const [skills, setSkills] = useState([]);

  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroBottom = heroRef.current.getBoundingClientRect().bottom;

      if (heroBottom <= 0) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Failed to load skills:", err));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col scroll-smooth
      bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(222,222,227,1)_35%,rgba(227,227,227,1)_100%)]"
    >
      <ScrollHero ref={heroRef} />

      <nav
        className={`
          fixed w-full z-50
          transition-all duration-300
          ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        `}
      >
        <Navbar />
      </nav>

      <main className="flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(222,222,227,1)_35%,rgba(227,227,227,1)_100%)]">
        <Home />
        <About />
        <Skills />
        <Projects skills={skills} />
        <Contact />
      </main>
    </div>
  );
}
