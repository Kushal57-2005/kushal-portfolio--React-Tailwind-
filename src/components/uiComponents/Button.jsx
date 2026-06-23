export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 overflow-hidden"
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
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  );
}
