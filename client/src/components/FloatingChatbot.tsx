import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { websiteConfig, personalInfo } from "@/data/website-data";
import { generateGeminiResponse } from "@/services/gemini-api";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isThinking?: boolean;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

// Utility function to detect and make URLs clickable
const linkifyText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[a-z]{2,}\/[^\s]*)/gi;
  
  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      const url = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-600 hover:text-violet-800 underline font-medium inline-flex items-center gap-1 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
          <i className="fas fa-external-link-alt text-xs opacity-70"></i>
        </a>
      );
    }
    return part;
  });
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: websiteConfig.chatbotGreeting,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // Dragging functionality
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });

  // Mobile keyboard detection and positioning
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  // 🔧 MOBILE KEYBOARD DETECTION LOGIC
  useEffect(() => {
    // Function to detect keyboard appearance using visual viewport
    const detectKeyboard = () => {
      if (typeof window === 'undefined') return;

      const isMobile = window.innerWidth <= 768;
      if (!isMobile) return;

      // Use Visual Viewport API for better keyboard detection
      if (window.visualViewport) {
        const handleViewportChange = () => {
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          const windowHeight = window.innerHeight;
          const heightDifference = windowHeight - viewportHeight;
          
          // Keyboard is considered open if viewport height is significantly reduced
          const keyboardIsOpen = heightDifference > 150; // 150px threshold
          
          setIsKeyboardOpen(keyboardIsOpen);
          setKeyboardHeight(keyboardIsOpen ? heightDifference : 0);
          
          // Automatically adjust chatbot position when keyboard opens
          if (keyboardIsOpen && isOpen) {
            setChatPosition(prev => ({
              ...prev,
              y: prev.y - (heightDifference * 0.4) // Move up by 40% of keyboard height
            }));
          } else if (!keyboardIsOpen && isOpen) {
            // Reset position when keyboard closes
            setChatPosition(prev => ({
              ...prev,
              y: 0
            }));
          }
        };

        window.visualViewport.addEventListener('resize', handleViewportChange);
        return () => window.visualViewport?.removeEventListener('resize', handleViewportChange);
      } else {
        // Fallback for browsers without Visual Viewport API
        const initialHeight = window.innerHeight;
        
        const handleResize = () => {
          const currentHeight = window.innerHeight;
          const heightDifference = initialHeight - currentHeight;
          const keyboardIsOpen = heightDifference > 150;
          
          setIsKeyboardOpen(keyboardIsOpen);
          setKeyboardHeight(keyboardIsOpen ? heightDifference : 0);
          
          // Automatically adjust chatbot position
          if (keyboardIsOpen && isOpen) {
            setChatPosition(prev => ({
              ...prev,
              y: prev.y - (heightDifference * 0.4)
            }));
          } else if (!keyboardIsOpen && isOpen) {
            setChatPosition(prev => ({
              ...prev,
              y: 0
            }));
          }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    };

    const cleanup = detectKeyboard();
    return cleanup;
  }, [isOpen]);

  // 🔧 DRAGGING FUNCTIONALITY
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragState({
      isDragging: true,
      startX: e.clientX - chatPosition.x,
      startY: e.clientY - chatPosition.y,
      currentX: chatPosition.x,
      currentY: chatPosition.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDragState({
      isDragging: true,
      startX: touch.clientX - chatPosition.x,
      startY: touch.clientY - chatPosition.y,
      currentX: chatPosition.x,
      currentY: chatPosition.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging) return;
      
      const newX = e.clientX - dragState.startX;
      const newY = e.clientY - dragState.startY;
      
      // Boundary constraints
      const maxX = window.innerWidth - 320; // Chat width
      const maxY = window.innerHeight - 400; // Chat height
      const minX = -280; // Allow some overflow
      const minY = -200;
      
      setChatPosition({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY)),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragState.isDragging) return;
      
      const touch = e.touches[0];
      const newX = touch.clientX - dragState.startX;
      const newY = touch.clientY - dragState.startY;
      
      // Boundary constraints
      const maxX = window.innerWidth - 320;
      const maxY = window.innerHeight - 400;
      const minX = -280;
      const minY = -200;
      
      setChatPosition({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY)),
      });
    };

    const handleMouseUp = () => {
      setDragState(prev => ({ ...prev, isDragging: false }));
    };

    const handleTouchEnd = () => {
      setDragState(prev => ({ ...prev, isDragging: false }));
    };

    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [dragState]);

  // Auto-focus input when chatbot opens for better UX
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure animation completes
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Auto-scroll to latest message when keyboard opens or new message arrives
  useEffect(() => {
    if (messagesContainerRef.current && (isKeyboardOpen || messages.length > 1)) {
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [messages, isKeyboardOpen]);

  // Handle input focus for better mobile experience
  const handleInputFocus = () => {
    // Small delay to ensure keyboard animation starts
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage(""); // Clear input immediately for better UX

    // 🔧 Keep input focused for continuous typing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    // Show thinking indicator first
    setIsThinking(true);
    
    // Add thinking message
    const thinkingMessage: Message = {
      id: Date.now() + 0.5,
      text: "Let me analyze your question and review Bharathi's information...",
      isBot: true,
      timestamp: new Date(),
      isThinking: true,
    };
    
    setMessages(prev => [...prev, thinkingMessage]);

    try {
      // Simulate thinking time for better UX (analyzing data)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove thinking message before adding real response
      setMessages(prev => prev.filter(msg => !msg.isThinking));
      
      setIsLoading(true);
      setIsThinking(false);
      
      // Use Gemini AI to generate response with enhanced analysis
      const botResponseText = await generateGeminiResponse(currentMessage);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Remove thinking message and add fallback
      setMessages(prev => prev.filter(msg => !msg.isThinking));
      
      // Fallback response if API fails
      const fallbackResponse: Message = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now, but I can still help! Try asking about Bharathi's education, skills, projects, or experience - I have all his information ready to share! 😊",
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      // 🔧 Re-focus input after bot response for seamless UX
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div 
      className="fixed z-20"
      style={{
        bottom: '1rem',
        right: '1rem',
        transform: `translate(${chatPosition.x}px, ${chatPosition.y}px)`,
        transition: dragState.isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          // Reset position when opening
          if (!isOpen) {
            setChatPosition({ x: 0, y: 0 });
          }
        }}
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-comments"} text-lg md:text-xl`}></i>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 md:bottom-16 right-0 w-72 md:w-80 h-80 md:h-96 glass-violet rounded-xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              // Mobile keyboard handling with smooth transitions
              ...(isKeyboardOpen && window.innerWidth <= 768 && {
                maxHeight: `${Math.min(320, window.innerHeight - keyboardHeight - 100)}px`,
                transition: 'all 0.3s ease-out'
              }),
              cursor: dragState.isDragging ? 'grabbing' : 'default',
            }}
          >
            {/* Draggable Header - Fixed at top */}
            <div 
              ref={dragHandleRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="flex-shrink-0 p-3 md:p-4 border-b border-violet-200 cursor-grab active:cursor-grabbing select-none"
              style={{ 
                cursor: dragState.isDragging ? 'grabbing' : 'grab',
                touchAction: 'none' // Prevent default touch behaviors
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Drag indicator */}
                  <div className="flex flex-col mr-2 opacity-50">
                    <div className="w-1 h-1 bg-violet-400 rounded-full mb-0.5"></div>
                    <div className="w-1 h-1 bg-violet-400 rounded-full mb-0.5"></div>
                    <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
                  </div>
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    B
                  </div>
                  <div className="ml-2 md:ml-3">
                    <h4 className="font-medium text-slate-800 text-sm md:text-base">{websiteConfig.chatbotName}</h4>
                    <p className="text-xs text-slate-600">
                      {isThinking ? "Analyzing..." : "Ask me about my portfolio!"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Social Links */}
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-violet-600 transition-colors p-1"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github text-sm"></i>
                  </a>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-violet-600 transition-colors p-1"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin text-sm"></i>
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-slate-500 hover:text-violet-600 transition-colors p-1"
                    aria-label="Email"
                  >
                    <i className="fas fa-envelope text-sm"></i>
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-500 hover:text-slate-700 p-1"
                  >
                    <i className="fas fa-times text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Container - Flex layout for proper spacing */}
            <div className="flex flex-col h-full">
              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4 min-h-0 scroll-smooth"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-xs p-2 md:p-3 rounded-lg text-xs md:text-sm leading-relaxed chatbot-message ${
                        message.isThinking 
                          ? "bg-violet-50 text-violet-600 border border-violet-200"
                          : message.isBot
                          ? "bg-violet-100 text-slate-700"
                          : "bg-violet-500 text-white"
                      }`}
                    >
                      {message.isThinking ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-1 h-1 bg-violet-500 rounded-full"
                            />
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.2, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2
                              }}
                              className="w-1 h-1 bg-violet-500 rounded-full"
                            />
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.2, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.4
                              }}
                              className="w-1 h-1 bg-violet-500 rounded-full"
                            />
                          </div>
                          <span className="text-xs italic">{message.text}</span>
                        </div>
                      ) : message.isBot ? (
                        <div className="markdown-content">
                          {/* Check if message contains markdown syntax */}
                          {message.text.includes('**') || message.text.includes('*') || message.text.includes('[') || message.text.includes('#') ? (
                            <ReactMarkdown 
                              components={{
                                // Custom components for better styling
                                p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                                strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                                em: ({children}) => <em className="italic">{children}</em>,
                                ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                                ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                                li: ({children}) => <li className="mb-1">{children}</li>,
                                code: ({children}) => <code className="bg-violet-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                                a: ({children, href}) => (
                                  <a 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-violet-600 hover:text-violet-800 underline font-medium inline-flex items-center gap-1 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {children}
                                    <i className="fas fa-external-link-alt text-xs opacity-70"></i>
                                  </a>
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          ) : (
                            // For plain text, use linkify function to make URLs clickable
                            <div className="text-sm leading-relaxed">
                              {linkifyText(message.text)}
                            </div>
                          )}
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Typing Indicator - Perfectly centered above input */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center px-3 md:px-4 pb-3"
                  >
                    <div className="flex items-center space-x-2 glass-violet rounded-full px-3 py-2 border border-violet-200/50 shadow-sm">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-violet-500 rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-violet-500 rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-violet-500 rounded-full"
                        />
                      </div>
                      <motion.span
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-violet-600 text-xs md:text-sm font-medium"
                      >
                        Bot is typing...
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Section - Fixed at bottom */}
              <div className="border-t border-violet-200 p-3 md:p-4">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask about my portfolio..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleInputFocus} // 📱 Handle focus for mobile keyboard
                    disabled={isLoading}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm glass rounded-lg border-0 focus:ring-2 focus:ring-violet-500 focus:outline-none placeholder-slate-500 disabled:opacity-50 transition-all duration-200"
                    // 📱 Additional mobile optimization
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      sendMessage();
                      // 🔧 Prevent button from stealing focus
                      setTimeout(() => {
                        inputRef.current?.focus();
                      }, 50);
                    }}
                    disabled={isLoading || !currentMessage.trim()}
                    className="px-3 md:px-4 py-2.5 md:py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px] md:min-w-[44px]"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
