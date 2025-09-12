# Raju Gottumukkala - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Software Engineer specializing in Java Microservices, Fintech Solutions, and AI/ML Platforms.

## Latest Update
- Enhanced project descriptions and technical achievements
- Improved layout and responsiveness
- Updated with latest professional experience

**🌐 Live Website**: [rajugottumukkala.in](https://rajugottumukkala.in)

## ✨ Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent user preference
- **Interactive Components**: Engaging hover effects and smooth transitions
- **Resume Integration**: Built-in PDF preview and download functionality
- **Performance Optimized**: Fast loading with modern web standards

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Theme Management**: next-themes

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── About.tsx       # About section with skills and expertise
│   ├── Contact.tsx     # Contact form and information
│   ├── Experience.tsx  # Work experience timeline
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Landing section
│   ├── Navigation.tsx  # Header navigation with theme toggle
│   ├── Projects.tsx    # Featured projects showcase
│   └── ResumeModal.tsx # PDF resume preview modal
├── pages/              # Page components
│   ├── Index.tsx       # Main portfolio page
│   └── NotFound.tsx    # 404 error page
├── lib/                # Utility functions
├── App.tsx             # Root application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gkr5413/portfolio-website.git
   cd portfolio-website
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
   http://localhost:8080
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Theme Configuration

The theme system uses CSS custom properties defined in `src/index.css`. You can customize colors by modifying the CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... other variables */
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/pages/Index.tsx`
3. Update navigation links in `src/components/Navigation.tsx`

## 📱 Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Optimized Images**: Responsive image loading
- **Minimal Bundle Size**: Tree-shaking and dead code elimination
- **Modern CSS**: Utility-first approach with Tailwind CSS
- **TypeScript**: Full type safety for better development experience

## 🌟 Key Highlights

- **Professional Experience**: 2+ years in software engineering
- **Technical Expertise**: Java, Spring Boot, Microservices, AI/ML
- **Project Achievements**: 414 RPS performance, ~55ms latency, 0 error rate
- **Education**: MS Computer Science (3.82 GPA)
- **Location**: Kansas City, MO

## 📞 Contact

- **Email**: gottumukkala.kanakaraju@gmail.com
- **Phone**: +1 (816) 352-4975
- **LinkedIn**: [linkedin.com/in/gkr5413](https://linkedin.com/in/gkr5413/)
- **GitHub**: [github.com/gkr5413](https://github.com/gkr5413)
- **Website**: [rajugottumukkala.in](https://rajugottumukkala.in)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Raju Gottumukkala**