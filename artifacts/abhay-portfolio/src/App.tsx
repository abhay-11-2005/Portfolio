import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, Phone, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const githubUrl = 'https://github.com/abhay-11-2005';
const linkedinUrl = 'https://www.linkedin.com/in/abhay-kumar-sharma-crocz/';
const emailAddress = 'abhay833345@gmail.com';
const phoneNumber = '+919062805799';

const skillGroups = [
  { title: 'Programming languages', skills: ['C', 'C++', 'Java', 'Python (basic)', 'SQL'] },
  { title: 'Database', skills: ['Oracle SQL', 'Joins', 'Subqueries', 'DDL / DML'] },
  { title: 'Web technologies', skills: ['HTML / CSS (basic)', 'Django (basic)'] },
  { title: 'Core concepts', skills: ['OOP', 'Basic data structures', 'Exception handling', 'Multithreading'] },
];

const sections = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['education', 'Education'],
  ['certification', 'Certification'],
  ['project', 'Project'],
  ['contact', 'Contact'],
] as const;

function StrandVisual() {
  return (
    <div className="orbit-art" aria-hidden="true">
      <svg className="orbit-svg" viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient id="strand" x1="113" y1="74" x2="482" y2="516" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C8ED83" stopOpacity=".04" />
            <stop offset=".48" stopColor="#DCEBC2" stopOpacity=".8" />
            <stop offset="1" stopColor="#C8ED83" stopOpacity=".08" />
          </linearGradient>
          <radialGradient id="core" cx="0" cy="0" r="1" gradientTransform="matrix(0 18 -18 0 300 300)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6FFB9" />
            <stop offset="1" stopColor="#C8ED83" stopOpacity=".2" />
          </radialGradient>
        </defs>
        <circle className="orbit-track" cx="300" cy="300" r="205" />
        <circle className="orbit-track" cx="300" cy="300" r="148" />
        <g className="strand-scroll">
          <g className="strand-rotation">
            <path className="orbit-line" d="M79 375C161 377 129 155 245 119c98-31 219 43 220 140 1 84-96 104-117 185-20 76 89 113 158 53" />
            <path className="orbit-line dim" d="M105 426c78-27 47-204 157-255 89-41 202 2 231 77 36 92-74 128-67 226 6 73 89 105 128 93" />
            <path className="orbit-line" d="M132 118c79 66 34 157 105 199 72 42 170-14 203 45 34 60-8 132-69 152" />
            <path className="orbit-line dim" d="M116 205c96-13 108 107 183 117 88 12 147-94 215-47 47 33 12 119-38 170" />
            <path className="orbit-line" d="M220 74c3 81-67 127-43 193 24 69 118 64 128 143 7 54-44 88-98 116" />
            <path className="orbit-line dim" d="M398 95c-61 66-81 139-31 184 49 44 141 37 139 113-1 59-67 97-125 132" />
            <path className="orbit-line" d="M68 295c90 50 115-37 197-39 93-3 106 98 188 93 46-3 72-45 89-88" />
          </g>
        </g>
        <circle cx="300" cy="300" r="13" fill="url(#core)" />
        <circle className="orbit-core" cx="300" cy="300" r="3" />
        <circle cx="97" cy="376" r="3" fill="#C8ED83" opacity=".7" />
        <circle cx="451" cy="161" r="2.5" fill="#DCEBC2" opacity=".7" />
      </svg>
      <span className="orbit-label">SYSTEMS IN MOTION · 01</span>
      <span className="orbit-caption">LEARNING / BUILDING / REPEATING</span>
    </div>
  );
}

function SocialLinks({ location }: { location: 'contact' | 'footer' }) {
  return (
    <div className={`social-links social-links-${location}`} aria-label="Professional profiles">
      <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile, opens in a new tab" data-testid={`${location}-github-link`}>
        <Github size={18} strokeWidth={1.7} aria-hidden="true" />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn profile, opens in a new tab" data-testid={`${location}-linkedin-link`}>
        <Linkedin size={18} strokeWidth={1.7} aria-hidden="true" />
      </a>
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-inner">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Abhay Kumar Sharma — Home" data-testid="brand-home">
          <span className="brand-mark" aria-hidden="true"><span>AK</span></span>
          <span>Abhay Kumar Sharma</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="navigation-menu-toggle"
        >
          {menuOpen ? <X size={21} strokeWidth={1.6} /> : <Menu size={21} strokeWidth={1.6} />}
        </button>
        <nav id="primary-navigation" className={`desktop-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          {sections.map(([id, label], index) => (
            <a key={id} href={`#${id}`} onClick={closeMenu} data-testid={`nav-${id}`}>
              <span className="nav-number">0{index + 1}</span>{label}
            </a>
          ))}
        </nav>
        <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress-fill" /></div>
      </div>
    </header>
  );
}

function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal, .scroll-reveal');
    const hero = document.querySelector<HTMLElement>('.hero');
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const documentTop = (element: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = element;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent instanceof HTMLElement ? current.offsetParent : null;
      }
      return top;
    };
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      if (reducedMotion.matches) {
        root.style.setProperty('--document-progress', '0');
        reveals.forEach((element) => {
          element.style.setProperty('--scroll-opacity', '1');
          element.style.setProperty('--scroll-y', '0px');
          element.style.setProperty('--scroll-scale', '1');
          element.style.setProperty('--scroll-blur', '0px');
        });
        if (hero) {
          hero.style.setProperty('--hero-progress', '0');
          hero.style.setProperty('--hero-content-opacity', '1');
          hero.style.setProperty('--hero-content-y', '0px');
          hero.style.setProperty('--hero-content-scale', '1');
          hero.style.setProperty('--hero-orbit-y', '0px');
          hero.style.setProperty('--hero-orbit-angle', '0deg');
          hero.style.setProperty('--hero-orbit-scale', '1');
          hero.style.setProperty('--hero-halo-opacity', '1');
          hero.style.setProperty('--hero-halo-scale', '1');
        }
        return;
      }
      const scrollY = window.scrollY;
      const revealFrames = Array.from(reveals, (element) => {
        const travel = viewportHeight + element.offsetHeight;
        const elementViewportTop = documentTop(element) - scrollY;
        const rawProgress = clamp((viewportHeight - elementViewportTop) / travel);
        const stagger = Number(element.dataset.scrollStagger ?? 0);
        const revealProgress = clamp((rawProgress - 0.08 - stagger * 0.018) / 0.38);
        return { element, revealProgress };
      });
      const heroProgress = hero ? clamp((scrollY - documentTop(hero)) / Math.max(hero.offsetHeight * 0.72, 1)) : 0;
      const scrollableHeight = root.scrollHeight - viewportHeight;
      const documentProgress = scrollableHeight > 0 ? clamp(scrollY / scrollableHeight) : 0;
      revealFrames.forEach(({ element, revealProgress }) => {
        element.style.setProperty('--scroll-opacity', revealProgress.toFixed(3));
        element.style.setProperty('--scroll-y', `${((1 - revealProgress) * 34).toFixed(1)}px`);
        element.style.setProperty('--scroll-scale', (0.975 + revealProgress * 0.025).toFixed(3));
        element.style.setProperty('--scroll-blur', `${((1 - revealProgress) * 3).toFixed(1)}px`);
      });
      if (hero) {
        const progress = heroProgress;
        const orbitScale = 1 + Math.sin(progress * Math.PI) * 0.13;
        hero.style.setProperty('--hero-progress', progress.toFixed(3));
        hero.style.setProperty('--hero-content-opacity', (1 - progress * 0.9).toFixed(3));
        hero.style.setProperty('--hero-content-y', `${(-progress * 66).toFixed(1)}px`);
        hero.style.setProperty('--hero-content-scale', (1 - progress * 0.045).toFixed(3));
        hero.style.setProperty('--hero-orbit-y', `${(progress * 46).toFixed(1)}px`);
        hero.style.setProperty('--hero-orbit-angle', `${(progress * 46).toFixed(1)}deg`);
        hero.style.setProperty('--hero-orbit-scale', orbitScale.toFixed(3));
        hero.style.setProperty('--hero-halo-opacity', (1 - progress * 0.4).toFixed(3));
        hero.style.setProperty('--hero-halo-scale', (1 + progress * 0.16).toFixed(3));
      }
      root.style.setProperty('--document-progress', documentProgress.toFixed(3));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <StrandVisual />
          <div className="hero-content">
            <div className="eyebrow hero-animate">Final-year student <span aria-hidden="true">/</span> CSE · 2023—2027</div>
            <h1 id="hero-title" className="hero-animate delay-1"><span>Abhay Kumar</span><span className="name-last">Sharma</span></h1>
            <div className="hero-role hero-animate delay-2"><span className="role-mark" aria-hidden="true" />Beginning a career in IT</div>
            <p className="hero-summary hero-animate delay-2">
              Final-year Computer Science &amp; Engineering student, preparing to begin my career in the IT industry.
            </p>
            <div className="hero-actions hero-animate delay-3">
              <a className="button-primary" href="#contact" data-testid="contact-me-link">Get in touch <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
              <a className="text-link" href="#about" data-testid="discover-link">Discover more <span aria-hidden="true"><ArrowDownRight size={15} /></span></a>
            </div>
          </div>
          <div className="hero-location">Kanchrapara · West Bengal · India</div>
          <div className="hero-index">01 — 08</div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-heading-column reveal">
            <div className="section-kicker">01 / A little about me</div>
            <h2 className="section-heading" id="about-title">Learning by<br /><em>doing.</em></h2>
          </div>
          <div className="about-copy reveal">
            <p>
              I am a final-year Computer Science &amp; Engineering student at Swami Vivekananda University. My studies and training have given me a foundation in programming, databases and web technologies. I am looking to begin my career in the IT industry.
            </p>
            <div className="about-note">B.Tech · 7th semester · 2023–2027</div>
          </div>
        </section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="skills-intro reveal">
            <div><div className="section-kicker">02 / Technical skills</div><h2 className="section-heading" id="skills-title">A foundation<br /><em>in the details.</em></h2></div>
            <p className="skills-intro-note">Programming, database, web technologies and concepts studied through coursework and training.</p>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group, index) => (
              <div className="skill-group reveal" key={group.title} data-testid={`skill-group-${index + 1}`}>
                <div className="skill-group-title">{`0${index + 1} / ${group.title}`}</div>
                <div className="skill-list">{group.skills.map((skill, skillIndex) => (
                  <span className="skill-chip scroll-reveal" data-scroll-stagger={skillIndex} key={skill}>{skill}</span>
                ))}</div>
              </div>
            ))}
          </div>
          <div className="soft-languages reveal">
            <div className="soft-block">
              <span className="micro-label">Soft skills</span>
              <p>Problem-solving &amp; analytical thinking <i>·</i> Attention to detail <i>·</i> Communication &amp; teamwork <i>·</i> Continuous learning</p>
            </div>
            <div className="soft-block">
              <span className="micro-label">Languages</span>
              <p>Bengali — Native <i>·</i> Hindi — Mother tongue <i>·</i> English — Intermediate (reading, writing, speaking)</p>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading reveal">
            <div className="section-kicker">03 / Internship experience</div>
            <h2 className="section-heading" id="experience-title">Learning<br /><em>in practice.</em></h2>
          </div>
          <article className="experience-entry reveal">
            <div className="entry-meta"><span>Remote internship</span><span>June—October 2023</span></div>
            <h3>Python with Django</h3>
            <div className="entry-organization">Euphoria Genx</div>
            <p>Developed server-side logic and database connectivity using Django, and applied Python OOP principles.</p>
            <div className="entry-project"><span className="micro-label">Project</span><span>Online Mechanic Booking application</span></div>
          </article>
        </section>

        <section className="section education-section" id="education" aria-labelledby="education-title">
          <div className="reveal">
            <div className="section-kicker">04 / Education</div>
            <h2 className="section-heading" id="education-title">The academic<br /><em>path.</em></h2>
          </div>
          <div className="education-list reveal">
            <article className="education-card">
              <div className="education-topline"><span>2023—2027 · Pursuing</span><span>01</span></div>
              <p className="education-degree">B.Tech</p>
              <p className="education-branch">Computer Science &amp; Engineering</p>
              <p className="education-university">Swami Vivekananda University</p>
              <div className="education-detail">7th semester · 5th semester SGPA: 7.17</div>
            </article>
            <article className="education-card">
              <div className="education-topline"><span>2021—2024</span><span>02</span></div>
              <p className="education-degree">Diploma</p>
              <p className="education-branch">Electronics &amp; Telecommunication Engineering</p>
              <p className="education-university">JIS School of Polytechnic, West Bengal <span className="education-affiliation">(WBSCTE&amp;VSD)</span></p>
              <div className="education-detail">75.8% · First Class with Distinction</div>
            </article>
            <article className="education-card">
              <div className="education-topline"><span>2021</span><span>03</span></div>
              <p className="education-degree">Class X</p>
              <p className="education-branch">CBSE</p>
              <p className="education-university">Kanchrapara Harnett English Medium School</p>
              <div className="education-detail">62.8%</div>
            </article>
          </div>
        </section>

        <section className="section certification-section" id="certification" aria-labelledby="certification-title">
          <div className="cert-heading reveal">
            <div className="section-kicker">05 / Certification</div>
            <h2 className="section-heading" id="certification-title">Advanced IT<br /><em>Coding &amp; Programming.</em></h2>
          </div>
          <div className="cert-content reveal">
            <div className="cert-topline"><span>AITCP · AIMS, Kanchrapara</span><span>April 2024—September 2025</span></div>
            <div className="cert-outcome"><span>18 months</span><span>95% · A+</span></div>
            <div className="cert-topics">
              <div><span className="micro-label">C / C++</span><p>OOP, pointers, inheritance, polymorphism, file handling</p></div>
              <div><span className="micro-label">Java</span><p>OOP, inheritance, threading, exception handling, AWT</p></div>
              <div><span className="micro-label">Oracle SQL</span><p>Joins, subqueries, DDL, DML, TCL, aggregate functions</p></div>
            </div>
          </div>
        </section>

        <section className="section project-section" id="project" aria-labelledby="project-title">
          <div className="project-index reveal"><span className="section-kicker">06 / Project</span><span className="project-index-number">01</span></div>
          <article className="project-card reveal">
            <div className="project-label">Built during internship · Euphoria Genx</div>
            <h2 id="project-title">Online Mechanic<br /><em>Booking application.</em></h2>
            <p>Developed server-side logic and database connectivity using Django, applying Python OOP principles.</p>
            <div className="project-stack"><span>Python</span><span>Django</span></div>
          </article>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner">
            <div className="reveal"><div className="section-kicker">07 / Contact</div><h2 className="contact-heading" id="contact-title">Let’s talk<span>about what’s next.</span></h2></div>
            <div className="contact-details reveal">
              <p className="contact-copy">I am seeking to begin my career in the IT industry. Reach me through email, phone, or my professional profiles.</p>
              <a className="contact-method" href={`mailto:${emailAddress}`} data-testid="contact-email-link"><Mail size={17} aria-hidden="true" /><span>{emailAddress}</span><ArrowUpRight size={14} aria-hidden="true" /></a>
              <a className="contact-method" href={`tel:${phoneNumber}`} data-testid="contact-phone-link"><Phone size={17} aria-hidden="true" /><span>+91 90628 05799</span><ArrowUpRight size={14} aria-hidden="true" /></a>
              <SocialLinks location="contact" />
            </div>
          </div>
          <div className="contact-bottom"><span>Kanchrapara, North 24 Parganas</span><span>West Bengal, India</span></div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <a className="footer-name" href="#home">Abhay Kumar Sharma</a>
          <span>© {new Date().getFullYear()}</span>
          <SocialLinks location="footer" />
          <a href="#home" className="back-top" data-testid="back-to-top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
