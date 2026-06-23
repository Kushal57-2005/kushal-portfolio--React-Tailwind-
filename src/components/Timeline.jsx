/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Timeline() {
  const ref = useRef(null);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    fetch("/data/timeline.json")
      .then((res) => res.json())
      .then((data) => setTimelineData(data))
      .catch((err) => console.error("Error fetching timeline:", err));
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[160vh] mb-24">
      <div className="sticky top-0 h-screen flex flex-col justify-start pt-16">

        {/* Section header */}
        <div className="text-left px-6 md:px-16 lg:px-28 mb-10 md:mb-16">
          <span className="section-label">02 / About</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span
              className="inline-block w-1 h-8 md:h-10 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            My Journey
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto w-full pt-2 pb-8 px-6 md:px-0">
          {/* Static line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 h-full w-px md:-translate-x-1/2"
            style={{ backgroundColor: "var(--border)" }}
          />

          {/* Progress line */}
          <motion.div
            style={{ height: lineHeight, backgroundColor: "var(--accent)" }}
            className="absolute left-6 md:left-1/2 top-0 w-px md:-translate-x-1/2"
          />

          {timelineData.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              total={timelineData.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, total, scrollYProgress }) {
  const start = index / total - 0.15;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [start, end], [40, 0], { clamp: true });

  return (
    <motion.div
      style={{ opacity, y }}
      className={`relative mb-12 md:mb-16 flex ml-10 md:ml-0 ${
        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Card */}
      <div
        className="w-full md:w-[45%] p-4 md:p-6 rounded-xl border"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <span
          className="font-bold text-sm font-mono-label"
          style={{ color: "var(--accent-text)" }}
        >
          {item.year}
        </span>
        <h3
          className="text-lg md:text-xl font-semibold mt-2 text-zinc-900 dark:text-zinc-100"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Dot with pulse */}
      <motion.div
        style={{ opacity, backgroundColor: "var(--accent)", borderColor: "var(--bg)" }}
        className="dot-active absolute left-[-22px] md:left-1/2 top-6 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full md:-translate-x-1/2 border-2"
      />
    </motion.div>
  );
}
