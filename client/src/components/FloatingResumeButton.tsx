import { motion } from "framer-motion";
import { useState } from "react";
import { siteData } from "@/data/data";
import { useToast } from "@/hooks/use-toast";

export default function FloatingResumeButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Check if the resume URL exists
      const response = await fetch(siteData.socialLinks.resumeUrl, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('Resume file not found');
      }

      // Create a temporary link to download the resume
      const link = document.createElement("a");
      link.href = siteData.socialLinks.resumeUrl;
      link.download = "BHARATHI-Resume.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Resume Downloaded",
        description: "Thank you for downloading my resume!",
      });

    } catch (error) {
      console.error('Resume download failed:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Unable to download resume. Please try again later.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      disabled={isDownloading}
      className="fixed top-24 right-4 md:top-28 md:right-8 z-40 glass-violet px-3 py-2 md:px-4 md:py-3 rounded-full text-violet-600 font-medium hover:bg-violet-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl animate-float focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 text-sm md:text-base"
      aria-label="Download Bharathi's resume"
    >
      {isDownloading ? (
        <>
          <i className="fas fa-spinner fa-spin mr-1 md:mr-2 text-sm md:text-base" aria-hidden="true"></i>
          <span className="hidden md:inline">Downloading...</span>
          <span className="md:hidden text-xs">...</span>
        </>
      ) : (
        <>
          <i className="fas fa-download mr-1 md:mr-2 text-sm md:text-base" aria-hidden="true"></i>
          <span className="hidden md:inline">Resume</span>
          <span className="md:hidden text-xs font-semibold">CV</span>
        </>
      )}
    </motion.button>
  );
}
