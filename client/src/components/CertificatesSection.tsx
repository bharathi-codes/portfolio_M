import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { certificates, type Certificate } from "@/data/certificates";

export default function CertificatesSection() {
  const ref = useScrollAnimation();
  const [certificatesList] = useState<Certificate[]>(certificates);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create multiple duplications for seamless loop
  const duplicatedCertificates = [
    ...certificatesList, 
    ...certificatesList, 
    ...certificatesList
  ];

  // Calculate responsive duration and card width based on screen size
  const getAnimationSettings = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) {
        return { duration: 30, cardWidth: 240 }; // Mobile - slower, smaller cards
      }
      if (width < 1024) {
        return { duration: 35, cardWidth: 300 }; // Tablet - medium
      }
      return { duration: 40, cardWidth: 360 }; // Desktop - faster, larger cards
    }
    return { duration: 35, cardWidth: 280 };
  };

  const { duration, cardWidth } = getAnimationSettings();

  const openModal = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <section id="certificates" className="py-20 bg-gradient-to-br from-slate-50 to-violet-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-16">
              Certificates & Achievements
            </h2>
          </motion.div>

          <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-violet-50 to-transparent z-10 pointer-events-none"></div>
            
            <motion.div
              animate={{ x: [0, -(cardWidth + 16) * certificates.length] }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex space-x-4 md:space-x-6"
              style={{ width: 'max-content' }}
            >
              {duplicatedCertificates.map((cert, index) => (
                <motion.div
                  key={`${cert.id}-${index}`}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => openModal(cert)}
                  className="flex-shrink-0 glass-violet rounded-xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  style={{ width: cardWidth }}
                >
                  <div className="mb-3 md:mb-4 overflow-hidden rounded-lg relative group bg-white shadow-sm">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-32 md:h-48 object-contain bg-white"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-base"
                      >
                        <i className="fas fa-eye mr-1 md:mr-2"></i>
                        <span className="hidden md:inline">View Details</span>
                        <span className="md:hidden">View</span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-sm md:text-xl font-semibold text-slate-800 line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center">
                      <i className="fas fa-award text-violet-500 mr-1 md:mr-2 text-sm"></i>
                      <p className="text-violet-600 font-medium text-xs md:text-base line-clamp-1">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-calendar text-slate-400 mr-1 md:mr-2 text-sm"></i>
                      <p className="text-slate-600 text-xs md:text-sm">
                        {cert.year}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-id-card text-slate-400 mr-1 md:mr-2 text-sm"></i>
                      <p className="text-slate-600 text-xs md:text-sm font-mono">
                        {cert.certificateId}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-4 flex items-center justify-between">
                    <span className="text-xs text-violet-500 font-medium bg-violet-100 px-2 py-1 rounded-full">
                      <span className="hidden md:inline">Certificate</span>
                      <span className="md:hidden">Cert</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-600 transition-colors text-sm"
                          title="Verify Credential"
                        >
                          <i className="fas fa-shield-alt"></i>
                        </a>
                      )}
                      <i className="fas fa-external-link-alt text-slate-400 hover:text-violet-500 transition-colors text-sm"></i>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievement stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-16"
          >
            <div className="flex flex-wrap justify-center md:grid md:grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
              <div className="glass-violet rounded-lg p-3 md:p-4 flex-1 min-w-[100px] max-w-[120px] md:max-w-none text-center">
                <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
                  {certificates.length}+
                </div>
                <div className="text-slate-600 text-xs md:text-sm">
                  <span className="hidden md:inline">Certificates Earned</span>
                  <span className="md:hidden">Certs</span>
                </div>
              </div>
              <div className="glass-violet rounded-lg p-3 md:p-4 flex-1 min-w-[100px] max-w-[120px] md:max-w-none text-center">
                <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
                  {new Set(certificates.map(cert => cert.issuer)).size}+
                </div>
                <div className="text-slate-600 text-xs md:text-sm">
                  <span className="hidden md:inline">Trusted Issuers</span>
                  <span className="md:hidden">Issuers</span>
                </div>
              </div>
              <div className="glass-violet rounded-lg p-3 md:p-4 flex-1 min-w-[100px] max-w-[120px] md:max-w-none text-center">
                <div className="text-lg md:text-2xl font-bold gradient-text mb-1">
                  2024
                </div>
                <div className="text-slate-600 text-xs md:text-sm">
                  <span className="hidden md:inline">Latest Achievement</span>
                  <span className="md:hidden">Latest</span>
                </div>
              </div>
            </div>
            
            {/* View All Certificates Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link href="/certificates">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-violet-600 text-white px-8 py-3 rounded-full hover:bg-violet-700 transition-colors font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                >
                  <i className="fas fa-certificate mr-2"></i>
                  View All Certificates
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold gradient-text">
                  {selectedCert.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-slate-500 hover:text-slate-700 text-xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full rounded-lg shadow-lg bg-white border border-slate-200"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Issuer</h4>
                    <p className="text-violet-600 font-medium">
                      {selectedCert.issuer}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Year</h4>
                    <p className="text-slate-600">
                      {selectedCert.year}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Certificate ID</h4>
                    <p className="text-slate-600 font-mono text-sm">
                      {selectedCert.certificateId}
                    </p>
                  </div>
                  {selectedCert.credentialUrl && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Verify Credential</h4>
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Verify Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
