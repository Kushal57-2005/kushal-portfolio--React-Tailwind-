export default function SkillCard({ skill }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 min-w-[160px] rounded-lg border"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <img
        src={skill.src}
        alt={skill.name}
        className="w-8 h-8 object-contain"
      />
      <p className="font-medium whitespace-nowrap text-zinc-700 dark:text-zinc-300 text-sm">
        {skill.name}
      </p>
    </div>
  );
}
