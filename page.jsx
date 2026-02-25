"use client";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Contact"];

const SKILLS = [
  { icon: "⚙️", label: "Backend" },
  { icon: "🖥️", label: "Frontend" },
  { icon: "🗄️", label: "Database" },
  { icon: "☁️", label: "Cloud Services" },
  { icon: "🔧", label: "DevOps" },
  { icon: "🔒", label: "Security" },
];

const EXPERIENCE = [
  {
    title: "Senior Full-Stack Engineer",
    company: "TechFlow Solutions Inc.",
    period: "2021 — Present",
    current: true,
    desc: "Leading a team of 5 engineers to modernize a legacy fintech platform. Reduced infrastructure costs by 40% through AWS migration and implemented microservices architecture using Go and Kubernetes.",
  },
  {
    title: "Software Engineer",
    company: "BrightDigital Media",
    period: "2018 — 2021",
    current: false,
    desc: "Developed high-traffic web applications for Fortune 500 clients. Focused on performance optimization, SEO best practices, and building reusable UI component libraries with React and TypeScript.",
  },
  {
    title: "Junior Web Developer",
    company: "StartupX Launchpad",
    period: "2016 — 2018",
    current: false,
    desc: "Contributed to rapid prototyping of MVP products for early-stage startups. Gained extensive experience in PHP, JavaScript, and responsive CSS frameworks.",
  },
];

const PHILOSOPHY = [
  "Clean Code",
  "User-Centric Design",
  "Continuous Learning",
  "Collaborative Problem Solving",
];

export default function AlexPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null | "loading" | "success" | "error"
  const [submitMessage, setSubmitMessage] = useState("");
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMessage(data.message || "Message sent successfully!");
        setFormData({ email: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please check your connection and try again.");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (submitStatus) setSubmitStatus(null);
  };

  return (
    <div style={styles.root}>
      <style>{cssString}</style>

      {/* Navbar */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>{"<>"}</span>
            <span style={styles.logoText}>Alex.dev</span>
          </div>
          <div style={styles.navLinks}>
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                style={styles.navLink}
                className="nav-link"
              >
                {l}
              </button>
            ))}
            <button style={styles.resumeBtn} className="resume-btn">
              Resume
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero} ref={heroRef}>
        <div style={styles.heroContent} className="fade-in">
          <p style={styles.heroTag}>✦ AVAILABLE FOR NEW OPPORTUNITIES</p>
          <h1 style={styles.heroTitle}>
            Hi, I'm <span style={styles.accent}>Alex</span>, a Full-Stack
            Software Engineer building scalable and elegant web solutions.
          </h1>
          <p style={styles.heroSub}>
            I specialize in building robust backend systems and intuitive
            frontend experiences using modern architectures and industry best
            practices.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.primaryBtn} className="primary-btn">
              View My Work
            </button>
            <button style={styles.outlineBtn} className="outline-btn">
              Contact Me
            </button>
          </div>
        </div>
        <div style={styles.heroImageWrap} className="fade-in-right">
          <div style={styles.heroImageInner}>
            <img
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"
              alt="Workspace"
              style={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <p style={styles.aboutText}>
            I am a passionate software engineer with a strong foundation in both
            frontend and backend technologies. I enjoy solving complex problems
            and building efficient, user-centric applications. With a background
            in computer science and years of hands-on experience, I bring a
            holistic perspective to every project I work on.
          </p>
          <h3 style={styles.subTitle}>Core Philosophy</h3>
          <div style={styles.philosophyGrid}>
            {PHILOSOPHY.map((p) => (
              <div key={p} style={styles.philosophyCard} className="card-hover">
                <span style={styles.checkIcon}>✓</span>
                <span style={styles.philosophyText}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ ...styles.section, ...styles.darkSection }}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
            Technical Toolkit
          </h2>
          <p style={styles.sectionSub}>
            Continuously evolving and mastering the technologies that power
            modern web applications.
          </p>
          <div style={styles.skillsGrid}>
            {SKILLS.map((s) => (
              <div key={s.label} style={styles.skillCard} className="skill-card">
                <span style={styles.skillIcon}>{s.icon}</span>
                <span style={styles.skillLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={styles.section}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
            Journey &amp; Experience
          </h2>
          <div style={styles.timeline}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={styles.timelineItem} className="timeline-item">
                <div style={styles.timelineDot(e.current)} />
                <div style={styles.timelineContent}>
                  <div style={styles.timelineHeader}>
                    <h3 style={styles.jobTitle}>{e.title}</h3>
                    <span
                      style={{
                        ...styles.periodBadge,
                        ...(e.current ? styles.currentBadge : {}),
                      }}
                    >
                      {e.period}
                    </span>
                  </div>
                  <p style={styles.company}>{e.company}</p>
                  <p style={styles.jobDesc}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ ...styles.section, ...styles.darkSection }}>
        <div style={styles.contactGrid}>
          <div style={styles.contactLeft}>
            <h2 style={styles.contactTitle}>
              Let&apos;s build something{" "}
              <span style={styles.accent}>extraordinary</span> together.
            </h2>
            <p style={styles.contactSub}>
              Currently open to new projects, collaborations, and engineering
              roles.
            </p>
            <div style={styles.socialIcons}>
              <button style={styles.socialIcon} className="social-icon">✉</button>
              <button style={styles.socialIcon} className="social-icon">🔗</button>
              <button style={styles.socialIcon} className="social-icon">⬆</button>
            </div>
          </div>
          <div style={styles.contactForm}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              className="form-input"
              value={formData.email}
              onChange={handleChange("email")}
            />
            {errors.email && (
              <span style={styles.errorText}>⚠ {errors.email}</span>
            )}

            <label style={{ ...styles.label, marginTop: 16 }}>How can I help?</label>
            <textarea
              placeholder="Tell me about your project..."
              style={{
                ...styles.textarea,
                ...(errors.message ? styles.inputError : {}),
              }}
              className="form-input"
              rows={5}
              value={formData.message}
              onChange={handleChange("message")}
            />
            {errors.message && (
              <span style={styles.errorText}>⚠ {errors.message}</span>
            )}

            {/* Status feedback banner */}
            {submitStatus === "success" && (
              <div style={styles.successBanner}>
                ✅ {submitMessage}
              </div>
            )}
            {submitStatus === "error" && (
              <div style={styles.errorBanner}>
                ❌ {submitMessage}
              </div>
            )}

            <button
              style={{
                ...styles.sendBtn,
                ...(submitStatus === "loading" ? styles.sendBtnDisabled : {}),
              }}
              className="primary-btn"
              onClick={handleSubmit}
              disabled={submitStatus === "loading"}
            >
              {submitStatus === "loading" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2024 Alex Developer. Built with passion and clean code.
        </p>
        <div style={styles.footerLinks}>
          {["Github", "LinkedIn", "Twitter"].map((l) => (
            <a key={l} href="#" style={styles.footerLink} className="nav-link">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    backgroundColor: "#0a0a0f",
    color: "#e8e8f0",
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    minHeight: "100vh",
    lineHeight: 1.6,
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "16px 0",
    transition: "all 0.3s ease",
  },
  navScrolled: {
    backgroundColor: "rgba(10,10,15,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  navInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    color: "#4f6ef7",
    fontWeight: 700,
    fontSize: 18,
    fontFamily: "monospace",
  },
  logoText: {
    fontWeight: 700,
    fontSize: 17,
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  navLink: {
    background: "none",
    border: "none",
    color: "#aab0c0",
    fontSize: 14,
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: 6,
    transition: "color 0.2s",
    fontFamily: "inherit",
  },
  resumeBtn: {
    background: "#4f6ef7",
    border: "none",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
    padding: "8px 20px",
    borderRadius: 8,
    fontWeight: 600,
    fontFamily: "inherit",
    transition: "background 0.2s",
    marginLeft: 8,
  },
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "140px 32px 100px",
    display: "flex",
    alignItems: "center",
    gap: 60,
  },
  heroContent: {
    flex: 1,
  },
  heroTag: {
    color: "#4f6ef7",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
    fontWeight: 800,
    lineHeight: 1.12,
    color: "#fff",
    marginBottom: 24,
    letterSpacing: "-0.02em",
  },
  accent: {
    color: "#4f6ef7",
  },
  heroSub: {
    fontSize: 16,
    color: "#8892a4",
    maxWidth: 420,
    marginBottom: 36,
  },
  heroBtns: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#4f6ef7",
    border: "none",
    color: "#fff",
    padding: "13px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "transform 0.15s, background 0.2s",
  },
  outlineBtn: {
    background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.2)",
    color: "#e8e8f0",
    padding: "13px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  heroImageWrap: {
    flex: "0 0 340px",
  },
  heroImageInner: {
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  heroImage: {
    width: "100%",
    height: 280,
    objectFit: "cover",
    display: "block",
  },
  section: {
    padding: "100px 0",
  },
  darkSection: {
    backgroundColor: "#0d0d14",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "0 32px",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    fontWeight: 700,
    color: "#fff",
    marginBottom: 20,
    letterSpacing: "-0.02em",
  },
  sectionSub: {
    textAlign: "center",
    color: "#8892a4",
    fontSize: 15,
    maxWidth: 500,
    margin: "0 auto 60px",
  },
  aboutText: {
    color: "#8892a4",
    fontSize: 15,
    maxWidth: 560,
    marginBottom: 40,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 20,
  },
  philosophyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    maxWidth: 500,
  },
  philosophyCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "14px 16px",
    transition: "border-color 0.2s",
  },
  checkIcon: {
    color: "#4f6ef7",
    fontSize: 16,
    fontWeight: 700,
  },
  philosophyText: {
    fontSize: 14,
    color: "#c8cfe0",
    fontWeight: 500,
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 16,
  },
  skillCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding: "28px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    cursor: "default",
    transition: "border-color 0.2s, transform 0.2s",
  },
  skillIcon: {
    fontSize: 28,
  },
  skillLabel: {
    fontSize: 13,
    color: "#c8cfe0",
    fontWeight: 500,
    textAlign: "center",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    maxWidth: 760,
    margin: "60px auto 0",
    position: "relative",
    paddingLeft: 32,
    borderLeft: "2px solid rgba(255,255,255,0.08)",
  },
  timelineItem: {
    position: "relative",
    paddingBottom: 48,
    paddingLeft: 32,
  },
  timelineDot: (current) => ({
    position: "absolute",
    left: -41,
    top: 6,
    width: 14,
    height: 14,
    borderRadius: "50%",
    backgroundColor: current ? "#4f6ef7" : "#3a3a4a",
    border: "2px solid " + (current ? "#4f6ef7" : "#3a3a4a"),
    boxShadow: current ? "0 0 16px rgba(79,110,247,0.5)" : "none",
  }),
  timelineContent: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "24px 28px",
  },
  timelineHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
    gap: 16,
    flexWrap: "wrap",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#fff",
  },
  periodBadge: {
    fontSize: 12,
    color: "#8892a4",
    padding: "4px 10px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    whiteSpace: "nowrap",
  },
  currentBadge: {
    color: "#4f6ef7",
    background: "rgba(79,110,247,0.12)",
  },
  company: {
    color: "#4f6ef7",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 12,
  },
  jobDesc: {
    color: "#8892a4",
    fontSize: 14,
    lineHeight: 1.7,
  },
  contactGrid: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  },
  contactLeft: {},
  contactTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.2,
    marginBottom: 16,
    letterSpacing: "-0.02em",
  },
  contactSub: {
    color: "#8892a4",
    fontSize: 15,
    marginBottom: 32,
  },
  socialIcons: {
    display: "flex",
    gap: 12,
  },
  socialIcon: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e8e8f0",
    width: 42,
    height: 42,
    borderRadius: 10,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: "#c8cfe0",
    fontSize: 14,
    fontWeight: 500,
    marginTop: 8,
  },
  input: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#e8e8f0",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  },
  textarea: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#e8e8f0",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.2s",
  },
  sendBtn: {
    background: "#4f6ef7",
    border: "none",
    color: "#fff",
    padding: "14px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: 8,
    transition: "background 0.2s, transform 0.15s",
  },
  sendBtnDisabled: {
    background: "#3a4a8a",
    cursor: "not-allowed",
    transform: "none",
  },
  inputError: {
    borderColor: "#e05454 !important",
    background: "rgba(224,84,84,0.06)",
  },
  errorText: {
    color: "#e05454",
    fontSize: 12,
    marginTop: 2,
  },
  successBanner: {
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.3)",
    color: "#4ade80",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 14,
    marginTop: 4,
  },
  errorBanner: {
    background: "rgba(224,84,84,0.1)",
    border: "1px solid rgba(224,84,84,0.3)",
    color: "#f87171",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "28px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1100,
    margin: "0 auto",
  },
  footerText: {
    color: "#5a6070",
    fontSize: 13,
  },
  footerLinks: {
    display: "flex",
    gap: 24,
  },
  footerLink: {
    color: "#5a6070",
    fontSize: 13,
    textDecoration: "none",
    transition: "color 0.2s",
  },
};

const cssString = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; }

  .nav-link:hover { color: #fff !important; }
  .resume-btn:hover { background: #3d5ae6 !important; }
  .primary-btn:hover { background: #3d5ae6 !important; transform: translateY(-1px); }
  .outline-btn:hover { border-color: rgba(255,255,255,0.5) !important; }
  .card-hover:hover { border-color: rgba(79,110,247,0.4) !important; }
  .skill-card:hover { border-color: rgba(79,110,247,0.4) !important; transform: translateY(-4px); }
  .social-icon:hover { background: rgba(255,255,255,0.12) !important; }
  .form-input:focus { border-color: #4f6ef7 !important; }

  .fade-in {
    animation: fadeIn 0.8s ease forwards;
  }
  .fade-in-right {
    animation: fadeInRight 0.8s ease 0.2s both;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(24px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .timeline-item:last-child { padding-bottom: 0; }

  @media (max-width: 768px) {
    .hero-layout { flex-direction: column !important; }
    .skills-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .philosophy-grid { grid-template-columns: 1fr !important; }
  }
`;
