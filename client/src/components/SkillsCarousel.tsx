import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { siteData } from "@/data/data";

export default function SkillsCarousel() {
  const ref = useScrollAnimation();
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Create multiple duplications for seamless loop
  const duplicatedSkills = [
    ...siteData.skills, 
    ...siteData.skills, 
    ...siteData.skills,
    ...siteData.skills
  ];

  // Calculate responsive duration based on screen size
  const getAnimationDuration = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 20; // Mobile - slower
      if (width < 1024) return 25; // Tablet - medium
      return 30; // Desktop - faster
    }
    return 25;
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-violet-50 to-pink-50 w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-12 md:mb-16">
            Technical Skills
          </h2>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-16 md:w-20 h-full bg-gradient-to-r from-violet-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 md:w-20 h-full bg-gradient-to-l from-pink-50 to-transparent z-10 pointer-events-none"></div>
          
          <motion.div
            animate={{ x: [0, -35 * duplicatedSkills.length] }}
            transition={{
              duration: getAnimationDuration(),
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex space-x-2 md:space-x-4 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={`${skill.id}-${index}`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredSkill(index)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="flex-shrink-0 relative"
              >
                <div className="glass-violet rounded-full px-3 py-2 md:px-5 md:py-3 hover:bg-violet-100 transition-all duration-300 cursor-pointer min-w-[80px] md:min-w-[110px] flex items-center justify-center">
                  <span className="text-slate-700 font-medium flex items-center whitespace-nowrap text-xs md:text-sm">
                    <i className={`${skill.icon} mr-1 md:mr-2 text-violet-500 text-sm md:text-base`}></i>
                    <span className="hidden sm:inline">{skill.name}</span>
                    <span className="sm:hidden">{skill.name.length > 5 ? skill.name.substring(0, 5) + '...' : skill.name}</span>
                  </span>
                </div>

                {/* Skill details tooltip - only show on desktop */}
                <AnimatePresence>
                  {hoveredSkill === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="hidden md:block absolute -top-12 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div className="glass-violet rounded-lg px-3 py-1 shadow-lg">
                        <p className="text-xs text-slate-600 font-medium">
                          {skill.category}
                        </p>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-violet-200"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 max-w-2xl mx-auto">
            Proficient in {siteData.skills.length}+ technologies across frontend, backend, 
            design, and cloud platforms. Always learning and exploring new tools to build better experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
