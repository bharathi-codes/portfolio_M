import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { siteData } from "@/data/data";
import OptimizedImage from "@/components/OptimizedImage";

export default function HeroSection() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Hide cursor after typewriter animation completes (1s delay + 2.5s animation = 3.5s total)
    const timer = setTimeout(() => {
      setShowCursor(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative w-full overflow-hidden pt-16 md:pt-20 px-0"
      aria-label="Hero section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 w-full overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-0 md:left-4 w-48 h-48 md:w-72 md:h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute top-32 md:top-40 right-0 md:right-4 w-64 h-64 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
          className="absolute bottom-20 left-1/4 md:left-1/3 w-56 h-56 md:w-80 md:h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      <div className="w-full px-4 text-center relative z-10 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden glass-violet p-1 relative"
          >
            <OptimizedImage
              src={siteData.photo}
              alt={`${siteData.name} - Frontend Developer and AI Enthusiast`}
              className="w-full h-full rounded-full"
              width={160}
              height={160}
              loading="eager"
              objectFit="cover"
            />
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-3 md:space-y-4"
          >
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold">
              <span className="gradient-text">Hi, I'm {siteData.name}</span>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className={`text-lg md:text-2xl text-slate-600 font-light text-center px-4 ${showCursor ? 'typewriter-cursor' : ''}`}
              role="text"
              aria-label={siteData.role}
            >
              <span className="inline-block max-w-full break-words">
                {siteData.role}
              </span>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-4"
          >
            Building aesthetic digital experiences with passion for innovation and user-centered design.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex justify-center space-x-4 md:space-x-6"
            role="list"
            aria-label="Social media links"
          >
            <motion.a
              whileHover={{ scale: 1.08, y: -3 }}
              href={siteData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 glass-violet rounded-full flex items-center justify-center text-slate-600 hover:text-violet-600 hover:bg-violet-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              aria-label="Visit GitHub profile"
              role="listitem"
            >
              <i className="fab fa-github text-lg md:text-xl" aria-hidden="true"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.08, y: -3 }}
              href={siteData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 glass-violet rounded-full flex items-center justify-center text-slate-600 hover:text-violet-600 hover:bg-violet-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              aria-label="Visit LinkedIn profile"
              role="listitem"
            >
              <i className="fab fa-linkedin text-lg md:text-xl" aria-hidden="true"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.08, y: -3 }}
              href={`mailto:${siteData.email}`}
              className="w-10 h-10 md:w-12 md:h-12 glass-violet rounded-full flex items-center justify-center text-slate-600 hover:text-violet-600 hover:bg-violet-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              aria-label={`Send email to ${siteData.email}`}
              role="listitem"
            >
              <i className="fas fa-envelope text-lg md:text-xl" aria-hidden="true"></i>
            </motion.a>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-6"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/Bharathi%20B-Resume.pdf"
              download="Bharathi-B-Resume.pdf"
              className="inline-flex items-center px-6 py-3 glass-violet text-slate-600 hover:text-violet-600 hover:bg-violet-100 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
              aria-label="Download Bharathi's resume"
            >
              <i className="fas fa-download mr-2 text-lg" aria-hidden="true"></i>
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
