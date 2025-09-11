import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData } from "@/data/website-data";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = navigationData;

  const scrollToSection = (href: string) => {
    if (location !== "/") {
      // If not on home page, navigate to home first, then scroll
      window.location.href = `/${href}`;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isExternal) {
      // Let the Link component handle external navigation
      return;
    } else {
      scrollToSection(item.href);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-violet backdrop-blur-lg shadow-lg"
          : "glass-violet backdrop-blur-lg"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Bharathi's Portfolio - Home"
            >
              Bharathi
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              if (item.isExternal) {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-slate-700 hover:text-violet-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded-md px-3 py-2"
                      aria-label={`Navigate to ${item.name}`}
                    >
                      {item.name}
                    </motion.button>
                  </Link>
                );
              }
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className="text-slate-700 hover:text-violet-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded-md px-3 py-2"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </button>
              );
            })}
            
            {/* Projects Page Link */}
            {location === "/" && (
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-violet-500 text-white px-6 py-2 rounded-full hover:bg-violet-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ml-2"
                  aria-label="View all projects"
                >
                  All Projects
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 p-2 rounded-md hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <i 
              className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
              aria-hidden="true"
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 space-y-3 overflow-hidden"
            >
              {navItems.map((item) => (
                item.isExternal ? (
                  <Link key={item.name} href={item.href}>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left py-3 px-2 text-slate-700 hover:text-violet-600 hover:bg-violet-50 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      aria-label={`Navigate to ${item.name} page`}
                    >
                      {item.name}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                    className="block w-full text-left py-3 px-2 text-slate-700 hover:text-violet-600 hover:bg-violet-50 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                  </button>
                )
              ))}
              
              {/* Mobile Projects Page Link */}
              {location === "/" && (
                <Link href="/projects">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="block w-full text-left py-3 px-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 mt-2"
                    aria-label="View all projects"
                  >
                    All Projects
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
