/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, forwardRef, useState, useEffect } from "react";
import bgImage from "../assets/3155.jpg";

const greetings = [
  "Hello 👋",
  "नमस्ते 🙏",
  "Hola 👋",
  "Bonjour 👋",
  "Hi, I'm Kushal 🚀 ",
];

const ScrollHero = forwardRef((props, externalRef) => {
  const localRef = useRef(null);
  const ref = externalRef || localRef;

  const [text, setText] = useState(greetings[0]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgProgress = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  const bgBlur = useTransform(bgProgress, [0, 1], ["blur(0px)", "blur(8px)"]);
  const bgScale = useTransform(bgProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const speed = 1;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const boosted = v * speed;
      const index = Math.floor(boosted * greetings.length);
      setText(greetings[Math.min(index, greetings.length - 1)]);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={ref} style={{ height: "400vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{
            filter: bgBlur,
            scale: bgScale,
            backgroundImage: `url(${bgImage})`,
          }}
          className="absolute inset-0 bg-cover bg-center"
        />

        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Bottom fade into dark bg */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />

        <motion.div className="relative z-10 h-full flex items-center justify-center text-white text-center px-6">
          <div>
            <p className="section-label mb-4" style={{ color: "var(--accent-text)" }}>
              00 / Welcome
            </p>
            <motion.h1
              key={text}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-zinc-100"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.8rem, 10vw, 7rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {text}
            </motion.h1>
            <p className="mt-4 text-zinc-400 text-sm tracking-widest uppercase font-mono-label">
              scroll to continue
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default ScrollHero;
