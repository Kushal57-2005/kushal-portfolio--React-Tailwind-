/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Grid span map for bento layout (4-column grid)
const gridSpans = [
  { col: "1 / span 2", row: "1 / span 2" }, // [0] Featured: 2×2
  { col: "3 / span 2", row: "1 / span 1" }, // [1] Wide top-right
  { col: "1 / span 1", row: "3 / span 1" }, // [2] Small
  { col: "2 / span 1", row: "3 / span 1" }, // [3] Small
  { col: "3 / span 2", row: "2 / span 1" }, // [4] Wide bottom-right
  { col: "3 / span 2", row: "3 / span 1" }, // [5] Wide bottom-right
];

function ProjectCard({ project, skillMap, index }) {
  const span = gridSpans[index];
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg col-span-1"
      style={{
        minHeight: index === 0 ? "420px" : "220px",
        gridColumn: span?.col,
        gridRow: span?.row,
      }}
    >
      {/* Screenshot background */}
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      {/* Static dark gradient at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Static title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-0 group-hover:translate-y-2 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
          {project.name}
        </h3>
        <p className="text-white/60 text-xs mt-0.5 flex gap-1 flex-wrap">
          {project.skills.slice(0, 3).map((s, i) => (
            <span key={i}>{s}{i < Math.min(project.skills.length, 3) - 1 ? " ·" : ""}</span>
          ))}
        </p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-indigo-900/90 to-violet-900/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-5 z-20">
        <h3 className="text-white font-bold text-xl text-center leading-snug">
          {project.name}
        </h3>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 justify-center">
          {project.skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1"
            >
              <img
                src={skillMap[skill] || `/skills/${skill.toLowerCase()}.png`}
                alt={skill}
                className="w-4 h-4 object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="text-white/90 text-xs font-medium">{skill}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-1 flex items-center gap-2 bg-white text-blue-900 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-blue-50 active:scale-95 transition-all shadow-xl"
        >
          <span>View Live</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
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
    <section id="projects" className="py-20 px-4 md:px-10 lg:px-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-12"
      >
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          My Projects
        </h2>
        <p className="mt-3 text-slate-500 text-base max-w-lg mx-auto">
          A collection of things I've built — hover to explore the tech stack.
        </p>
        <div className="mt-4 mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-600" />
      </motion.div>

      {/* Bento grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        style={{ gridTemplateRows: "280px 200px 200px" }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            skillMap={skillMap}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
}
