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

  if (skills.length === 0) return null; // Or a loading state

  return (
    <div id="skills" className="w-full overflow-hidden py-6 justify-center items-center text-center mt-6 md:mt-10">
      <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">What I Do</h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll gap-6">
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
