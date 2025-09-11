import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { certificates, type Certificate } from "@/data/certificates";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AllCertificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mb-6 text-violet-600 hover:text-violet-700 font-medium flex items-center justify-center mx-auto transition-colors"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Home
                </motion.button>
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                All Certificates
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A comprehensive collection of my certifications, achievements, and professional development milestones.
              </p>
            </motion.div>

            {/* Certificates Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => openModal(cert)}
                >
                  <div className="glass-violet rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Certificate Image */}
                    <div className="relative mb-4 overflow-hidden rounded-lg bg-white border border-slate-200">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-48 object-contain bg-white transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>

                    {/* Certificate Info */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-2">
                        {cert.title}
                      </h3>
                      
                      <div className="flex items-center text-violet-600 text-sm">
                        <i className="fas fa-building mr-2"></i>
                        <span className="font-medium">{cert.issuer}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-600 text-sm">
                          <i className="fas fa-calendar-alt mr-2"></i>
                          <span>{cert.year}</span>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-violet-600 hover:text-violet-700 p-2 rounded-full hover:bg-violet-100 transition-colors"
                          aria-label="View certificate details"
                        >
                          <i className="fas fa-eye"></i>
                        </motion.button>
                      </div>
                      
                      {cert.credentialUrl && (
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-violet-600 hover:text-violet-700 font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fas fa-external-link-alt mr-2"></i>
                          View Credential
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    {selectedCert.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-slate-600">
                    <div className="flex items-center">
                      <i className="fas fa-building mr-2 text-violet-600"></i>
                      <span className="font-medium">{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-calendar-alt mr-2 text-violet-600"></i>
                      <span>{selectedCert.year}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-certificate mr-2 text-violet-600"></i>
                      <span className="text-sm">{selectedCert.certificateId}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="ml-4 p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-xl"></i>
                </motion.button>
              </div>

              {/* Certificate Image */}
              <div className="mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-full max-h-[60vh] object-contain rounded-lg bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {selectedCert.credentialUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors font-medium"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    View Credential
                  </motion.a>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.open(selectedCert.imageUrl, '_blank')}
                  className="flex items-center px-6 py-3 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-colors font-medium"
                >
                  <i className="fas fa-expand-alt mr-2"></i>
                  View Full Size
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
