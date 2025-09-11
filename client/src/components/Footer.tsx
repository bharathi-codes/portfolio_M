import { motion } from "framer-motion";
import { personalInfo, websiteConfig } from "@/data/website-data";

export default function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-r from-slate-900 to-violet-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-2xl font-bold gradient-text">
              {personalInfo.name}
            </div>
            <p className="text-slate-300">
              Building the future, one line of code at a time.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <i className="fab fa-github text-xl"></i>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={`mailto:${personalInfo.email}`}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <i className="fas fa-envelope text-xl"></i>
              </motion.a>
            </div>
            <div className="border-t border-slate-700 pt-6">
              <p className="text-slate-400 text-sm">
                © {websiteConfig.copyrightYear} {personalInfo.name}. {websiteConfig.footerText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
