// ================================
// WEBSITE CONTENT DATA
// ================================
// Edit this file to update all website content easily
// All text, links, and configurations are centralized here

// ================================
// PERSONAL INFORMATION
// ================================
export const personalInfo = {
  // Basic Details
  name: "Bharathi B.",
  role: "Pre-Final Year Student 🎓 | Aspiring Software Engineer",
  tagline: "Building aesthetic digital experiences with passion for innovation and user-centered design.",
  
  // Contact Information
  email: "bharathii54123@gmail.com",
  phone: "", // Leave empty to hide phone number
  location: "Tamil Nadu, India",
  
  // Profile
  photo: "/images/profile.jpg",
  aboutText: "Currently pursuing a B.Tech in Information Technology at Kongunadu College of Engineering and Technology (2023-2027). My academic journey began at The Modern Academy Matric Hr. Sec. School, where I completed both my Secondary (2021) and Higher Secondary Education (2023) with a strong foundation in Mathematics and Computer Science. My path has been more than lectures and labs — it's a blend of hands-on projects, real-world problem-solving, and self-driven learning beyond the syllabus. Throughout this journey, I've built solid expertise in software development, database management, web technologies, and AI concepts. Alongside academics, I've actively explored tech fests, workshops, and coding challenges — sharpening both technical skills and teamwork abilities.",
  interests: "Passionate about software development, AI, and system design. Aiming to build innovative solutions, sharpen technical skills, and grow as a creative problem solver.",
  
  // Social Links
  socialLinks: {
    github: "https://github.com/txb1y",
    linkedin: "https://www.linkedin.com/in/bharathi54123",
    resumeUrl: "/Bharathi%20B-Resume.pdf",
    email: "mailto:bharathii54123@gmail.com"
  }
};

// ================================
// EDUCATION DATA
// ================================
export const educationData = [
  {
    id: 1,
    degree: "B.Tech in Information Technology",
    institution: "Kongunadu College of Engineering and Technology",
    period: "2023 - 2027",
    status: "Currently Pursuing",
    description: "Pursuing Information Technology with focus on software development, web technologies, and AI concepts.",
    highlights: ["Software Development", "Web Technologies", "AI & Machine Learning"]
  },
  {
    id: 2,
    degree: "Higher Secondary Education (Class 12)",
    institution: "The Modern Academy Matric Hr. Sec. School",
    period: "2022 - 2023",
    status: "Completed",
    description: "Completed with focus on Mathematics and Computer Science, building programming fundamentals.",
    highlights: ["Mathematics", "Computer Science"]
  }
];

// ================================
// SKILLS DATA
// ================================
export const skillsData = [
  // Programming Languages
  { id: 1, name: "JavaScript", icon: "fab fa-js-square", category: "Languages" },
  { id: 2, name: "TypeScript", icon: "fab fa-js-square", category: "Languages" },
  { id: 3, name: "HTML5", icon: "fab fa-html5", category: "Languages" },
  { id: 4, name: "CSS3", icon: "fab fa-css3-alt", category: "Languages" },
  { id: 5, name: "Python", icon: "fab fa-python", category: "Languages" },
  
  // Frameworks & Libraries
  { id: 6, name: "React", icon: "fab fa-react", category: "Frameworks" },
  { id: 7, name: "Next.js", icon: "fas fa-arrow-right", category: "Frameworks" },
  { id: 8, name: "TailwindCSS", icon: "fas fa-wind", category: "Frameworks" },
  { id: 9, name: "Node.js", icon: "fab fa-node-js", category: "Frameworks" },
  { id: 10, name: "Express", icon: "fas fa-server", category: "Frameworks" },
  
  // Soft Skills
  { id: 11, name: "Communication", icon: "fas fa-comments", category: "Soft Skills" },
  { id: 12, name: "Leadership", icon: "fas fa-crown", category: "Soft Skills" },
  { id: 13, name: "Problem Solving", icon: "fas fa-puzzle-piece", category: "Soft Skills" },
  { id: 14, name: "Team Collaboration", icon: "fas fa-users", category: "Soft Skills" }
];

// ================================
// PROJECTS DATA
// ================================
export interface ProjectData {
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

export const projectsData: ProjectData[] = [
  {
    id: "smart-farming",
    title: "AI-Powered Smart Farming Platform for Climate-Driven Crop Optimization",
    description: "An intelligent agricultural platform that combines AI chatbot capabilities, real-time weather analysis, and personalized crop recommendations. Features include automated irrigation planning, crop health monitoring, and climate-adaptive farming strategies for sustainable agriculture.",
    techStack: ["React", "Node.js", "AI/ML", "Weather API", "MongoDB", "Express", "Socket.io"],
    liveUrl: "https://smart-farming-demo.vercel.app",
    githubUrl: "https://github.com/txb1y/smart-farming-platform",
    linkedinUrl: "https://www.linkedin.com/posts/bharathi54123_smartfarming-ai-agriculture-activity-1234567890",
    telegramUrl: "https://t.me/bharathi_tech/123",
    isFeatured: true
  },
  {
    id: "student-connect",
    title: "StudentConnect - Academic Collaboration Platform",
    description: "A comprehensive platform connecting students for academic collaboration, study groups, and knowledge sharing. Features real-time messaging, file sharing, study room booking, and peer-to-peer tutoring services.",
    techStack: ["React", "TypeScript", "Firebase", "Material-UI", "WebRTC"],
    liveUrl: "https://student-connect-platform.vercel.app",
    githubUrl: "https://github.com/txb1y/student-connect",
    isFeatured: true
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website showcasing my projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS, featuring dark mode, animations, and optimized performance.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    liveUrl: "https://bharathi-portfolio.vercel.app",
    githubUrl: "https://github.com/txb1y/portfolio",
    isFeatured: true
  }
];

// ================================
// CERTIFICATES DATA
// ================================
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  certificateId: string;
  imageUrl: string;
  credentialUrl?: string;
}

export const certificatesData: Certificate[] = [
  {
    id: "infosys-frontend-developer",
    title: "Front End Web Developer Certification",
    issuer: "Infosys Springboard",
    year: "2025",
    certificateId: "INFOSYS-FE-2025-001",
    imageUrl: "/images/certificates/Frontend web developer certification_page-0001.jpg",
    credentialUrl: "https://infosys.com/verify/certificate/INFOSYS-FE-2025-001"
  },
  {
    id: "ats-internship",
    title: "Internship Completion Certificate",
    issuer: "ATS Technologies",
    year: "2024",
    certificateId: "ATS-INT-2024-456",
    imageUrl: "/images/certificates/ATS - Intenship.jpg"
  },
  {
    id: "hackathon-participation",
    title: "Hackathon Participation Certificate",
    issuer: "Tech Innovation Hub",
    year: "2024",
    certificateId: "TIH-HACK-2024-789",
    imageUrl: "/images/certificates/Certificate1.jpg"
  },
  {
    id: "coding-bootcamp",
    title: "Full Stack Development Bootcamp",
    issuer: "Code Academy",
    year: "2024",
    certificateId: "CA-FS-2024-321",
    imageUrl: "/images/certificates/CamScanner 12-07-2025 13.50.jpg"
  },
  {
    id: "web-development",
    title: "Advanced Web Development Course",
    issuer: "Digital Learning Institute",
    year: "2024",
    certificateId: "DLI-WD-2024-654",
    imageUrl: "/images/certificates/CamScanner 12-07-2025 13.51.jpg"
  }
];

// ================================
// WEBSITE CONFIGURATION
// ================================
export const websiteConfig = {
  // SEO Settings
  siteTitle: "Bharathi B. - Portfolio",
  siteDescription: "Portfolio of Bharathi B., Pre-Final Year IT Student and Aspiring Software Engineer",
  siteKeywords: "Bharathi B, Portfolio, Software Engineer, Web Developer, React, TypeScript, Student",
  
  // Footer Settings
  copyrightYear: "2025",
  footerText: "All rights reserved.",
  
  // Contact Form Settings
  contactEmail: "bharathii54123@gmail.com",
  contactSubjectPrefix: "Contact Form Message from",
  
  // Chatbot Settings
  chatbotName: "Bot",
  chatbotGreeting: "Hi! I'm Bharathi's portfolio assistant. You can ask me about my education, projects, skills, or experience. How can I help you today?",
  
  // API Configuration
  geminiApiKey: "AIzaSyBX0CYrnNnwSbDk982Y6fd_PA_kMpdQPUk"
};

// ================================
// NAVIGATION DATA
// ================================
export const navigationData = [
  { name: "Home", href: "#home", isExternal: false },
  { name: "About", href: "#about", isExternal: false },
  { name: "Projects", href: "#projects", isExternal: false },
  { name: "Certificates", href: "/certificates", isExternal: true },
  { name: "Contact", href: "#contact", isExternal: false }
];

// ================================
// COMBINE ALL DATA (for backward compatibility)
// ================================
export const siteData = {
  ...personalInfo,
  education: educationData,
  skills: skillsData
};

export const projects = projectsData;
export const certificates = certificatesData;
