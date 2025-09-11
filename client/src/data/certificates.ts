// Certificate type definition
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  certificateId: string;
  imageUrl: string; // Supports: .svg, .jpg, .jpeg, .png, .webp, .gif
  credentialUrl?: string;
}

// Certificates array
export const certificates: Certificate[] = [
  {
    id: "infosys-frontend-developer",
    title: "Front End Web Developer Certification",
    issuer: "Infosys Springboard",
    year: "2025",
    certificateId: "INFOSYS-FE-2025-001",
    imageUrl: "/images/certificates/Frontend web developer certification_page-0001.jpg",
    credentialUrl: "https://verify.onwingspan.com"
  },
  {
    id: "ats-fullstack-internship",
    title: "Full Stack Web Development Internship",
    issuer: "Accent Techno Soft (ATS)",
    year: "2025",
    certificateId: "ATS-FS-2025-002",
    imageUrl: "/images/certificates/ATS - Intenship.jpg"
  },
  {
    id: "bannari-mechonix-2024",
    title: "Workshop on Industry 4.0 – Mechonix 2024",
    issuer: "Bannari Amman Institute of Technology",
    year: "2024",
    certificateId: "BIT-MECHONIX-2024-003",
    imageUrl: "/images/certificates/CamScanner 12-07-2025 13.50.jpg"
  },
  {
    id: "snr-sangraha-2k24",
    title: "Paper Presentation – Sangraha 2k24",
    issuer: "Sri Ramakrishna Engineering College",
    year: "2024",
    certificateId: "SREC-SANGRAHA-2024-004",
    imageUrl: "/images/certificates/CamScanner 12-07-2025 13.51.jpg"
  },
  {
    id: "hackindia-2025",
    title: "HackIndia 2025 – Web3 & AI Hackathon",
    issuer: "HackIndia | SingularityNET",
    year: "2025",
    certificateId: "HACKINDIA-2025-005",
    imageUrl: "/images/certificates/Certificate1.jpg",
    credentialUrl: "https://hackindia.xyz"
  }
];
