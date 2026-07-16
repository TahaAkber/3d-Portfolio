import { useEffect, useState } from "react";
import {
  getPortfolioData,
  PortfolioData,
  Project,
  SkillGroup,
  ExperienceEntry,
  EducationEntry,
  Certification,
} from "./data/portfolioData";
import PortfolioScene from "./components/PortfolioScene";
import AmbientBackground from "./components/AmbientBackground";
import "./App.css";

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setPortfolio(getPortfolioData());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load portfolio data.";
      setError(message);
    }
  }, []);

  const projectCards: Project[] =
    portfolio?.projects.filter(
      (project: Project) => project.name && project.description,
    ) ?? [];

  return (
    <div className="App">
      <AmbientBackground />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Taha Akber — home">
          <span className="brand-mark">TA</span>
          <span className="brand-copy">
            <strong>{portfolio?.name ?? "Taha Akber"}</strong>
            <small>{portfolio?.title ?? "Software Engineer"}</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
        </nav>
        <a className="header-contact" href="#contact">Let’s talk <span>↗</span></a>
      </header>

      <main id="top">
      <div className="hero-grid">
        <div className="intro-panel">
          <div className="hero-kicker">
            <span className="eyebrow">{portfolio?.title ?? "Software Engineer"}</span>
            <span className="availability"><i /> Available for opportunities</span>
          </div>
          <h1>{portfolio?.name ?? "Taha Akber"}</h1>
          <p>
            {portfolio?.bio ??
              "I build polished, future-ready web experiences with TypeScript, modern React, and dark UI systems."}
          </p>
          <div className="hero-actions">
            <a className="action-button primary" href="#projects">
              Explore Projects
            </a>
            <a className="action-button secondary" href="#contact">
              Contact Me
            </a>
          </div>
          <div className="hero-footnote">
            <span>Based in {portfolio?.location ?? "Remote / Worldwide"}</span>
            <span>React · TypeScript · Modern Web</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="scene-frame">
            <PortfolioScene />
          </div>
          <div className="hero-card-content">
            <div className="hero-card-header">
              <div>
                <span className="tag">Professional Story</span>
                <h2>Focused on quality, speed, and modern architecture.</h2>
              </div>
            </div>
            <div className="hero-stats">
              <article>
                <span>Clean code</span>
                <strong>Type-safe systems</strong>
              </article>
              <article>
                <span>UX driven</span>
                <strong>Motion & 3D feel</strong>
              </article>
              <article>
                <span>Fast delivery</span>
                <strong>Production ready</strong>
              </article>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-panel" role="alert">
          <strong>Oops:</strong> {error}
        </div>
      )}

      <section className="section-panel" id="about">
        <div className="section-header">
          <span className="section-label">About</span>
          <h3>Professional profile</h3>
        </div>
        <p>
          I’m a software engineer building elegant and high-performance web
          applications with a strong focus on detail, design, and modern
          front-end architecture. I create immersive interfaces that blend
          robust engineering with a sleek, futuristic digital aesthetic.
        </p>
      </section>

      <section className="section-panel" id="skills">
        <div className="section-header">
          <span className="section-label">Skills</span>
          <h3>Technologies and tools</h3>
        </div>
        <div className="skill-grid">
          {portfolio?.skills.map((skill: SkillGroup) => (
            <article key={skill.category} className="skill-card">
              <h4>{skill.category}</h4>
              <div className="skill-badges">
                {skill.items.map((item: string) => (
                  <span key={item} className="badge">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel" id="projects">
        <div className="section-header">
          <span className="section-label">Projects</span>
          <h3>Selected work</h3>
        </div>
        <div className="project-grid">
          {projectCards.length > 0 ? (
            projectCards.map((project: Project) => (
              <article key={project.name} className="project-card">
                <div className="project-card-top">
                  <span>{project.category}</span>
                  {project.links?.length ? (
                    <div className="project-links">
                      {project.links.map((link) => (
                        <a
                          className="project-link"
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          key={link.url}
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="project-link disabled">
                      {project.name === "Sales Channel" ? "Private integration" : "Private project"}
                    </span>
                  )}
                </div>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className="tech-list">
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="project-empty">
              <p>
                No project links were provided yet. Update{" "}
                <code>src/data/portfolioData.ts</code> with your project URLs.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-panel" id="experience">
        <div className="section-header">
          <span className="section-label">Experience</span>
          <h3>Career highlights</h3>
        </div>
        <div className="experience-grid">
          {portfolio?.experience.map((entry: ExperienceEntry) => (
            <article
              key={`${entry.company}-${entry.role}`}
              className="experience-card"
            >
              <div className="experience-header">
                <div>
                  <h4>{entry.role}</h4>
                  <p>{entry.company}</p>
                </div>
                <span>{entry.period}</span>
              </div>
              <ul>
                {entry.details.map((detail: string) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel" id="education">
        <div className="section-header">
          <span className="section-label">Education</span>
          <h3>Academic foundation</h3>
        </div>
        <div className="credentials-grid">
          <div className="credential-column">
            {portfolio?.education.map((entry: EducationEntry) => (
              <article className="credential-card" key={entry.degree}>
                <span>{entry.period}</span>
                <h4>{entry.degree}</h4>
                <p>{entry.institution}</p>
              </article>
            ))}
          </div>
          <div className="credential-column">
            {portfolio?.certifications.map((item: Certification) => (
              <article className="credential-card" key={item.name}>
                <span>{item.date} · {item.issuer}</span>
                <h4>{item.name}</h4>
                <p>Professional certification</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-panel contact-panel" id="contact">
        <div className="section-header">
          <span className="section-label">Get in touch</span>
          <h3>Let’s build something futuristic.</h3>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h4>Email</h4>
            <a href={`mailto:${portfolio?.email ?? "hello@tahaakber.dev"}`}>
              {portfolio?.email ?? "hello@tahaakber.dev"}
            </a>
          </div>
          <div className="contact-card">
            <h4>Phone &amp; Location</h4>
            <a href={`tel:${portfolio?.phone.replace(/\s/g, "") ?? "+923462999417"}`}>
              {portfolio?.phone ?? "+92 346 2999417"}
            </a>
            <p>{portfolio?.location ?? "Karachi, Pakistan"}</p>
          </div>
          <div className="contact-card resume-card">
            <h4>Resume</h4>
            <p>
              CV details and professional experience drafted for a strong
              technical portfolio.
            </p>
            <a className="action-button tertiary" href="/Taha-Akber-CV.pdf" download>
              Download CV
            </a>
          </div>
        </div>
      </section>
      </main>

      <footer className="site-footer">
        <div className="footer-primary">
          <span className="footer-monogram">TA</span>
          <div>
            <p>Designed &amp; engineered by</p>
            <h2>{portfolio?.name ?? "Taha Akber"}</h2>
            <span>{portfolio?.title ?? "Software Engineer"}</span>
          </div>
        </div>
        <div className="footer-details">
          <div>
            <span>Email</span>
            <a href={`mailto:${portfolio?.email ?? "hello@tahaakber.dev"}`}>
              {portfolio?.email ?? "hello@tahaakber.dev"}
            </a>
          </div>
          <div>
            <span>Location</span>
            <strong>{portfolio?.location ?? "Remote / Worldwide"}</strong>
          </div>
          <a className="back-to-top" href="#top" aria-label="Back to top">↑</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {portfolio?.name ?? "Taha Akber"}</span>
          <span>Built with React, TypeScript &amp; Three.js</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
