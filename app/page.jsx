"use client";
import { useState, useEffect } from "react";

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
  const [scrolled, setScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData]       = useState({ email: "", message: "" });
  const [errors, setErrors]           = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const validateForm = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitStatus("loading");
    setSubmitMessage("");
    try {
      const res  = await fetch("/api/contact", {
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

  return (
    <div style={{ backgroundColor: "#0a0a0f", color: "#e8e8f0", minHeight: "100vh" }}>

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <nav className="navbar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 0", transition: "all 0.3s ease",
        ...(scrolled ? {
          backgroundColor: "rgba(10,10,15,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        } : {}),
      }}>
        <div className="nav-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#4f6ef7", fontWeight: 700, fontSize: 18, fontFamily: "monospace" }}>{"<>"}</span>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>Kevin.dev</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="nav-link"
                style={{ background: "none", border: "none", color: "#aab0c0", fontSize: 14, cursor: "pointer", padding: "6px 12px", borderRadius: 6, transition: "color 0.2s", fontFamily: "inherit" }}>
                {l}
              </button>
            ))}
            <button className="resume-btn"
              style={{ background: "#4f6ef7", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", padding: "8px 20px", borderRadius: 8, fontWeight: 600, fontFamily: "inherit", transition: "background 0.2s", marginLeft: 8 }}>
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              display: "none", 
              background: "none", 
              border: "none", 
              color: "#aab0c0", 
              fontSize: 20, 
              cursor: "pointer", 
              padding: "8px",
              borderRadius: 6,
              transition: "color 0.2s"
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`} style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "rgba(10,10,15,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 32px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => { scrollTo(l.toLowerCase()); setMobileMenuOpen(false); }} className="nav-link mobile-nav-link"
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "#aab0c0", 
                  fontSize: 16, 
                  cursor: "pointer", 
                  padding: "12px 0", 
                  textAlign: "left",
                  borderRadius: 6, 
                  transition: "color 0.2s", 
                  fontFamily: "inherit",
                  width: "100%"
                }}>
                {l}
              </button>
            ))}
            <button className="resume-btn mobile-resume-btn"
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                background: "#4f6ef7", 
                border: "none", 
                color: "#fff", 
                fontSize: 16, 
                cursor: "pointer", 
                padding: "12px 20px", 
                borderRadius: 8, 
                fontWeight: 600, 
                fontFamily: "inherit", 
                transition: "background 0.2s", 
                width: "100%",
                textAlign: "center"
              }}>
              Resume
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-section" style={{ maxWidth: 1100, margin: "0 auto", padding: "140px 32px 100px", display: "flex", alignItems: "center", gap: 60 }}>
        <div className="fade-in" style={{ flex: 1 }}>
          <p style={{ color: "#4f6ef7", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
            ✦ AVAILABLE FOR NEW OPPORTUNITIES
          </p>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, lineHeight: 1.12, color: "#fff", marginBottom: 24, letterSpacing: "-0.02em" }}>
            Hi, I am <span style={{ color: "#4f6ef7" }}>Kevin</span>,a Software Engineer delivering scalable business solutions using open-source technologies
          </h1>
          <p style={{ fontSize: 16, color: "#8892a4", maxWidth: 420, marginBottom: 36 }}>
            I specialize in building robust backend systems and intuitive frontend experiences using modern architectures and industry best practices.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="primary-btn"
              style={{ background: "#4f6ef7", border: "none", color: "#fff", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "transform 0.15s, background 0.2s" }}>
              View My Work
            </button>
            <button className="outline-btn" onClick={() => scrollTo("contact")}
              style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)", color: "#e8e8f0", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.2s" }}>
              Contact Me
            </button>
          </div>
        </div>
        <div className="fade-in-right hero-image-wrap" style={{ flex: "0 0 340px" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <img
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"
              alt="Workspace"
              style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "100px 0", backgroundColor: "#0d0d14"  }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em" }}>About Me</h2>
          <p style={{ color: "#8892a4", fontSize: 15, maxWidth: 560, marginBottom: 40 }}>
            I am a Software Engineer with over 10 years of experience in designing, developing, and delivering scalable business
solutions using open-source technologies. Experienced across the full software development lifecycle, with a strong
focus on system design, performance optimization, and code quality.Proven ability to solve complex technical
problems, research and adopt new technologies, and collaborate effectively with cross-functional teams. Actively
pursuing growth toward a Technical Lead role with a commitment to clear and effective technical communication.
          </p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Core Philosophy</h3>
          <div className="philosophy-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 500 }}>
            {PHILOSOPHY.map((p) => (
              <div key={p} className="card-hover"
                style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", transition: "border-color 0.2s" }}>
                <span style={{ color: "#4f6ef7", fontSize: 16, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 14, color: "#c8cfe0", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: "100px 0"}}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em", textAlign: "center" }}>Technical Toolkit</h2>
          <p style={{ textAlign: "center", color: "#8892a4", fontSize: 15, maxWidth: 500, margin: "0 auto 60px" }}>
            Continuously evolving and mastering the technologies that power modern web applications.
          </p>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
            {SKILLS.map((s) => (
              <div key={s.label} className="skill-card"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "28px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transition: "border-color 0.2s, transform 0.2s" }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <span style={{ fontSize: 13, color: "#c8cfe0", fontWeight: 500, textAlign: "center" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────── */}
      <section id="experience" style={{ padding: "100px 0", backgroundColor: "#0d0d14"  }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#fff", marginBottom: 60, letterSpacing: "-0.02em", textAlign: "center" }}>Journey &amp; Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760, margin: "0 auto", position: "relative", paddingLeft: 32, borderLeft: "2px solid rgba(255,255,255,0.08)" }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="timeline-item" style={{ position: "relative", paddingBottom: 48, paddingLeft: 32 }}>
                <div style={{
                  position: "absolute", left: -41, top: 6, width: 14, height: 14, borderRadius: "50%",
                  backgroundColor: e.current ? "#4f6ef7" : "#3a3a4a",
                  border: `2px solid ${e.current ? "#4f6ef7" : "#3a3a4a"}`,
                  boxShadow: e.current ? "0 0 16px rgba(79,110,247,0.5)" : "none",
                }} />
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 16, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{e.title}</h3>
                    <span style={{
                      fontSize: 12, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap",
                      color: e.current ? "#4f6ef7" : "#8892a4",
                      background: e.current ? "rgba(79,110,247,0.12)" : "rgba(255,255,255,0.05)",
                    }}>{e.period}</span>
                  </div>
                  <p style={{ color: "#4f6ef7", fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{e.company}</p>
                  <p style={{ color: "#8892a4", fontSize: 14, lineHeight: 1.7 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "100px 0"}}>
        <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.02em" }}>
              Let&apos;s build something <span style={{ color: "#4f6ef7" }}>extraordinary</span> together.
            </h2>
            <p style={{ color: "#8892a4", fontSize: 15, marginBottom: 32 }}>
              Currently open to new projects, collaborations, and engineering roles.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["✉", "🔗", "⬆"].map((icon) => (
                <button key={icon} className="social-icon"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e8f0", width: 42, height: 42, borderRadius: 10, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: "#c8cfe0", fontSize: 14, fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className={`form-input${errors.email ? " input-error" : ""}`}
              value={formData.email}
              onChange={handleChange("email")}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#e8e8f0", fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color 0.2s", width: "100%" }}
            />
            {errors.email && <span style={{ color: "#e05454", fontSize: 12 }}>⚠ {errors.email}</span>}

            <label style={{ color: "#c8cfe0", fontSize: 14, fontWeight: 500, marginTop: 8 }}>How can I help?</label>
            <textarea
              placeholder="Tell me about your project..."
              rows={5}
              className={`form-input${errors.message ? " input-error" : ""}`}
              value={formData.message}
              onChange={handleChange("message")}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#e8e8f0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", transition: "border-color 0.2s", width: "100%" }}
            />
            {errors.message && <span style={{ color: "#e05454", fontSize: 12 }}>⚠ {errors.message}</span>}

            {submitStatus === "success" && (
              <div style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", borderRadius: 10, padding: "12px 16px", fontSize: 14 }}>
                ✅ {submitMessage}
              </div>
            )}
            {submitStatus === "error" && (
              <div style={{ background: "rgba(224,84,84,0.1)", border: "1px solid rgba(224,84,84,0.3)", color: "#f87171", borderRadius: 10, padding: "12px 16px", fontSize: 14 }}>
                ❌ {submitMessage}
              </div>
            )}

            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={submitStatus === "loading"}
              style={{
                background: submitStatus === "loading" ? "#3a4a8a" : "#4f6ef7",
                border: "none", color: "#fff", padding: "14px", borderRadius: 10,
                fontSize: 15, fontWeight: 600, cursor: submitStatus === "loading" ? "not-allowed" : "pointer",
                fontFamily: "inherit", marginTop: 8, transition: "background 0.2s, transform 0.15s", width: "100%",
              }}>
              {submitStatus === "loading" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#5a6070", fontSize: 13 }}>© 2026 Kevin Developer. Built with passion and clean code.</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Github", "LinkedIn", "Twitter"].map((l) => (
            <a key={l} href="#" className="nav-link" style={{ color: "#5a6070", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}>{l}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}
