import Button from "./uiComponents/Button";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  const icons = [
    {
      name: "github",
      class:
        "bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500",
      url: "https://github.com/Kushal57-2005/",
    },
    {
      name: "linkedin",
      class:
        "bg-[#0a66c2] border border-transparent",
      url: "https://www.linkedin.com/in/kushalwaykole/",
    },
    {
      name: "instagram",
      class:
        "bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-700 border border-transparent",
      url: "https://www.instagram.com/",
    },
    {
      name: "facebook",
      class:
        "bg-[#1877f2] border border-transparent",
      url: "https://www.facebook.com/",
    },
  ];

  return (
    <div
      id="home"
      className="relative min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-4 px-6 md:px-16 lg:px-28 py-24 md:py-0 overflow-hidden"
    >
      {/* Left — text block */}
      <div className="flex flex-col gap-3 md:w-[55%] items-start text-left z-10">

        {/* Section label */}
        <span className="section-label">01 / Intro</span>

        {/* Greeting */}
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-medium">
          Hello, I'm
        </p>

        {/* Name — huge */}
        <h1
          className="text-zinc-900 dark:text-zinc-100 font-extrabold leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Kushal
        </h1>

        {/* Role */}
        <h2 className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium mt-1">
          Full Stack{" "}
          <span style={{ color: "var(--accent-text)" }}>MERN Developer</span>
        </h2>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-md leading-relaxed mt-1">
          I design and develop scalable web applications with modern
          technologies, ensuring performance, usability, and seamless user
          experience.
        </p>

        {/* Social icons */}
        <ul className="flex flex-row gap-2 md:gap-3 my-4">
          {icons.map((icon, index) => (
            <li key={index}>
              <a href={icon.url || "#"} target="_blank" rel="noopener noreferrer">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 ${icon.class} hover:scale-110 cursor-pointer rounded-xl flex items-center justify-center transition-all duration-200`}
                >
                  <i className={`bi bi-${icon.name} ${icon.name === "github" ? "text-zinc-800 dark:text-white" : "text-white"} text-lg md:text-xl`} />
                </div>
              </a>
            </li>
          ))}
        </ul>

        <Button
          text={"Download CV"}
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/KushalCV.pdf";
            link.download = "KushalCV.pdf";
            link.click();
          }}
        />
      </div>

      {/* Right — Lottie */}
      <div className="md:w-[40%] flex items-center justify-center md:justify-end">
        <Player
          src="/profile.json"
          autoplay
          loop
          style={{ width: "340px", height: "340px" }}
        />
      </div>
    </div>
  );
}
