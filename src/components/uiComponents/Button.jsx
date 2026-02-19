export default function Button({ text, onClick }) {
  return (
    <div>
      <button onClick={onClick} className="px-6 py-2 rounded-xl text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:shadow-[0_0_15px_rgba(37,99,235,0.8)] hover:opacity-90 transition w-auto">
        {text}
      </button>
    </div>
  );
}
