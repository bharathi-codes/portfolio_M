import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/projects";
import { Link } from "wouter";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  linkedinUrl?: string;
  telegramUrl?: string;
  isFeatured: boolean;
}

export default function ProjectsSection() {
  const ref = useScrollAnimation();
  const [featuredProjects] = useState<Project[]>(projects.filter(project => project.isFeatured));

  return (
    <section id="projects" className="py-16 md:py-20 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              ref={ref}
              className="text-3xl md:text-4xl font-bold gradient-text"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-slate-600 mt-4 text-sm md:text-base max-w-2xl mx-auto"
            >
              Recent projects showcasing my skills and creativity
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass-violet rounded-xl p-4 md:p-6 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="bg-violet-100 text-violet-700 px-2 md:px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-slate-500 text-xs font-medium px-2 py-1">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3 md:space-x-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:text-violet-700 font-medium flex items-center text-xs md:text-sm"
                    >
                      <i className="fas fa-external-link-alt mr-1"></i>
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </a>
                  )}
                  {project.telegramUrl && (
                    <a
                      href={project.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 font-medium flex items-center text-xs md:text-sm"
                    >
                      <i className="fab fa-telegram mr-1"></i>
                      <span className="hidden sm:inline">Telegram</span>
                      <span className="sm:hidden">Bot</span>
                    </a>
                  )}
                  {project.linkedinUrl && (
                    <a
                      href={project.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 font-medium flex items-center text-xs md:text-sm"
                    >
                      <i className="fab fa-linkedin mr-1"></i>
                      <span className="hidden sm:inline">LinkedIn</span>
                      <span className="sm:hidden">Post</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-700 font-medium flex items-center text-xs md:text-sm"
                    >
                      <i className="fab fa-github mr-1"></i>
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-full font-medium hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <span className="hidden md:inline">View All Projects</span>
                <span className="md:hidden">All Projects</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
