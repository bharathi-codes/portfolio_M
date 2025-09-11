// Project type definition
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

// Featured projects array
export const projects: ProjectData[] = [
  {
    id: "smart-farming",
    title: "AI-Powered Smart Farming Platform for Climate-Driven Crop Optimization",
    description: "An intelligent agricultural platform that combines AI chatbot capabilities, real-time weather analysis, and personalized crop recommendations. Features include automated irrigation planning, crop health monitoring, and climate-adaptive farming strategies for sustainable agriculture.",
    techStack: ["React", "Node.js", "AI/ML", "Weather API", "MongoDB", "Express", "Socket.io"],
    liveUrl: "https://smart-farming-demo.netlify.app",
    githubUrl: "https://github.com/txb1y/smart-farming-platform",
    linkedinUrl: "https://www.linkedin.com/posts/bharathi54123_ai-agritech-smartfarming-activity-7311956742890823681-duNL?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEcuAo8BqExAieg4RwEewetYoYh4QC5rz0Y&utm_campaign=copy_link",
    isFeatured: true
  },
  {
    id: "telegram-email-bot",
    title: "Telegram Email Bot",
    description: "A powerful Telegram bot that simplifies email communication by allowing users to send single or bulk emails directly through Telegram chat commands. Features include email templates, attachment support, and delivery tracking.",
    techStack: ["Python", "Telegram Bot API", "smtplib", "asyncio", "SQLite"],
    liveUrl: "https://t.me/Emailsender523_Bot",
    githubUrl: "https://github.com/txb1y/MailBot-Telegram",
    telegramUrl: "https://t.me/Emailsender523_Bot",
    isFeatured: true
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, dark mode support, optimized performance, and a content management system for easy updates.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    liveUrl: "#",
    githubUrl: "",
    isFeatured: true
  },
  {
    id: "weather-dashboard",
    title: "Weather Analytics Dashboard",
    description: "An interactive weather dashboard that provides detailed forecasts, historical data analysis, and weather pattern visualizations. Features location-based services and customizable alerts.",
    techStack: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js", "CSS3"],
    liveUrl: "",
    githubUrl: "",
    isFeatured: false
  },
  {
    id: "expense-tracker",
    title: "Smart Expense Tracker",
    description: "A mobile-first expense tracking application with AI-powered categorization, budget analysis, and financial insights. Includes receipt scanning and multi-currency support.",
    techStack: ["React Native", "Firebase", "AI/ML", "Chart.js", "Expo"],
    liveUrl: "",
    githubUrl: "",
    isFeatured: false
  }
];
