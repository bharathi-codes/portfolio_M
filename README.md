# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Interactive Elements**: Smooth animations with Framer Motion
- **AI Chatbot**: Powered by Google Gemini API
- **PWA Ready**: Progressive Web App capabilities
- **SEO Optimized**: Meta tags, structured data, and sitemap

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI Components
- **Animations**: Framer Motion
- **Icons**: Lucide React, Font Awesome
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 📁 Project Structure

```
Portfolio_M/
├── client/               # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── data/        # Website content and data
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── pages/       # Page components
│   └── public/          # Static assets
├── server/              # Backend server (for development)
├── shared/              # Shared types and schemas
└── dist/                # Build output
```

## 🚀 Quick Start

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/txb1y/portfolio_M.git
   cd portfolio_M
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

### Building for Production

```bash
npm run build
```

This creates a `dist/public` directory with all static files ready for deployment.

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be live at `https://your-project.vercel.app`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/public` folder** to any static hosting service

## 📝 Content Management

All website content is managed through the centralized data file:

**`client/src/data/website-data.ts`**

Edit this file to update:
- Personal information
- Education timeline
- Skills and technologies
- Projects portfolio
- Certificates
- Contact details
- AI chatbot configuration

See `CONTENT-EDITING-GUIDE.md` for detailed instructions.

## 🔧 Configuration Files

- **`vercel.json`**: Vercel deployment configuration
- **`vite.config.ts`**: Vite build configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration

## 🚨 Troubleshooting

### Build Issues on Vercel

If you encounter build errors:

1. **Check Node.js version**
   - Ensure using Node.js 18.x
   - Update `package.json` engines if needed

2. **Clear dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Test build locally**
   ```bash
   npm run build
   ```

### Common Issues

- **Permission denied**: Use `npx` prefix for commands
- **Missing dependencies**: Run `npm install` to install all packages
- **Build artifacts**: Check `dist/public` folder is generated correctly

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---

**Live Demo**: [Portfolio Website](https://bharathi-portfolio.xyz)
**Developer**: Bharathi B.
