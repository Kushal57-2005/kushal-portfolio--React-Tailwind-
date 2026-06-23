import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [nav, setNav] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <div className="fixed top-4 left-0 z-50 w-full px-4 md:px-8">
      <div
        className="backdrop-blur-md border shadow-2xl rounded-full px-5 py-2.5 md:px-8 md:py-3 flex justify-between items-center w-full"
        style={{
          backgroundColor: "var(--bg-nav)",
          borderColor: "var(--border)",
        }}
      >
        <h1
          className="text-lg md:text-xl font-bold cursor-pointer tracking-wide"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--accent-text)" }}
          onClick={() => scrollToSection("home")}
        >
          KUSHAL
        </h1>

        {/* Right Section: Desktop Nav + Theme Toggle + Mobile Hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop nav */}
          <ul className="hidden md:flex gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {nav.map((item) => (
              <li
                key={item}
                onClick={() => scrollToSection(item)}
                className="cursor-pointer transition-colors duration-200 hover:text-zinc-900 dark:hover:text-zinc-100 relative group"
              >
                {item}
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              // Sun icon (outline)
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              // Moon icon (outline)
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-zinc-500 dark:bg-zinc-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-zinc-500 dark:bg-zinc-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-zinc-500 dark:bg-zinc-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 mt-2" : "max-h-0"}`}>
        <ul
          className="backdrop-blur-md border shadow-2xl rounded-2xl px-5 py-4 flex flex-col gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400"
          style={{ backgroundColor: "var(--bg-nav-mobile)", borderColor: "var(--border)" }}
        >
          {nav.map((item) => (
            <li
              key={item}
              onClick={() => scrollToSection(item)}
              className="cursor-pointer py-2 px-3 rounded-lg transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-100 active:opacity-70"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
