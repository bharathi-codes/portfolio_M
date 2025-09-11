import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { personalInfo, websiteConfig } from "@/data/website-data";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const ref = useScrollAnimation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`${websiteConfig.contactSubjectPrefix} ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:${websiteConfig.contactEmail}?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;

      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success!",
        description: "Your email client has been opened. Please send the message from your email app.",
      });

      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error opening your email client. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <motion.h2
              ref={ref}
              className="text-2xl md:text-4xl font-bold gradient-text"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-slate-600 mt-3 md:mt-4 text-sm md:text-base px-4"
            >
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-violet rounded-xl p-4 md:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 glass rounded-lg border-0 focus:ring-2 transition-all duration-300 text-sm md:text-base ${
                      formErrors.name ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-violet-500'
                    }`}
                    placeholder="Your full name"
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 glass rounded-lg border-0 focus:ring-2 transition-all duration-300 text-sm md:text-base ${
                      formErrors.email ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-violet-500'
                    }`}
                    placeholder="your.email@example.com"
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs md:text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 glass rounded-lg border-0 focus:ring-2 transition-all duration-300 resize-none text-sm md:text-base ${
                      formErrors.message ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-violet-500'
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-600">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg font-medium hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <i className="fas fa-paper-plane ml-2"></i>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-8"
            >
              <div className="glass-violet rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">Let's Connect</h3>
                <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">
                  I'm always open to discussing new opportunities, innovative projects, 
                  or just having a friendly chat about technology and design.
                </p>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-violet-500 w-4 md:w-6 text-sm md:text-base"></i>
                    <span className="text-slate-700 ml-3 md:ml-4 text-sm md:text-base">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-violet-500 w-4 md:w-6 text-sm md:text-base"></i>
                    <span className="text-slate-700 ml-3 md:ml-4 text-sm md:text-base">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="glass-violet rounded-xl p-4 md:p-6">
                <h4 className="text-base md:text-lg font-semibold text-slate-800 mb-3 md:mb-4">Quick Links</h4>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <a
                    href={personalInfo.socialLinks.resumeUrl}
                    download
                    className="text-violet-600 hover:text-violet-700 font-medium flex items-center text-xs md:text-sm"
                  >
                    <i className="fas fa-file-pdf mr-1 md:mr-2 text-xs md:text-sm"></i>
                    Resume
                  </a>
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-700 font-medium flex items-center text-xs md:text-sm"
                  >
                    <i className="fab fa-github mr-1 md:mr-2 text-xs md:text-sm"></i>
                    GitHub
                  </a>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:text-violet-700 font-medium flex items-center text-xs md:text-sm"
                  >
                    <i className="fab fa-linkedin mr-1 md:mr-2 text-xs md:text-sm"></i>
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
