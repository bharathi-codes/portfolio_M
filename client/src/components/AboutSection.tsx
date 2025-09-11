import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { siteData } from "@/data/data";

export default function AboutSection() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-br from-violet-50 via-white to-slate-50 w-full">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          <motion.div
            ref={ref}
          >
            <h2 className="text-2xl md:text-4xl font-bold gradient-text">
              About Me
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-violet rounded-2xl p-6 md:p-12"
          >
            <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-slate-700 leading-relaxed">
              <p className="whitespace-pre-wrap">{siteData.aboutText}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
