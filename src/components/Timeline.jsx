/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* eslint-disable react/prop-types */
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
        <h2 className="text-2xl font-bold text-center mb-10 md:mb-16 text-blue-900">
          My Journey
        </h2>

        <div className="relative max-w-4xl mx-auto w-full pt-2 pb-8 px-4 md:px-0">
          {/* Timeline line — left side on mobile, center on desktop */}
          <div className="absolute left-6 md:left-1/2 top-0 h-full w-0.5 bg-gray-200 md:-translate-x-1/2" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-blue-600 md:-translate-x-1/2"
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

  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1],
    { clamp: true },
  );

  const y = useTransform(scrollYProgress, [start, end], [40, 0], {
    clamp: true,
  });

  return (
    <motion.div
      style={{ opacity, y }}
      className={`relative mb-12 md:mb-16 flex ml-10 md:ml-0 ${
        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
      }`}
    >
      <div className="w-full md:w-[45%] bg-blue-50 p-4 md:p-6 rounded-xl shadow-md">
        <span className="font-bold text-blue-700">{item.year}</span>

        <h3 className="text-lg md:text-xl font-semibold mt-2">{item.title}</h3>

        <p className="text-sm md:text-base text-gray-600 mt-2">{item.desc}</p>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute left-[-22px] md:left-1/2 top-6 w-3.5 h-3.5 md:w-4 md:h-4 bg-blue-600 rounded-full md:-translate-x-1/2 border-2 border-white"
      />
    </motion.div>
  );
}
