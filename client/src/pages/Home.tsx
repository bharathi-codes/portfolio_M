import Navigation from "@/components/Navigation";
import FloatingResumeButton from "@/components/FloatingResumeButton";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationTimeline from "@/components/EducationTimeline";
import SkillsCarousel from "@/components/SkillsCarousel";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import FloatingChatbot from "@/components/FloatingChatbot";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full scroll-container">
      <Navigation />
      <FloatingResumeButton />
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <EducationTimeline />
        <SkillsCarousel />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  );
}
