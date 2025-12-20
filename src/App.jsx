import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Lanyard from './components/Lanyard';
import './App.css';

// Icons
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const AppleMusicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.335-2.22-1.17-.46-.91-.166-2.023.842-2.556.274-.145.57-.242.865-.336.545-.17 1.1-.315 1.64-.502.303-.105.467-.3.518-.61.02-.124.026-.25.026-.376 0-1.483 0-2.966-.004-4.448-.002-.136-.017-.272-.048-.405-.058-.252-.247-.39-.503-.396-.12-.003-.24.012-.36.032-1.094.18-2.186.36-3.278.54l-2.166.36c-.333.054-.666.112-.996.178-.263.052-.394.2-.432.46-.01.076-.015.154-.015.23v7.088c0 .378-.047.748-.2 1.098-.253.578-.674.97-1.265 1.172-.36.124-.735.195-1.12.22-.96.064-1.837-.273-2.306-1.088-.306-.53-.388-1.107-.28-1.705.195-1.063 1.05-1.763 2.203-1.834.376-.023.753.015 1.12.1.333.078.656.19.996.29V7.824c0-.09.002-.18.012-.27.04-.39.198-.66.58-.802.166-.062.338-.098.51-.13.944-.174 1.888-.346 2.832-.52l3.106-.576c.41-.076.823-.148 1.234-.223.274-.05.548-.1.823-.145.15-.025.302-.033.453-.013.318.04.504.22.57.533.02.097.027.198.027.297.002 1.36.002 2.72.002 4.08z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// Projects data
const projects = [
  {
    icon: "🤖",
    title: "ZharfAI",
    description: "Iranian AI company providing cutting-edge infrastructure solutions for businesses. Building the future of enterprise AI in the Middle East.",
    tech: ["AI/ML", "Cloud Infrastructure", "Enterprise"],
    link: "https://zharfai.com",
    github: null
  },
  {
    icon: "🏗️",
    title: "Besazesh.ai",
    description: "Revolutionary platform enabling anyone to build professional websites in clicks using AI-powered prompts. Democratizing web development.",
    tech: ["AI", "Web Builder", "SaaS"],
    link: "https://besazesh.ai",
    github: null
  },
  {
    icon: "🏛️",
    title: "AI Engine Ltd",
    description: "London-based company specializing in AI solutions for UK businesses, VCs, and banks. Providing intelligent backoffice automation.",
    tech: ["FinTech", "AI", "Enterprise"],
    link: "https://aiengineltd.com",
    github: null
  },
  {
    icon: "🚗",
    title: "Carkhoone",
    description: "Founded and scaled Iran's largest online marketplace for luxury car parts. Successfully exited after establishing market dominance.",
    tech: ["E-commerce", "Marketplace", "Automotive"],
    link: "https://carkhoone.com",
    github: null
  }
];

// Blog posts data - Add your own posts here
// Example format:
// { icon: "📝", title: "My Post Title", date: "Dec 2024", readTime: "5 min read", excerpt: "Post description..." }
const blogPosts = [];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Photo component with fallback
function ProfilePhoto({ className, alt }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          background: 'var(--bg-tertiary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
          border: '2px solid var(--border-medium)'
        }}
      >
        👨‍💻
      </div>
    );
  }

  return (
    <img
      src="/photo.png"
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    followers: 0,
    stars: 0,
    contributions: 0
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Fetch GitHub stats
    fetch('https://api.github.com/users/QuantIntellect')
      .then(res => res.json())
      .then(data => {
        setGithubStats(prev => ({
          ...prev,
          repos: data.public_repos || 0,
          followers: data.followers || 0
        }));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'blog', 'cv'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <div className="app">
        {/* Lanyard - Scrolls with page */}
        <Suspense fallback={null}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </Suspense>

        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Background Effects */}
        <div className="grid-pattern" />
        <div className="noise-overlay" />

        {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            sina<span>.dev</span>
          </a>
          <ul className="nav-links">
            {['home', 'projects', 'blog', 'cv'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="hero-label" variants={fadeInUp}>
              Systems Architect & Founder
            </motion.div>
            <motion.h1 className="hero-title" variants={fadeInUp}>
              Hi, I'm <span className="text-gradient">Sina Mirzaei Nokhostin</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-label">Featured Work</div>
            <h2 className="section-title">Companies & Projects</h2>
          </motion.div>

          <motion.div
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="project-header">
                  <div className="project-icon">{project.icon}</div>
                  <div className="project-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-label">Thoughts & Insights</div>
            <h2 className="section-title">Blog</h2>
          </motion.div>

          {blogPosts.length > 0 ? (
            <motion.div
              className="blog-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  className="blog-card"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="blog-image">{post.icon}</div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="blog-empty"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--text-muted)',
                fontSize: '1.1rem'
              }}
            >
              Coming soon...
            </motion.div>
          )}
        </div>
      </section>

      {/* CV Section */}
      <section id="cv" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-label">Resume</div>
            <h2 className="section-title">Curriculum Vitae</h2>
          </motion.div>

          <motion.div
            className="cv-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="cv-sidebar" variants={fadeInUp}>
              <h2 className="cv-name">Sina Mirzaei Nokhostin</h2>
              <div className="cv-title">Founder & Systems Architect</div>
              <div className="cv-contact">
                <a href="https://linkedin.com/in/sinamirzaei" target="_blank" rel="noopener noreferrer" className="cv-contact-item">
                  <LinkedInIcon /> linkedin.com/in/sinamirzaei
                </a>
                <a href="https://github.com/QuantIntellect" target="_blank" rel="noopener noreferrer" className="cv-contact-item">
                  <GithubIcon /> github.com/QuantIntellect
                </a>
                <div className="cv-contact-item">
                  <LocationIcon /> Tehran & London
                </div>
              </div>
            </motion.div>

            <motion.div className="cv-main" variants={staggerContainer}>
              {/* Experience */}
              <motion.div variants={fadeInUp}>
                <h3 className="cv-section-title">Experience</h3>
                <div className="cv-timeline">
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">Founder & CEO</span>
                      <span className="cv-item-date">Present</span>
                    </div>
                    <div className="cv-item-subtitle">ZharfAI - Tehran, Iran</div>
                    <p className="cv-item-description">
                      Leading an AI infrastructure company that provides cutting-edge solutions for businesses across the Middle East.
                    </p>
                  </div>
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">Founder</span>
                      <span className="cv-item-date">Present</span>
                    </div>
                    <div className="cv-item-subtitle">Besazesh.ai</div>
                    <p className="cv-item-description">
                      Building an AI-powered website creation platform that enables anyone to create professional websites with simple prompts.
                    </p>
                  </div>
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">Founder</span>
                      <span className="cv-item-date">Present</span>
                    </div>
                    <div className="cv-item-subtitle">AI Engine Ltd - London, UK</div>
                    <p className="cv-item-description">
                      London-based company specializing in AI solutions for UK businesses, VCs, and banks. Providing intelligent backoffice automation.
                    </p>
                  </div>
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">Founder</span>
                      <span className="cv-item-date">Exited</span>
                    </div>
                    <div className="cv-item-subtitle">Carkhoone.com</div>
                    <p className="cv-item-description">
                      Founded and scaled Iran's largest online marketplace for luxury car parts. Successfully established market dominance before exit.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div variants={fadeInUp}>
                <h3 className="cv-section-title">Education</h3>
                <div className="cv-timeline">
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">BSc Electrical Engineering</span>
                    </div>
                    <div className="cv-item-subtitle">University of Tehran</div>
                    <p className="cv-item-description">
                      One of the most prestigious engineering programs in Iran, providing a strong foundation in systems thinking and technical problem-solving.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div variants={fadeInUp}>
                <h3 className="cv-section-title">Achievements</h3>
                <div className="cv-timeline">
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">🥈 Silver Medal - Chemistry Olympiad</span>
                    </div>
                    <div className="cv-item-subtitle">Iran National Chemistry Olympiad</div>
                    <p className="cv-item-description">
                      Awarded silver medal for exceptional performance in the national chemistry competition.
                    </p>
                  </div>
                  <div className="cv-item">
                    <div className="cv-item-header">
                      <span className="cv-item-title">🥉 Bronze Medal - Chemistry Olympiad</span>
                    </div>
                    <div className="cv-item-subtitle">Iran National Chemistry Olympiad</div>
                    <p className="cv-item-description">
                      Awarded bronze medal demonstrating strong analytical and problem-solving skills in chemistry.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div variants={fadeInUp}>
                <h3 className="cv-section-title">Skills & Technologies</h3>
                <div className="cv-skills">
                  {[
                    'AI/ML', 'Python', 'Cloud Architecture', 'AWS', 'React',
                    'Node.js', 'TypeScript', 'System Design', 'Leadership',
                    'Product Strategy', 'Business Development', 'Team Building'
                  ].map((skill, i) => (
                    <span key={i} className="cv-skill">{skill}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            © {new Date().getFullYear()} Sina Mirzaei. Building the future.
          </div>
          <div className="footer-links">
            <a href="https://github.com/QuantIntellect" target="_blank" rel="noopener noreferrer" className="footer-link">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/sinamirzaei" target="_blank" rel="noopener noreferrer" className="footer-link">
              <LinkedInIcon />
            </a>
            <a href="https://music.apple.com/profile/sinamirzaei" target="_blank" rel="noopener noreferrer" className="footer-link">
              <AppleMusicIcon />
            </a>
          </div>
        </div>
      </footer>
      </div>
  );
}

export default App;
