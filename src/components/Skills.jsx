import { useState, useEffect } from "react";
import SkillCard from "./cards/SkillCard";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  if (skills.length === 0) return null;

  return (
    <div id="skills" className="w-full py-20 md:py-28">
      {/* Section header */}
      <div className="px-6 md:px-16 lg:px-28 mb-10">
        <span className="section-label">03 / Skills</span>
        <h2
          className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span
            className="inline-block w-1 h-8 md:h-10 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          What I Work With
        </h2>
      </div>

      {/* Marquee with fade edges */}
      <div className="relative w-full overflow-hidden fade-edges">
        <div className="flex w-max animate-scroll gap-2">
          {skills.map((skill, index) => (
            <SkillCard key={`a-${index}`} skill={skill} />
          ))}
          {skills.map((skill, index) => (
            <SkillCard key={`b-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
