export default function SkillCard({ skill }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 min-w-45">
      <img
        src={skill.src}
        alt={skill.name}
        className="w-10 h-10 object-contain"
      />

      <p className="font-medium whitespace-nowrap">{skill.name}</p>
    </div>
  );
}
