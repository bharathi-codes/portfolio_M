# 🎯 WEBSITE CONTENT MANAGEMENT

## 📍 How to Edit Website Content

All website content is now centralized in one file for easy editing:

**Main File to Edit:** `client/src/data/website-data.ts`

## 🔧 Quick Edit Guide

### 1. **Personal Information**
```typescript
export const personalInfo = {
  name: "Bharathi B.",                    // Your name
  role: "Pre-Final Year Student 🎓...",   // Your title/role
  tagline: "Building aesthetic...",       // Hero section tagline
  email: "bharathii54123@gmail.com",      // Contact email
  phone: "",                              // Phone (leave empty to hide)
  location: "Tamil Nadu, India",          // Your location
  photo: "/images/profile.jpg",           // Profile image path
  aboutText: "Currently pursuing...",     // About section text
  interests: "Passionate about...",       // Your interests
  socialLinks: {
    github: "https://github.com/txb1y",        // GitHub URL
    linkedin: "https://www.linkedin.com/...",   // LinkedIn URL
    resumeUrl: "/BHARATHI-Resume.pdf",          // Resume file path
    email: "mailto:bharathii54123@gmail.com"    // Email link
  }
};
```

### 2. **Education Data**
```typescript
export const educationData = [
  {
    id: 1,
    degree: "B.Tech in Information Technology",
    institution: "Kongunadu College of Engineering and Technology",
    period: "2023 - 2027",
    status: "Currently Pursuing",
    description: "Pursuing Information Technology...",
    highlights: ["Software Development", "Web Technologies", "AI & Machine Learning"]
  }
  // Add more education entries here
];
```

### 3. **Skills Data**
```typescript
export const skillsData = [
  { id: 1, name: "JavaScript", icon: "fab fa-js-square", category: "Languages" },
  { id: 2, name: "React", icon: "fab fa-react", category: "Frameworks" },
  // Add more skills here
];
```

### 4. **Projects Data**
```typescript
export const projectsData = [
  {
    id: "smart-farming",
    title: "AI-Powered Smart Farming Platform",
    description: "An intelligent agricultural platform...",
    techStack: ["React", "Node.js", "AI/ML"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com/...",
    isFeatured: true
  }
  // Add more projects here
];
```

### 5. **Certificates Data**
```typescript
export const certificatesData = [
  {
    id: "infosys-frontend-developer",
    title: "Front End Web Developer Certification",
    issuer: "Infosys Springboard",
    year: "2025",
    certificateId: "INFOSYS-FE-2025-001",
    imageUrl: "/images/certificates/cert.jpg",
    credentialUrl: "https://verify-link.com"
  }
  // Add more certificates here
];
```

### 6. **Website Configuration**
```typescript
export const websiteConfig = {
  siteTitle: "Bharathi B. - Portfolio",
  copyrightYear: "2025",
  footerText: "All rights reserved.",
  contactEmail: "bharathii54123@gmail.com",
  chatbotName: "Bot",
  chatbotGreeting: "Hi! I'm Bharathi's portfolio assistant...",
  geminiApiKey: "AIzaSyBX0CYrnNnwSbDk982Y6fd_PA_kMpdQPUk"
};
```

### 7. **Navigation Menu**
```typescript
export const navigationData = [
  { name: "Home", href: "#home", isExternal: false },
  { name: "About", href: "#about", isExternal: false },
  { name: "Projects", href: "#projects", isExternal: false },
  { name: "Certificates", href: "/certificates", isExternal: true },
  { name: "Contact", href: "#contact", isExternal: false }
];
```

## 🤖 AI Chatbot Features

- **Powered by Google Gemini AI** with your API key
- **Intelligent responses** based on your portfolio data
- **Contextual understanding** of education, skills, projects, and experience
- **Professional filtering** - only answers portfolio-related questions
- **Attractive and engaging** conversational style
- **Fallback responses** if API is unavailable

## 📁 File Structure

```
client/src/data/
├── website-data.ts     ← EDIT THIS FILE FOR ALL CONTENT
├── data.ts            ← Backward compatibility (auto-updated)
├── projects.ts        ← Legacy (use website-data.ts instead)
├── certificates.ts    ← Legacy (use website-data.ts instead)
└── contact.ts         ← Legacy (use website-data.ts instead)
```

## 🚀 How Changes Work

1. **Edit** `website-data.ts` with your content
2. **Save** the file
3. **Refresh** the website - changes appear automatically!
4. All components automatically use the updated data

## 🔗 Linked Components

These components automatically update when you edit `website-data.ts`:

- ✅ Hero Section (name, role, tagline, social links)
- ✅ About Section (about text, interests)
- ✅ Education Section (education data)
- ✅ Skills Section (skills data)
- ✅ Projects Section (projects data)
- ✅ Certificates Section (certificates data)
- ✅ Contact Section (email, location, social links)
- ✅ Footer (name, copyright, social links)
- ✅ Navigation (menu items)
- ✅ AI Chatbot (name, greeting, responses)

## 🛡️ API Security

The Gemini API key is included in the configuration. For production:
1. Move API key to environment variables
2. Use server-side API calls for better security
3. Implement rate limiting

---

**Happy Editing! 🎉**
