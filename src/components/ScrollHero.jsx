/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, forwardRef, useState, useEffect } from "react";

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
            backgroundImage: "url('/src/assets/3155.jpg')",
          }}
          className="absolute inset-0 bg-cover bg-center"
        />

        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          className="
      relative z-10
      h-full
      flex items-center justify-center
      text-white text-center
    "
        >
          <motion.h1
            key={text}
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.12 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold"
          >
            {text}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
});

export default ScrollHero;
