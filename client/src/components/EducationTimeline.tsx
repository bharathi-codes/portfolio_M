import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { siteData } from "@/data/data";

export default function EducationTimeline() {
  const ref = useScrollAnimation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Currently Pursuing":
        return "fas fa-play-circle text-green-500";
      case "Completed":
        return "fas fa-check-circle text-violet-500";
      default:
        return "fas fa-circle text-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Currently Pursuing":
        return "bg-green-100 text-green-700 border-green-200";
      case "Completed":
        return "bg-violet-100 text-violet-700 border-violet-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={ref}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Education
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
              Academic journey in Information Technology
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2 rounded-full shadow-sm"></div>

            {siteData.education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative flex items-center mb-12 md:mb-16"
              >
                {/* Enhanced Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white rounded-full border-4 border-violet-400 transform md:-translate-x-1/2 z-10 shadow-lg flex items-center justify-center">
                  <i className={`${getStatusIcon(item.status)} text-sm`}></i>
                </div>
                
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 
                    ? "md:pr-16 md:text-right" 
                    : "md:pl-16 md:ml-auto"
                }`}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="glass-violet rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Status Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getStatusBadge(item.status)}`}>
                      <i className={`${getStatusIcon(item.status)} mr-2 text-xs`}></i>
                      {item.status}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                      {item.degree}
                    </h3>
                    
                    <div className="flex items-center mb-2 text-violet-600">
                      <i className="fas fa-university mr-2"></i>
                      <p className="font-semibold text-sm md:text-base">
                        {item.institution}
                      </p>
                    </div>
                    
                    <div className="flex items-center mb-4 text-slate-600">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      <p className="text-sm md:text-base font-medium">
                        {item.period}
                      </p>
                    </div>
                    
                    <p className="text-slate-700 text-sm md:text-base mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    {item.highlights && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-600 mb-2">Key Focus Areas:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
