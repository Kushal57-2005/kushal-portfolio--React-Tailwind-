import { useState, useEffect } from "react";

export default function Navbar() {
  const [nav, setNav] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/data/navbar.json")
      .then((res) => res.json())
      .then((data) => setNav(data))
      .catch((err) => console.error("Error fetching navbar:", err));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-auto max-w-4xl">
      <div className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-5 py-2.5 md:px-6 md:py-3 flex justify-between items-center">
        <h1 
          className="text-lg md:text-xl font-bold cursor-pointer text-blue-600 tracking-wide"
          onClick={() => scrollToSection("home")}
        >
          KUSHAL
        </h1>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 ml-12 text-base font-medium text-slate-800">
          {nav.map((item) => (
            <li
              key={item}
              onClick={() => scrollToSection(item)}
              className="cursor-pointer transition-colors duration-300 hover:text-blue-600 relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 mt-2" : "max-h-0"}`}>
        <ul className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-5 py-4 flex flex-col gap-3 text-sm font-medium text-slate-800">
          {nav.map((item) => (
            <li
              key={item}
              onClick={() => scrollToSection(item)}
              className="cursor-pointer py-2 px-3 rounded-lg transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
