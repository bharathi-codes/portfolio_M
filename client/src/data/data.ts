// ================================
// BACKWARD COMPATIBILITY EXPORTS
// ================================
// This file now imports from the centralized website-data.ts file
// All new edits should be made in website-data.ts

export * from './website-data';

// Re-export main data with original structure for backward compatibility
import { siteData as newSiteData, projects as newProjects, certificates as newCertificates } from './website-data';

export const siteData = newSiteData;
export const projects = newProjects;
export const certificates = newCertificates;
