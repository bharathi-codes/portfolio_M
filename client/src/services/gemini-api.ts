// ================================
// GEMINI AI CHATBOT SERVICE - ENHANCED
// ================================
import { websiteConfig, personalInfo, educationData, skillsData, projectsData, certificatesData } from '../data/website-data';

// Gemini API Configuration
const GEMINI_API_KEY = websiteConfig.geminiApiKey;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

// Create context about Bharathi from website data
const createPortfolioContext = (): string => {
  const context = `
You are a smart, helpful, and friendly student portfolio assistant. Your job is to help users learn more about Bharathi, guide them through the website, and answer any career or tech-related questions they may have.

IMPORTANT: Bharathi B. is a MALE student. Always use masculine pronouns (he/him/his) when referring to Bharathi.

CONTEXT:
- You are embedded in a personal developer portfolio of Bharathi, a passionate B.Tech IT student from Tamil Nadu
- The site has these sections: Hero, About, Education, Skills, Projects, GitHub, Contact, and Extras
- Education includes 10th, 12th, and current college timeline with detailed achievements
- Projects include AI tools, automation bots, and hardware/software experiments

COMPREHENSIVE INFORMATION ABOUT BHARATHI:

PERSONAL INFORMATION:
- Name: ${personalInfo.name} (Male)
- Role: ${personalInfo.role}
- Location: ${personalInfo.location}
- Email: ${personalInfo.email}
- About: ${personalInfo.aboutText}
- Interests: ${personalInfo.interests}

EDUCATION TIMELINE:
${educationData.map((edu: any) => `
- ${edu.degree} at ${edu.institution} (${edu.period}) - ${edu.status}
  Description: ${edu.description}
  Key Areas: ${edu.highlights.join(', ')}
`).join('')}

TECHNICAL SKILLS:
${skillsData.map((skill: any) => `- ${skill.name} (${skill.category})`).join('\n')}

PROJECTS PORTFOLIO:
${projectsData.map((project: any) => `
- ${project.title}
  Description: ${project.description}
  Technologies: ${project.techStack.join(', ')}
  Live URL: ${project.liveUrl}
  GitHub: ${project.githubUrl}
`).join('')}

CERTIFICATES & ACHIEVEMENTS:
${certificatesData.map((cert: any) => `
- ${cert.title} by ${cert.issuer} (${cert.year})
  Certificate ID: ${cert.certificateId}
`).join('')}

SOCIAL LINKS:
- GitHub: ${personalInfo.socialLinks.github}
- LinkedIn: ${personalInfo.socialLinks.linkedin}
- Resume: ${personalInfo.socialLinks.resumeUrl}

BEHAVIOR GUIDELINES:
1. Respond in a warm, smart, helpful tone—like a friend who's also a career mentor
2. Use information from the website and timeline when replying
3. Guide users to explore the site by suggesting specific sections (e.g., "Check the *Projects* tab for cool AI tools Bharathi built!")
4. Give career advice, coding tips, or academic motivation when asked
5. Always adapt to student visitors and answer questions like:
   • "How did Bharathi learn Java?"
   • "What are Bharathi's best projects?"
   • "Can I see Bharathi's GitHub?"
   • "How to get started with AI like Bharathi?"
   • "Where did Bharathi study 10th and 12th?"
   • "Give me motivation to learn coding"
6. Speak in a natural, human way—keep it conversational and inspiring
7. When unsure, say: "That's a great question! I'll check the info on this page or you can use the *Contact* section to ask Bharathi directly."
8. ALWAYS use masculine pronouns (he/him/his) when referring to Bharathi - HE IS MALE
9. Keep replies under 4 sentences and highlight important words with asterisks
10. Keep tone enthusiastic and future-focused
11. Use emojis occasionally to make responses more engaging
12. Contact info: ${personalInfo.email}
`;

  return context;
};

// Function to check if question is relevant to portfolio
const isRelevantQuestion = (question: string): boolean => {
  const lowerQuestion = question.toLowerCase();
  const relevantKeywords = [
    'bharathi', 'education', 'skill', 'project', 'experience', 'work', 'technology', 'tech',
    'certificate', 'qualification', 'study', 'college', 'university', 'degree', 'programming',
    'development', 'web', 'react', 'javascript', 'typescript', 'python', 'portfolio',
    'background', 'about', 'contact', 'email', 'github', 'linkedin', 'resume', 'cv',
    'internship', 'learning', 'interest', 'passion', 'goal', 'future', 'career',
    'hello', 'hi', 'hey', 'who', 'what', 'where', 'when', 'how', 'tell me',
    'learn', 'teach', 'help', 'advice', 'tips', 'motivation', 'inspire', 'guidance',
    'java', 'ai', 'artificial intelligence', 'machine learning', 'web development',
    'frontend', 'backend', 'database', 'algorithm', 'coding', 'code', 'software',
    'app', 'website', 'platform', 'system', 'tools', 'framework', 'library',
    'student', 'college', 'academy', 'school', '10th', '12th', 'grade', 'class',
    'achievement', 'award', 'recognition', 'success', 'best', 'favorite'
  ];

  return relevantKeywords.some(keyword => lowerQuestion.includes(keyword));
};

// Function to generate response using Gemini AI
export const generateGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    // Check if question is relevant
    if (!isRelevantQuestion(userMessage)) {
      return "I'm here to help you learn about Bharathi's portfolio, education, skills, and projects! Feel free to ask me anything related to his professional background. 😊";
    }

    // Set a timeout for faster responses
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const context = createPortfolioContext();
    
    // Enhanced prompt with better analysis instructions
    const prompt = `${context}

User Question: "${userMessage}"

ANALYSIS INSTRUCTIONS:
Before responding, carefully analyze the user's question to:
1. Identify what specific information they're seeking about Bharathi
2. Determine which section(s) of his portfolio are most relevant
3. Consider what level of detail would be most helpful
4. Think about follow-up questions they might have

RESPONSE GUIDELINES:
- First, briefly acknowledge what you understand they're asking about
- Provide the most relevant and accurate information from Bharathi's portfolio
- Use specific details, numbers, and examples when available
- Format your response with **bold** for important points and *italics* for emphasis
- Include actionable suggestions (e.g., "Check his *Projects* section for...")
- Keep the response engaging, informative, and under 200 words
- Always use masculine pronouns (he/him/his) when referring to Bharathi
- End with a helpful suggestion or invitation for more questions

IMPORTANT REMINDER: Bharathi B. is MALE. Always use HE/HIM/HIS pronouns consistently.

Analyze the question thoroughly, then provide a comprehensive and helpful response:`;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 200,
          stopSequences: [],
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log(`Gemini API responded with status: ${response.status}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Post-process response to ensure quality
      if (responseText && responseText.length > 10) {
        return responseText;
      } else {
        throw new Error('Response too short or empty');
      }
    } else {
      throw new Error('Invalid response format from Gemini API');
    }

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Enhanced fallback responses with better analysis
    return getEnhancedFallbackResponse(userMessage);
  }
};

// Enhanced fallback responses when API is unavailable
const getEnhancedFallbackResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Analyze user intent more comprehensively
  if (message.includes("education") || message.includes("study") || message.includes("degree") || message.includes("college") || message.includes("academic")) {
    return "🎓 **Education Analysis**: He's currently pursuing a *B.Tech in Information Technology* at Kongunadu College of Engineering and Technology (2023-2027) with strong academic performance. He completed his Higher Secondary Education from The Modern Academy with focus on Mathematics and Computer Science. \n\n📚 Check the **Education** section for his complete academic timeline and achievements!";
  }
  
  if (message.includes("skills") || message.includes("technology") || message.includes("tech") || message.includes("programming") || message.includes("languages")) {
    const skills = skillsData.map((skill: any) => skill.name).slice(0, 5).join(", ");
    return `💻 **Technical Skills Analysis**: His expertise spans *${skills}* and many more cutting-edge technologies! He's passionate about full-stack development, AI/ML, and modern web technologies.\n\n🚀 Explore the **Skills** section to see his complete tech stack with proficiency levels!`;
  }
  
  if (message.includes("projects") || message.includes("work") || message.includes("portfolio") || message.includes("built") || message.includes("created")) {
    return "🚀 **Project Portfolio Analysis**: He's built impressive projects including:\n\n• **AI-Powered Smart Farming Platform** - Innovative AgTech solution\n• **StudentConnect** - Collaborative learning platform\n• **This Portfolio Website** - Modern responsive design\n\n💡 Each project demonstrates different aspects of his development skills. Check the **Projects** section for live demos and source code!";
  }
  
  if (message.includes("github") || message.includes("code") || message.includes("repository") || message.includes("source")) {
    return `💻 **GitHub Profile Analysis**: You can explore all his code and contributions on **GitHub**! He regularly commits new projects and maintains clean, well-documented code.\n\n🔗 Visit his GitHub profile or click the GitHub icon to dive into his repositories!`;
  }
  
  if (message.includes("experience") || message.includes("background") || message.includes("journey") || message.includes("career")) {
    return "👨‍💻 **Professional Background**: He's a passionate IT student specializing in **full-stack development** with hands-on experience in modern web technologies, *AI/ML concepts*, and database management.\n\n🌟 His journey showcases continuous learning, innovation, and dedication to creating impactful solutions!";
  }
  
  if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("hire") || message.includes("collaborate")) {
    return `📧 **Contact Information**: You can reach him at **${personalInfo.email}** or through the **Contact** section.\n\n🤝 He's always open to discussing new opportunities, collaborations, internships, and innovative projects!`;
  }
  
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("greetings")) {
    return "👋 **Hello! Great to meet you!** I'm here to help you discover more about *Bharathi's* impressive background, technical skills, and innovative projects.\n\n🔍 Feel free to ask about his education, achievements, or any tech-related questions!";
  }

  if (message.includes("certificates") || message.includes("certification") || message.includes("achievement") || message.includes("awards")) {
    return "🏆 **Achievements Analysis**: He has earned several valuable certifications:\n\n• **Front End Web Developer Certification** from Infosys Springboard\n• Multiple internship completion certificates\n• Various web development course completions\n\n📜 Check the **Certificates** section for his complete achievement timeline!";
  }

  if (message.includes("motivation") || message.includes("inspire") || message.includes("advice") || message.includes("tips")) {
    return "💪 **Inspiration & Advice**: Bharathi believes in *continuous learning* and hands-on practice! His journey demonstrates that with dedication, curiosity, and consistent effort, you can master any technology.\n\n🌟 **His advice**: Start with small projects, build consistently, stay curious, and never stop exploring new tools and frameworks!";
  }

  if (message.includes("learn") || message.includes("start") || message.includes("begin") || message.includes("beginner")) {
    return "🌟 **Learning Path**: Start with the fundamentals, build real projects, and stay curious! Bharathi learned through practical application - from simple websites to complex AI applications.\n\n🚀 Check his **Projects** section for inspiration, and remember: every expert was once a beginner with passion and persistence!";
  }

  if (message.includes("10th") || message.includes("12th") || message.includes("school") || message.includes("foundation")) {
    return "🏫 **Academic Foundation**: He completed his *10th grade* with excellent marks and his *12th grade* from The Modern Academy Matric Hr. Sec. School with focus on Mathematics and Computer Science.\n\n📊 His strong academic foundation in math and computer science perfectly shaped his successful journey into technology!";
  }

  // General response with guidance
  return "🤖 **I'm here to help!** I can provide detailed information about Bharathi's *education*, *technical skills*, *innovative projects*, and professional experience.\n\n❓ **Try asking about**: his college journey, programming skills, AI projects, certificates, or get some coding motivation! What would you like to explore? 😊";
};

export default generateGeminiResponse;
