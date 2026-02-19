import Button from "./uiComponents/Button";
import profilePic from "../assets/Profile_picture.jpeg";

export default function Home() {
  const icons = [
    {
      name: "github",
      class:
        "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 " +
        "shadow-[0_0_8px_rgba(0,0,0,0.6)] " +
        "hover:shadow-[0_0_12px_rgba(0,0,0,0.96)]",
      url: "https://github.com/Kushal57-2005/"
    },
    {
      name: "linkedin",
      class:
        "bg-[#0a66c2] " +
        "shadow-[0_0_8px_rgba(10,102,194,0.6)] " +
        "hover:shadow-[0_0_12px_rgba(10,102,194,0.96)]",
      url: "https://www.linkedin.com/in/kushalwaykole/"
    },
    {
      name: "instagram",
      class:
        "bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-700 " +
        "shadow-[0_0_8px_rgba(236,72,153,0.6)] " +
        "hover:shadow-[0_0_15px_rgba(236,72,153,0.96)]",
    },
    {
      name: "facebook",
      class:
        "bg-[#1877f2] " +
        "shadow-[0_0_8px_rgba(59,130,246,0.6)] " +
        "hover:shadow-[0_0_12px_rgba(59,130,246,0.96)]",
    },
  ];

  return (
    <div id="home" className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-4 px-6 md:px-16 py-20 md:py-0 overflow-hidden">
      {/* Text content */}
      <div className="flex flex-col gap-2 md:w-1/2 items-center md:items-start text-center md:text-left z-10">
        <h3 className="text-lg md:text-xl font-medium">Hello, I'm</h3>

        <h1
          className="text-4xl md:text-5xl font-bold text-slate-900"
          style={{ letterSpacing: "3px" }}
        >
          Kushal
        </h1>

        <h3 className="text-lg md:text-xl text-slate-600">
          And I'm a <span className="text-blue-600">Front-end Developer</span>
        </h3>
        <h3 className="text-base md:text-xl text-slate-500 max-w-md">
          I design and build engaging digital experiences that are simple, fast,
          and user-friendly.
        </h3>
        <ul className="flex flex-row gap-2 md:gap-3 text-4xl my-4">
          {icons.map((icon, index) => (
            <li key={index} className="p-1.5 md:p-2 rounded-full">
              <a href={icon.url || "#"} target="_blank" rel="noopener noreferrer">
                <div
                  className={`w-11 h-11 md:w-14 md:h-14 ${icon.class} hover:scale-110 cursor-pointer rounded-full flex items-center justify-center transition duration-300`}
                >
                  <i className={`bi bi-${icon.name} text-white text-2xl md:text-3xl`}></i>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <Button 
          text={"Download CV"} 
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/Kushal_Resume.pdf";
            link.download = "Kushal_Resume.pdf";
            link.click();
          }}
        />
      </div>

      {/* Profile picture */}
      <div className="md:w-1/2 flex items-center justify-center">
         <img
           src={profilePic}
           alt="Kushal"
           className="w-48 h-48 md:w-80 md:h-80 rounded-full object-cover shadow-[0_0_30px_rgba(0,0,0,0.3)]"
         />
      </div>
    </div>
  );
}
