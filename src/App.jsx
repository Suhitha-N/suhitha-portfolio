import { useEffect, useRef, useState } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "CareerPilot AI",
    type: "AI CAREER PLATFORM",
    description:
      "An AI-powered placement and career platform designed to help students prepare, discover opportunities and manage their career journey through intelligent assistance.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Ollama"],
    github: "https://github.com/Suhitha-N/CareerPilot-AI",
    visual: "CAREER",
  },
  {
    number: "02",
    title: "Biometric MFA",
    type: "SECURITY SYSTEM",
    description:
      "A multi-factor authentication system combining password verification, facial recognition and a secret hand gesture with liveness detection, RBAC and security logging.",
    stack: ["Python", "OpenCV", "MediaPipe", "bcrypt", "Fernet"],
    github: "https://github.com/Suhitha-N/Biometric-MFA-V2",
    visual: "IDENTITY",
  },
  {
    number: "03",
    title: "Expert Decision Replay",
    type: "ENTERPRISE PLATFORM",
    description:
      "An enterprise decision management platform for capturing, reviewing and replaying complex decisions with version history, approvals, discussions, analytics and audit trails.",
    stack: ["FastAPI", "PostgreSQL", "JavaScript", "Docker", "Ollama"],
    github:
      "https://github.com/Suhitha-N/Expert-Decision-Replay-Platform-Group-2",
    visual: "DECISION",
  },
];

const skills = [
  "Python",
  "Java",
  "SQL",
  "JavaScript",
  "React",
  "HTML / CSS",
  "FastAPI",
  "Flask",
  "REST APIs",
  "PostgreSQL",
  "MySQL",
  "Power BI",
  "Excel",
  "OpenCV",
  "MediaPipe",
  "Ollama",
  "Git",
  "GitHub",
  "Docker",
  "DSA",
  "OOP",
  "DBMS",
];

const experience = [
  {
    year: "2026",
    company: "UptoSkills",
    role: "Data Mining & Data Analytics Intern",
    period: "JUN — AUG 2026",
    text:
      "Worked on data mining and analytics tasks, transforming datasets into meaningful insights and working with analytical workflows.",
  },
  {
    year: "2026",
    company: "Infosys Springboard",
    role: "Python Domain Intern",
    period: "JUN — AUG 2026",
    text:
      "Worked in the Python domain with practical development tasks, problem solving and application-oriented programming.",
  },
  {
    year: "2026",
    company: "SmartBridge / ServiceNow",
    role: "ServiceNow Virtual Intern",
    period: "JUL 2026",
    text:
      "Explored ServiceNow platform concepts and enterprise workflow technologies through a virtual internship experience.",
  },
];

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  /* CURSOR */
  useEffect(() => {
    const moveCursor = (e) => {
      if (!cursorRef.current || !glowRef.current) return;

      cursorRef.current.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      glowRef.current.animate(
        {
          transform:
            `translate3d(${e.clientX - 180}px, ${e.clientY - 180}px, 0)`,
        },
        {
          duration: 700,
          fill: "forwards",
          easing: "cubic-bezier(.2,.8,.2,1)",
        }
      );
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  /* ACTIVE SECTION
     Track the section that has actually reached the top of the viewport.
     This avoids the previous IntersectionObserver state where ABOUT could
     become active while the page was still showing the bottom of HERO. */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const headerOffset = window.innerWidth <= 760 ? 72 : 86;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + headerOffset + 8;
      let current = "hero";

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  /* MAGNETIC ELEMENTS */
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".magnetic, .circle-link, .github-link, .email-link"
    );

    const handlers = [];

    elements.forEach((element) => {
      const move = (e) => {
        const rect = element.getBoundingClientRect();

        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        element.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;
      };

      const leave = () => {
        element.style.transform = "";
      };

      element.addEventListener("mousemove", move);
      element.addEventListener("mouseleave", leave);

      handlers.push({ element, move, leave });
    });

    return () => {
      handlers.forEach(({ element, move, leave }) => {
        element.removeEventListener("mousemove", move);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);
  /* BUBBLE MOUSE INTERACTION */
  useEffect(() => {
    const bubbles = document.querySelectorAll(".rain-bubbles span");

    const handleMouseMove = (e) => {
      bubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();

        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const force = (130 - distance) / 130;

          bubble.style.marginLeft = `${-dx * force * 0.18}px`;
          bubble.style.marginTop = `${-dy * force * 0.18}px`;
        } else {
          bubble.style.marginLeft = "";
          bubble.style.marginTop = "";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  /* REVEAL ANIMATION */
  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  /* SECTION NAVIGATION
     Do not use scrollIntoView here. With the fixed navbar and the animated
     sections, browser scroll-margin/overflow calculations can leave the
     previous section visible above the target. Calculate the exact document
     position ourselves so every section lands at the same place. */
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const headerOffset = window.innerWidth <= 760 ? 72 : 86;
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;
    const targetY = Math.max(0, sectionTop - headerOffset);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="portfolio">

      {/* CURSOR */}
      <div className="cursor-dot" ref={cursorRef}></div>
      <div className="cursor-glow" ref={glowRef}></div>

      {/* AMBIENT BACKGROUND */}
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      {/* MOVING BUBBLES */}
      <div className="rain-bubbles" aria-hidden="true">
      {Array.from({ length:90 }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 67 + 13) % 100}%`,
            width: `${5 + (i % 5) * 2}px`,
            height: `${5 + (i % 5) * 2}px`,
            animationDuration: `${18 + (i % 10) * 2}s`,
            animationDelay: `-${(i % 20) * 1.7}s`,
            "--drift": `${-50 + (i % 11) * 10}px`,
          }}
        />
      ))}
      </div>
      
      {/* NAVIGATION */}
      <header className="navbar">
        <button
          className="brand"
          onClick={() => scrollToSection("hero")}
          aria-label="Go to top"
        >
          SN<span>.</span>
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>

          <button
            className={activeSection === "about" ? "active" : ""}
            onClick={() => { scrollToSection("about"); setMenuOpen(false); }}
          >
            ABOUT
          </button>

          <button
            className={activeSection === "experience" ? "active" : ""}
            onClick={() => { scrollToSection("experience"); setMenuOpen(false); }}
          >
            EXPERIENCE
          </button>

          <button
            className={activeSection === "work" ? "active" : ""}
            onClick={() => { scrollToSection("work"); setMenuOpen(false); }}
          >
            WORK
          </button>

          <button
            className={activeSection === "skills" ? "active" : ""}
            onClick={() => { scrollToSection("skills"); setMenuOpen(false); }}
          >
            SKILLS
          </button>

          <button
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => { scrollToSection("contact"); setMenuOpen(false); }}
          >
            CONTACT
          </button>

        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <main>

        {/* =====================================
            HERO
        ===================================== */}

        <section className="hero section" id="hero">

          <div className="hero-top reveal">
            <span className="eyebrow">
              COMPUTER SCIENCE
            </span>

            <span className="hero-location">
              INDIA <i></i> DATA + DEVELOPMENT
            </span>
          </div>

          <div className="hero-content">

            <div className="hero-title reveal">

              <div className="title-line">
                <span>SUHITHA</span>
              </div>

              <div className="title-line title-outline">
                <span>NATAKAM</span>
              </div>

            </div>

            <div className="hero-side reveal">

              <div className="hero-status">
                <span className="status-dot"></span>
                <span>OPEN TO OPPORTUNITIES</span>
              </div>

              <div className="hero-mark">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>
                I build digital products where
                <strong> data, design and development </strong>
                work together.
              </p>

              <button
                className="circle-link magnetic"
                onClick={() => scrollToSection("work")}
                type="button"
                aria-label="View selected work"
              >
                <span>
                  VIEW
                  <br />
                  WORK
                </span>

                <b>↘</b>
              </button>

            </div>

          </div>

          <div className="hero-bottom reveal">

            <div className="role-strip">
              <span>DATA ANALYST</span>
              <i>✦</i>

              <span>FULL-STACK DEVELOPER</span>
              <i>✦</i>

              <span>PYTHON DEVELOPER</span>
              <i>✦</i>

              <span>PRODUCT BUILDER</span>
            </div>

            <div className="scroll-note">
              <span className="scroll-line"></span>
              SCROLL TO EXPLORE
            </div>

          </div>

        </section>

        {/* =====================================
            ABOUT
        ===================================== */}

        <section className="about section" id="about">

          <div className="section-heading reveal">
            <span>01</span>
            <p>ABOUT</p>
          </div>

          <div className="about-grid">

            <div className="about-statement reveal">

              <p className="small-label">
                A LITTLE ABOUT ME
              </p>

              <h2>
                CURIOUS
                <br />
                BY NATURE.
                <br />
                <em>BUILDER</em>
                <br />
                BY CHOICE.
              </h2>

            </div>

            <div className="about-copy reveal">

              <p className="large-copy">
                I’m <strong>Suhitha Natakam</strong>, a Computer
                Science Engineering student focused on turning ideas
                into useful digital experiences.
              </p>

              <p>
                My work sits between data analytics and full-stack
                development. I enjoy understanding a problem, breaking
                it down and building something practical around it.
              </p>

              <p>
                From analytics dashboards and Python systems to
                full-stack applications and security-focused projects,
                I like working across the complete journey — from
                logic to interface.
              </p>

              <div className="about-meta">

                <div>
                  <span>EDUCATION</span>
                  <strong>B.TECH — CSE</strong>
                </div>

                <div>
                  <span>COLLEGE</span>
                  <strong>NARAYANA ENGINEERING COLLEGE</strong>
                </div>

                <div>
                  <span>FOCUS</span>
                  <strong>DATA + DEVELOPMENT</strong>
                </div>

              </div>

            </div>

          </div>

          <div className="marquee">

            <div className="marquee-track">

              <span>THINK</span>
              <i>✦</i>

              <span>BUILD</span>
              <i>✦</i>

              <span>ANALYZE</span>
              <i>✦</i>

              <span>IMPROVE</span>
              <i>✦</i>

              <span>THINK</span>
              <i>✦</i>

              <span>BUILD</span>
              <i>✦</i>

              <span>ANALYZE</span>
              <i>✦</i>

              <span>IMPROVE</span>
              <i>✦</i>

            </div>

          </div>

        </section>

        {/* =====================================
            EXPERIENCE
        ===================================== */}

        <section
          className="experience section"
          id="experience"
        >

          <div className="section-heading light reveal">
            <span>02</span>
            <p>EXPERIENCE</p>
          </div>

          <div className="experience-intro reveal">

            <h2>
              LEARNING
              <br />
              <em>BY DOING.</em>
            </h2>

            <p>
              Real-world exposure across analytics, Python
              development and enterprise technologies.
            </p>

          </div>

          <div className="experience-list">

            {experience.map((item, index) => (

              <div
                className="experience-row reveal"
                key={item.company}
              >

                <div className="experience-number">
                  {item.year}
                </div>

                <div className="experience-company">

                  <span>{item.period}</span>

                  <h3>
                    {item.company}
                  </h3>

                </div>

                <div className="experience-role">

                  <h4>
                    {item.role}
                  </h4>

                  <p>
                    {item.text}
                  </p>

                </div>

                <div className="experience-arrow">
                  ↗
                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =====================================
            SELECTED WORK
        ===================================== */}

        <section className="work section" id="work">

          <div className="section-heading reveal">
            <span>03</span>
            <p>SELECTED WORK</p>
          </div>

          <div className="work-header reveal">

            <h2>
              THINGS
              <br />
              I’VE <em>BUILT.</em>
            </h2>

            <p>
              A selection of projects exploring AI, security,
              enterprise systems and practical product development.
            </p>

          </div>

          <div className="project-showcase">

            <div className="project-preview reveal">

              <div className="preview-top">
                <span>
                  {projects[activeProject].number}
                </span>

                <span>
                  {projects[activeProject].type}
                </span>
              </div>

              <div className="preview-center">

                <div
                  className={`project-art art-${activeProject}`}
                >

                  <div className="art-grid"></div>

                  <div className="art-word">
                    {projects[activeProject].visual}
                  </div>

                  <div className="art-corner top-left"></div>

                  <div className="art-corner bottom-right"></div>

                  <div className="art-line line-one"></div>

                  <div className="art-line line-two"></div>

                  <span className="art-small">
                    SUHITHA / PROJECT{" "}
                    {projects[activeProject].number}
                  </span>

                </div>

              </div>

              <div className="preview-bottom">
                <span>SELECTED PROJECT</span>
                <span>2026</span>
              </div>

            </div>

            <div className="project-list">

              {projects.map((project, index) => (

                <article
                  className={`project-item ${
                    activeProject === index ? "selected" : ""
                  }`}
                  key={project.title}
                  onMouseEnter={() =>
                    setActiveProject(index)
                  }
                  onClick={() =>
                    setActiveProject(index)
                  }
                >

                  <div className="project-number">
                    {project.number}
                  </div>

                  <div className="project-main">

                    <span>
                      {project.type}
                    </span>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="project-stack">

                      {project.stack.map((tech) => (
                        <span key={tech}>
                          {tech}
                        </span>
                      ))}

                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="github-link magnetic"
                    >
                      VIEW ON GITHUB
                      <span>↗</span>
                    </a>

                  </div>

                  <div className="project-index-arrow">
                    {activeProject === index
                      ? "●"
                      : "○"}
                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>

        {/* =====================================
            SKILLS
        ===================================== */}

        <section className="skills section" id="skills">

          <div className="section-heading reveal">
            <span>04</span>
            <p>SKILLS</p>
          </div>

          <div className="skills-title reveal">

            <h2>
              TOOLS I
              <br />
              <em>THINK WITH.</em>
            </h2>

            <p>
              A practical toolkit built through projects,
              internships, coursework and continuous
              experimentation.
            </p>

          </div>

          <div className="skills-context reveal">
            <span>CORE STACK</span>
            <span>AI + DEVELOPMENT</span>
            <span>DATA + ANALYTICS</span>
            <span>TOOLS + SYSTEMS</span>
          </div>

          <div className="skills-field reveal">

            {skills.map((skill, index) => (

              <span
                key={skill}
                className={`skill-tag skill-${index % 5}`}
              >
                {skill}
              </span>

            ))}

          </div>

          <div className="skill-bottom reveal">

            <span>01 — PROGRAMMING</span>
            <span>02 — DEVELOPMENT</span>
            <span>03 — DATA</span>
            <span>04 — TOOLS</span>

          </div>

        </section>

        {/* =====================================
            CONTACT
        ===================================== */}

        <section className="contact section" id="contact">

          <div className="section-heading light reveal">
            <span>05</span>
            <p>CONTACT</p>
          </div>

          <div className="contact-main reveal">

            <p className="small-label">
              HAVE AN IDEA?
            </p>

            <h2>
              LET’S
              <br />
              <em>MAKE</em>
              <br />
              SOMETHING.
            </h2>

            <a
              className="email-link magnetic"
              href="mailto:suhithanatakam@gmail.com"
            >
              suhithanatakam@gmail.com
              <span>↗</span>
            </a>

          </div>

          <div className="contact-footer reveal">

            <div className="contact-socials">

              <a
                href="https://github.com/Suhitha-N"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB
              </a>

              <a
                href="https://www.linkedin.com/in/suhitha-natakam/"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN
              </a>

            </div>

            <div className="footer-right">
              <span>SUHITHA NATAKAM</span>
            </div>

          </div>

          <div className="contact-orb"></div>

        </section>

      </main>
    </div>
  );
}

export default App;