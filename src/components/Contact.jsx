import { useState } from "react";
import Button from "./uiComponents/Button";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://formsubmit.co/ajax/kushalwaykole57@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await response.json();

      if (response.ok) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      setResult("Something went wrong!");
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full py-20 md:py-32 px-4 md:px-16 lg:px-28 flex flex-col justify-center">
      {/* Section header */}
      <div className="mb-10 md:mb-14">
        <span className="section-label">05 / Contact</span>
        <h2
          className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span
            className="inline-block w-1 h-8 md:h-10 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          Get In Touch
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm max-w-sm ml-5">
          Open to collaborations, freelance, or just a friendly hello.
        </p>
      </div>

      <div className="max-w-lg w-full">
        <form
          onSubmit={onSubmit}
          className="w-full p-6 md:p-8 rounded-xl border"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="mb-5">
            <label htmlFor="name" className="block text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              placeholder="Your message..."
              className="w-full px-4 py-3 rounded-lg text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-colors resize-none"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <input type="hidden" name="_subject" value="New submission from Portfolio!" />
          <input type="hidden" name="_captcha" value="false" />

          <Button text="Send Message" />

          {result && (
            <div
              className={`mt-4 text-sm font-medium ${
                result.includes("Success") ? "text-green-400" : "text-amber-400"
              }`}
            >
              {result}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}