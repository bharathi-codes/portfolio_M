import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack").array().notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  telegramUrl: text("telegram_url"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  year: text("year").notNull(),
  certificateId: text("certificate_id").notNull(),
  imageUrl: text("image_url").notNull(),
  credentialUrl: text("credential_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  period: text("period").notNull(),
  description: text("description"),
});

// Additional tables for comprehensive admin panel
export const hero = pgTable("hero", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  tagline: text("tagline").notNull(),
  profileImage: text("profile_image").notNull(),
  github: text("github"),
  linkedin: text("linkedin"),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  resumeUrl: text("resume_url"),
});

export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatbot = pgTable("chatbot", {
  id: serial("id").primaryKey(),
  isEnabled: boolean("is_enabled").default(true),
  responses: text("responses").notNull(), // JSON string of Q&A pairs
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  themeColor: text("theme_color").default("violet"),
  animationsEnabled: boolean("animations_enabled").default(true),
  sectionsEnabled: text("sections_enabled").notNull(), // JSON array of enabled sections
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
});

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
});

export const insertHeroSchema = createInsertSchema(hero).omit({
  id: true,
});

export const insertAboutSchema = createInsertSchema(about).omit({
  id: true,
  updatedAt: true,
});

export const insertChatbotSchema = createInsertSchema(chatbot).omit({
  id: true,
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Education = typeof education.$inferSelect;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Hero = typeof hero.$inferSelect;
export type InsertHero = z.infer<typeof insertHeroSchema>;
export type About = typeof about.$inferSelect;
export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type Chatbot = typeof chatbot.$inferSelect;
export type InsertChatbot = z.infer<typeof insertChatbotSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
