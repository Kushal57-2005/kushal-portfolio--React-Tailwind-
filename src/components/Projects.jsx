/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

// Dashboard UIs crop to top header; banner/hero projects crop to center
const objectPositions = [
  "top", // Tiffinwala — show header bar, avoid lower dense content
  "top", // FitAI — show stats header
  "center", // IcyCool — open banner, center is perfect
  "center", // BookMyEvent — hero banner
  "top", // CPU Scheduler
  "top", // Basic Portfolio
];

function ProjectCard({ project, skillMap, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* ── Image area — fixed 16:9, uniform height across all cards ── */}
      <div
        className="group relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", backgroundColor: "var(--bg-image-container)" }}
      >
        {/* Screenshot — covers the 16:9 box, cropped to objectPosition */}
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
          style={{ objectPosition: objectPositions[index] }}
        />

        {/* Hover overlay — dims image, shows tech chips */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-5"
          style={{
            backgroundColor: "rgba(10,10,15,0.55)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Lime top-border flash */}
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ backgroundColor: "#d4ff4f" }}
          />

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {project.skills.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 "
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  backgroundColor: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <img
                  src={skillMap[skill] || `/skills/${skill.toLowerCase()}.png`}
                  alt={skill}
                  className="w-4 h-4 object-contain opacity-80"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="text-zinc-400 text-xs font-medium">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Info strip ─────────────────────────────────────── */}
      <div
        className="flex items-center justify-between gap-4 px-4 py-3"
        style={{
          backgroundColor: "var(--bg-card)",
          borderTop: "1px solid var(--border)",
          borderLeft: "3px solid var(--accent)",
        }}
      >
        {/* Left: name + skills */}
        <div className="min-w-0">
          <h3
            className="text-zinc-900 dark:text-zinc-100 font-bold text-base leading-tight truncate"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.name}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 truncate">
            {project.skills.join(" · ")}
          </p>
        </div>

        {/* Right: View Live button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
          style={{
            border: "1px solid var(--accent)",
            color: "var(--accent-text)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.color = "#0a0a0f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--accent-text)";
          }}
        >
          View Live
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [skillMap, setSkillMap] = useState({});

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => console.error("Error fetching projects:", err));

    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((skill) => (map[skill.name] = skill.src));
        setSkillMap(map);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-10 lg:px-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-12 px-2 md:px-6"
      >
        <span className="section-label">04 / Work</span>
        <h2
          className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span
            className="inline-block w-1 h-8 md:h-10 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          My Projects
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm max-w-md ml-5">
          Hover any screenshot to explore the tech stack.
        </p>
      </motion.div>

      {/* Project cards — 2-column grid, full screenshots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            skillMap={skillMap}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
