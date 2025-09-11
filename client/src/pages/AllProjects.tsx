import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/projects";
import type { ProjectData } from "@/data/projects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AllProjects() {
  const [projectsList] = useState(projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");

  useEffect(() => {
    filterProjects();
  }, [projectsList, searchTerm, selectedTech]);

  const filterProjects = () => {
    let filtered = projectsList;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTech) {
      filtered = filtered.filter(project =>
        project.techStack.some(tech => 
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  };

  const getAllTechnologies = () => {
    const allTech = projectsList.flatMap(project => project.techStack);
    return Array.from(new Set(allTech));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50 w-full overflow-x-hidden">
      <Navigation />
      
      <main className="pt-20 w-full">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold gradient-text mb-4"
              >
                All Projects
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 text-lg max-w-2xl mx-auto"
              >
                Explore my complete portfolio of projects and experiments. Each project represents a step in my journey as a developer, showcasing different technologies and problem-solving approaches.
              </motion.p>
            </div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 mb-8"
            >
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:max-w-sm"
                aria-label="Search projects"
              />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
                aria-label="Filter by technology"
              >
                <option value="">All Technologies</option>
                {getAllTechnologies().map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <i className="fas fa-arrow-left" aria-hidden="true"></i>
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass-violet rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  {project.isFeatured && (
                    <div className="inline-block bg-violet-500 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                      Featured
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-slate-800 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:text-violet-700 font-medium flex items-center transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <i className="fas fa-external-link-alt mr-1" aria-hidden="true"></i>
                        Live Demo
                      </a>
                    )}
                    {project.telegramUrl && (
                      <a
                        href={project.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 font-medium flex items-center transition-colors"
                        aria-label={`Open ${project.title} on Telegram`}
                      >
                        <i className="fab fa-telegram mr-1" aria-hidden="true"></i>
                        Telegram
                      </a>
                    )}
                    {project.linkedinUrl && (
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 font-medium flex items-center transition-colors"
                        aria-label={`View ${project.title} on LinkedIn`}
                      >
                        <i className="fab fa-linkedin mr-1" aria-hidden="true"></i>
                        LinkedIn
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-700 font-medium flex items-center transition-colors"
                        aria-label={`View source code of ${project.title} on GitHub`}
                      >
                        <i className="fab fa-github mr-1" aria-hidden="true"></i>
                        Code
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <i className="fas fa-search text-4xl text-slate-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No projects found</h3>
                  <p className="text-slate-600">
                    No projects found matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTech("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
