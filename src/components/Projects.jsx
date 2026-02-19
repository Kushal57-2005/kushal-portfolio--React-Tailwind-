/* eslint-disable no-unused-vars */
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Projects() {
  const ref = useRef(null);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [skillMap, setSkillMap] = useState({});

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        if (data.length > 0) {
          setCurrentProject(data[0]);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));

    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((skill) => {
          map[skill.name] = skill.src;
        });
        setSkillMap(map);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      const SCROLL_PER_PROJECT = 200;
      const totalVh = projects.length * SCROLL_PER_PROJECT + 100;
      const stickyVh = projects.length * SCROLL_PER_PROJECT;
      const stickyRatio = stickyVh / totalVh;

      let progress = v / stickyRatio;
      if (progress > 1) progress = 1;

      const index = Math.min(
        Math.floor(progress * projects.length),
        projects.length - 1,
      );

      setCurrentProject(projects[index]);
    });

    return () => unsubscribe();
  }, [scrollYProgress, projects]);

  if (!currentProject) return null;

  return (
    <section
      ref={ref}
      id="projects"
      className="relative"
      style={{ height: `${projects.length * 200 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center p-4">
        <AnimatePresence>
          <motion.div
            key={currentProject.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 p-4 bg-neutral-100"
          >
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-900 mb-1 md:mb-2">
              {currentProject.name}
            </h1>

            {/* Content: Skills + Image */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-6xl px-4">
              {/* Skills */}
              <ul className="flex flex-row md:flex-col gap-3 flex-wrap justify-center shrink-0">
                {currentProject.skills.map((skill, index) => (
                  <li key={index} className="group relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-9 md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-2 md:-translate-x-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      {skill}
                    </div>
                    <img
                      src={
                        skillMap[skill] ||
                        `/skills/${skill.toLowerCase()}.png`
                      }
                      alt={skill}
                      className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-transform cursor-pointer drop-shadow-md"
                    />
                  </li>
                ))}
              </ul>

              {/* Image */}
              <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <img
                  src={currentProject.image}
                  alt={currentProject.name}
                  className="max-w-full md:max-w-[75%] max-h-[50vh] md:max-h-[65vh] w-auto h-auto rounded-lg md:rounded-xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-[1.02]"
                />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
