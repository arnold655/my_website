"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import { TextScramble } from "@/components/ui/text-scramble";

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ── Galaxy purple palette ──────────────────────────────────────────────────
const COLORS = {
  background: "#050816",
  surfaceContainerHigh: "#120d28",
  surfaceVariant: "#1a1035",
  outlineVariant: "#3b2f6b",
  secondary: "#A855F7",    // primary purple
  tertiary: "#C084FC",     // light purple
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#D1D5DB",
  onPrimaryFixed: "#ffffff",
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId: number;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    loop();
    const interactives = document.querySelectorAll("a,button,[data-interactive]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-active"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));
    });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks: { label: string; href: string; target?: string; download?: boolean }[] = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const projects = [
    {
      tag: "NETWORK INTELLIGENCE",
      title: "Network Operations RAG Agent",
      accentColor: COLORS.tertiary,
      problem: "Network ops teams drowning in telemetry data with no fast way to query infrastructure state or diagnose incidents.",
      solution: "Agentic RAG system ingesting network telemetry and runbooks, enabling natural-language querying, automated root-cause analysis, and on-call triage at scale.",
      impact: "Reduced mean-time-to-resolution for network incidents and eliminated manual runbook lookups during on-call rotations.",
      badges: ["LangChain", "LangGraph", "RAG", "Vector DB", "Python", "FastAPI"],
      svgContent: (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          <circle cx="70" cy="50" r="10" fill="rgba(192,132,252,.15)" stroke="#C084FC" strokeWidth="1.5" />
          <text x="70" y="54" textAnchor="middle" fontSize="8" fill="#C084FC" fontFamily="monospace">RAG</text>
          {[{ cx: 20, cy: 20 }, { cx: 120, cy: 20 }, { cx: 15, cy: 70 }, { cx: 125, cy: 70 }, { cx: 70, cy: 90 }].map((n, i) => (
            <g key={i}>
              <line x1="70" y1="50" x2={n.cx} y2={n.cy} stroke="#C084FC" strokeWidth="1" opacity=".3" strokeDasharray="3 3" />
              <circle cx={n.cx} cy={n.cy} r="5" fill="rgba(192,132,252,.2)" stroke="#C084FC" strokeWidth="1" opacity=".7" />
            </g>
          ))}
          <circle cx="70" cy="50" r="18" stroke="#A855F7" strokeWidth="0.5" opacity=".3" />
          <circle cx="70" cy="50" r="26" stroke="#A855F7" strokeWidth="0.5" opacity=".15" />
        </svg>
      ),
      bgGradient: "linear-gradient(135deg, #0d0a1e 0%, #1a0a2e 60%, #050816 100%)",
    },
    {
      tag: "HEALTHCARE AI",
      title: "Healthcare Ticket Triage & Fraud Analytics Platform",
      accentColor: COLORS.secondary,
      problem: "High-volume support tickets required manual review, and billing fraud patterns were surfacing too late to act on.",
      solution: "End-to-end platform combining NLP-based ticket classification and ML-driven fraud detection for real-time anomaly detection in healthcare operations.",
      impact: "Reduced manual review time for support tickets and surfaced anomalous billing patterns in real time, improving operational throughput.",
      badges: ["NLP", "XGBoost", "Apache Spark", "Azure", "Python", "scikit-learn"],
      svgContent: (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          <rect x="25" y="30" width="55" height="38" rx="4" fill="rgba(168,85,247,.06)" stroke="#A855F7" strokeWidth="1" opacity=".5" />
          <rect x="30" y="25" width="55" height="38" rx="4" fill="rgba(168,85,247,.08)" stroke="#A855F7" strokeWidth="1" opacity=".6" />
          <rect x="35" y="20" width="55" height="38" rx="4" fill="rgba(168,85,247,.1)" stroke="#A855F7" strokeWidth="1.5" opacity=".8" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1="42" y1={28 + i * 7} x2={72 - i * 6} y2={28 + i * 7} stroke="#A855F7" strokeWidth="1.2" opacity=".5" />
          ))}
          <path d="M105 22 L118 28 L118 42 C118 50 105 55 105 55 C105 55 92 50 92 42 L92 28 Z" fill="rgba(192,132,252,.1)" stroke="#C084FC" strokeWidth="1.2" opacity=".8" />
          <text x="105" y="42" textAnchor="middle" fontSize="9" fill="#C084FC" fontFamily="monospace">✓</text>
        </svg>
      ),
      bgGradient: "linear-gradient(135deg, #0d0a1e 0%, #150826 60%, #050816 100%)",
    },
    {
      tag: "FINTECH ML",
      title: "Real-Time Credit Risk Scoring Engine",
      accentColor: COLORS.tertiary,
      problem: "Legacy batch credit scoring was too slow for real-time lending decisions and lacked explainability for regulatory requirements.",
      solution: "Low-latency credit risk pipeline processing live transaction streams with automated feature engineering, model retraining triggers, and explainability outputs.",
      impact: "Enabled real-time lending decisions with regulatory-compliant model explanations and automated retraining on data drift.",
      badges: ["Kafka", "MLflow", "Python", "AWS", "XGBoost", "SHAP"],
      svgContent: (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          {[{ x: 18, h: 30, o: 0.4 }, { x: 34, h: 45, o: 0.5 }, { x: 50, h: 35, o: 0.55 }, { x: 66, h: 55, o: 0.65 }, { x: 82, h: 42, o: 0.7 }, { x: 98, h: 62, o: 0.85 }, { x: 114, h: 50, o: 1 }].map((b, i) => (
            <rect key={i} x={b.x} y={80 - b.h} width="12" height={b.h} rx="2" fill={`rgba(192,132,252,${b.o * 0.3})`} stroke="#C084FC" strokeWidth="1" opacity={b.o} />
          ))}
          <polyline points="24,65 40,50 56,58 72,38 88,46 104,28 120,36" stroke="#A855F7" strokeWidth="1.5" fill="none" opacity=".6" strokeDasharray="3 2" />
          <line x1="12" y1="80" x2="128" y2="80" stroke="#C084FC" strokeWidth="0.8" opacity=".3" />
        </svg>
      ),
      bgGradient: "linear-gradient(135deg, #100820 0%, #0d0a1e 60%, #050816 100%)",
    },
  ];

  const techStack = [
    {
      group: "Generative AI",
      color: COLORS.tertiary,
      items: ["LangChain", "LangGraph", "OpenAI API", "Anthropic Claude", "Ollama", "RAG Pipelines", "Prompt Engineering", "LLM Fine-tuning", "Vector Databases", "Agentic Workflows"],
    },
    {
      group: "Machine Learning",
      color: COLORS.secondary,
      items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "LightGBM", "SHAP", "Hugging Face", "NLP / NLU", "Time Series", "Anomaly Detection"],
    },
    {
      group: "Data Engineering",
      color: COLORS.tertiary,
      items: ["Apache Spark", "Apache Kafka", "dbt", "Airflow", "PostgreSQL", "Redis", "Snowflake", "Pandas", "PySpark", "ETL Pipelines"],
    },
    {
      group: "MLOps & LLMOps",
      color: COLORS.secondary,
      items: ["MLflow", "Weights & Biases", "Docker", "Kubernetes", "CI/CD", "Model Monitoring", "LLM Evaluation", "Feature Stores", "A/B Testing", "Data Versioning"],
    },
    {
      group: "Cloud Platforms",
      color: COLORS.tertiary,
      items: ["AWS SageMaker", "Azure ML", "GCP Vertex AI", "AWS Lambda", "Azure OpenAI", "S3 / GCS / Blob", "CloudFormation", "Terraform", "FastAPI", "REST APIs"],
    },
  ];

  const certifications = [
    { name: "AWS Certified Machine Learning – Specialty", issuer: "Amazon Web Services", color: COLORS.secondary, abbr: "AWS" },
    { name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", color: "#818cf8", abbr: "MSFT" },
    { name: "GCP Professional Machine Learning Engineer", issuer: "Google Cloud", color: COLORS.tertiary, abbr: "GCP" },
    { name: "Generative AI with Large Language Models", issuer: "DeepLearning.AI / Coursera", color: "#e879f9", abbr: "DL.AI" },
  ];

  const timeline = [
    { company: "Accenture", role: "Python Developer", period: "2017 – 2019", description: "Built backend data pipelines and automation systems using Python. Gained foundational experience in software engineering, REST APIs, and cloud infrastructure.", color: COLORS.onSurfaceVariant, active: false },
    { company: "Bank of America", role: "Data Scientist", period: "2019 – 2022", description: "Developed ML models for credit risk, fraud detection, and customer analytics. Delivered production pipelines on Azure handling high-volume financial data.", color: COLORS.secondary, active: false },
    { company: "UnitedHealth Group", role: "ML Engineer", period: "2023 – 2024", description: "Engineered NLP-based ticket classification and healthcare fraud analytics systems. Scaled ML pipelines on Apache Spark across large claims datasets.", color: COLORS.secondary, active: false },
    { company: "Forward Networks", role: "Senior AI/ML Engineer", period: "2025 – Present", description: "Building enterprise Generative AI systems including agentic RAG pipelines, LLM evaluation frameworks, and Network Operations AI assistants.", color: COLORS.tertiary, active: true },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body {
          background-color: #050816;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          margin: 0;
          cursor: none;
        }
        .grid-pattern {
          background-image: radial-gradient(rgba(168,85,247,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        @media (pointer: fine) {
          a, button, [data-interactive] { cursor: none !important; }
          #cursor-dot, #cursor-ring {
            pointer-events: none;
            position: fixed;
            top: 0; left: 0;
            border-radius: 50%;
            z-index: 9999;
            transform: translate(-50%,-50%);
          }
          #cursor-dot { width: 6px; height: 6px; background: #A855F7; transition: width .3s, height .3s; }
          #cursor-ring {
            width: 32px; height: 32px;
            border: 1px solid #A855F7;
            box-shadow: 0 0 12px rgba(168,85,247,.25);
            transition: width .3s, height .3s, background-color .3s;
          }
          body.cursor-active #cursor-ring { width: 56px; height: 56px; background: rgba(168,85,247,.06); }
        }
        .underline-expand { position: relative; }
        .underline-expand::after {
          content: ''; position: absolute;
          width: 0; height: 1px; bottom: -2px; left: 50%;
          background: #A855F7; transition: all .3s; transform: translateX(-50%);
        }
        .underline-expand:hover::after { width: 100%; }
        [data-reveal] {
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s ease, transform .7s ease;
        }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.4); } }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(90deg, #A855F7 0%, #C084FC 50%, #E9D5FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover { transition: border-color .3s, box-shadow .3s, transform .3s; }
        .card-hover:hover {
          border-color: rgba(168,85,247,.4) !important;
          box-shadow: 0 0 24px rgba(168,85,247,.08), 0 12px 40px rgba(5,8,22,.7);
          transform: translateY(-2px);
        }
        .mobile-nav {
          display: none; flex-direction: column; gap: 1.5rem;
          padding: 1.5rem 1.5rem 2rem;
          background: rgba(5,8,22,.97);
          border-top: 1px solid rgba(59,47,107,.4);
        }
        .mobile-nav.open { display: flex; }
        @media (max-width: 767px) {
          body { cursor: auto; }
          #cursor-dot, #cursor-ring { display: none; }
        }
        @keyframes float-particle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
          40% { opacity: 0.7; transform: translateY(-28px) scale(1.2); }
        }
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: .12em;
          color: #C084FC;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #FFFFFF;
          margin-bottom: 16px;
        }
        .section-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #A855F7, #C084FC);
          margin-bottom: 24px;
        }
      `}</style>

      <div id="cursor-dot" className="hidden md:block" />
      <div id="cursor-ring" className="hidden md:block" />

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, width: "100%", zIndex: 50,
          background: "rgba(5,8,22,.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid rgba(59,47,107,${scrolled ? ".5" : ".2"})`,
          transition: "border-color .3s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: COLORS.onSurface }}>
            Arnold<span className="gradient-text">.</span>
          </span>

          <div className="hidden md:flex" style={{ gap: 28, alignItems: "center" }}>
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href}
                style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: COLORS.onSurfaceVariant, textDecoration: "none", transition: "color .3s" }}
                className="underline-expand"
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.tertiary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.onSurfaceVariant)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <a href="/resume.pdf" download
            style={{ background: COLORS.secondary, color: "#fff", fontWeight: 700, padding: "8px 20px", borderRadius: 4, fontSize: 13, textDecoration: "none", transition: "opacity .2s", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 0 20px rgba(168,85,247,.3)" }}
            className="hidden md:inline-flex"
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = ".85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <IconDownload /> Resume
          </a>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: COLORS.onSurface, padding: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>) : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
            </svg>
          </button>
        </div>

        <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, letterSpacing: ".05em", color: COLORS.onSurface, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <a href="/resume.pdf" download style={{ background: COLORS.secondary, color: "#fff", fontWeight: 700, padding: "10px 20px", borderRadius: 4, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
            Download Resume
          </a>
        </div>
      </nav>

      <main className="grid-pattern">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 72, paddingBottom: 80, overflow: "hidden" }}
        >
          {/* Galaxy Spline background */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "auto" }}>
            <SplineScene
              scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Galaxy overlay — fade edges + bottom */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            background: `
              linear-gradient(to right, rgba(5,8,22,0.85) 0%, rgba(5,8,22,0.3) 35%, rgba(5,8,22,0.1) 65%, rgba(5,8,22,0.75) 100%),
              linear-gradient(to bottom, rgba(5,8,22,0.4) 0%, transparent 30%, transparent 60%, rgba(5,8,22,0.95) 100%)
            `,
          }} />

          {/* Subtle scanlines */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.025) 3px, rgba(0,0,0,.025) 4px)" }} />

          {/* Floating purple particles */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            {[
              { left: "8%",  top: "30%", delay: "0s",   dur: "7s",  color: "#C084FC" },
              { left: "60%", top: "20%", delay: "2.5s", dur: "9s",  color: "#A855F7" },
              { left: "85%", top: "55%", delay: "1.2s", dur: "6s",  color: "#C084FC" },
              { left: "35%", top: "70%", delay: "3.5s", dur: "8s",  color: "#A855F7" },
            ].map((p, i) => (
              <div key={i} style={{ position: "absolute", left: p.left, top: p.top, width: 3, height: 3, borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}`, animation: `float-particle ${p.dur} ease-in-out ${p.delay} infinite` }} />
            ))}
          </div>

          {/* Content */}
          <div
            style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 10, display: "flex" }}
            className="flex-col md:flex-row gap-10 md:gap-16 items-start md:items-center"
          >
            {/* LEFT */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Live badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 10px", background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.3)", borderRadius: 99, marginBottom: 24 }}>
                <span className="pulse-dot" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: COLORS.tertiary, boxShadow: "0 0 8px #C084FC", flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".08em", color: COLORS.tertiary }}>
                  OPEN TO NEW ROLES
                </span>
              </div>

              {/* Name + title */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, letterSpacing: ".1em", color: "rgba(233,213,255,.6)", marginBottom: 8 }}>
                  // ARNOLD KUMAR M
                </div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 500, color: COLORS.tertiary, letterSpacing: ".04em" }}>
                  Senior AI/ML Engineer
                </div>
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#fff", marginBottom: 28, fontSize: "clamp(34px, 5.5vw, 60px)", textShadow: "0 0 40px rgba(168,85,247,.15)" }}>
                <TextScramble
                  text="Building Enterprise AI Systems That Scale."
                  finalRender={<>Building Enterprise{" "}<span className="gradient-text">AI Systems</span> That Scale.</>}
                />
              </h1>

              {/* Subheadline */}
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, color: "rgba(209,213,219,.85)", maxWidth: 560, marginBottom: 40 }}>
                Senior AI/ML Engineer with 8+ years of experience building machine learning systems, data platforms, RAG applications, agentic AI workflows, and Generative AI solutions across network infrastructure, healthcare, and financial services.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a href="/resume.pdf" download
                  style={{ background: COLORS.secondary, color: "#fff", fontWeight: 700, padding: "13px 28px", borderRadius: 4, border: "none", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "opacity .2s, box-shadow .2s", boxShadow: "0 0 24px rgba(168,85,247,.4)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = ".9"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(168,85,247,.6)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(168,85,247,.4)"; }}
                >
                  <IconDownload /> View Resume
                </a>
                <Link href="https://www.linkedin.com/in/arnold-kumar-m-bb6012241" target="_blank"
                  style={{ background: "rgba(168,85,247,.1)", color: COLORS.tertiary, fontWeight: 600, padding: "13px 24px", borderRadius: 4, border: "1px solid rgba(168,85,247,.3)", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "background .2s, border-color .2s, box-shadow .2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.18)"; e.currentTarget.style.borderColor = "rgba(168,85,247,.55)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(168,85,247,.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.1)"; e.currentTarget.style.borderColor = "rgba(168,85,247,.3)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <IconLinkedIn /> LinkedIn
                </Link>
                <Link href="https://github.com/arnold655" target="_blank"
                  style={{ background: "rgba(192,132,252,.08)", color: COLORS.tertiary, fontWeight: 600, padding: "13px 24px", borderRadius: 4, border: "1px solid rgba(192,132,252,.25)", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "background .2s, border-color .2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(192,132,252,.15)"; e.currentTarget.style.borderColor = "rgba(192,132,252,.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(192,132,252,.08)"; e.currentTarget.style.borderColor = "rgba(192,132,252,.25)"; }}
                >
                  <IconGitHub /> GitHub
                </Link>
                <Link href="#contact"
                  style={{ background: "rgba(255,255,255,.04)", color: "#fff", fontWeight: 500, padding: "13px 24px", borderRadius: 4, border: "1px solid rgba(255,255,255,.15)", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", transition: "border-color .2s, background .2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}
                >
                  Contact Me <IconArrowRight />
                </Link>
              </div>
            </div>

            {/* RIGHT – AI ID Card */}
            <div
              className="w-full md:w-[420px]"
              style={{ flexShrink: 0, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 460 }}
            >
              {/* Ambient purple glow */}
              <div style={{ position: "absolute", width: 420, height: 420, background: "radial-gradient(circle, rgba(168,85,247,.18) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(56px)", zIndex: 0 }} />

              <div className="w-[280px] h-[420px] md:w-[320px] md:h-[500px]" style={{ position: "relative", zIndex: 1 }}>
                {/* Corner brackets */}
                {[
                  { top: 0, left: 0, borderTop: `2px solid ${COLORS.tertiary}`, borderLeft: `2px solid ${COLORS.tertiary}` },
                  { top: 0, right: 0, borderTop: `2px solid ${COLORS.tertiary}`, borderRight: `2px solid ${COLORS.tertiary}` },
                  { bottom: 0, left: 0, borderBottom: `2px solid ${COLORS.tertiary}`, borderLeft: `2px solid ${COLORS.tertiary}` },
                  { bottom: 0, right: 0, borderBottom: `2px solid ${COLORS.tertiary}`, borderRight: `2px solid ${COLORS.tertiary}` },
                ].map((s, i) => (
                  <div key={i} style={{ position: "absolute", width: 26, height: 26, zIndex: 4, ...s }} />
                ))}
                <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(168,85,247,.2)", borderRadius: 2, zIndex: 3, pointerEvents: "none", boxShadow: "0 0 20px rgba(168,85,247,.08) inset" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: 2, overflow: "hidden", background: "#0a0618" }}>
                  <Image src="/profile.jpeg" alt="Arnold Kumar M" fill style={{ objectFit: "cover", objectPosition: "top center" }} priority />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(5,8,22,1) 0%, rgba(5,8,22,.75) 50%, transparent 100%)", zIndex: 1 }} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.04) 3px, rgba(0,0,0,.04) 4px)", zIndex: 2, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, right: 12, zIndex: 3, display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".1em", color: COLORS.tertiary, textShadow: "0 0 10px rgba(192,132,252,.7)" }}>SCAN_ID: ARNOLD_KUMAR_M</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: ".08em", color: "rgba(233,213,255,.45)" }}>CLEARANCE: LVL-5 / ACTIVE</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 16, left: 14, right: 14, zIndex: 3 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: ".1em", color: "rgba(233,213,255,.4)", marginBottom: 4 }}>CURRENT ROLE</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".06em", color: COLORS.secondary, fontWeight: 500, marginBottom: 12 }}>SENIOR_AI_ML_ENGINEER</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span className="pulse-dot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: COLORS.tertiary, boxShadow: `0 0 8px ${COLORS.tertiary}`, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".1em", color: COLORS.tertiary }}>@ Forward Networks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Focus badge */}
              <div className="hidden md:flex"
                style={{ position: "absolute", bottom: 0, right: 0, background: "rgba(10,6,30,.97)", border: "1px solid rgba(168,85,247,.25)", borderRadius: 6, padding: "10px 14px", zIndex: 5, backdropFilter: "blur(16px)", flexDirection: "column", gap: 5, minWidth: 138, boxShadow: "0 8px 24px rgba(0,0,0,.6), 0 0 20px rgba(168,85,247,.08)" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: ".1em", color: "rgba(233,213,255,.35)", marginBottom: 2, borderBottom: "1px solid rgba(168,85,247,.1)", paddingBottom: 4 }}>CURRENT FOCUS</div>
                {[
                  { label: "RAG Pipelines", color: COLORS.tertiary },
                  { label: "Agentic AI", color: COLORS.secondary },
                  { label: "LLMOps", color: "#E9D5FF" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: item.color, boxShadow: `0 0 5px ${item.color}`, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: item.color, letterSpacing: ".04em" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        <section id="about" style={{ padding: "100px 0", borderTop: "1px solid rgba(59,47,107,.25)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "start" }}>
              <div>
                <div className="section-label">// WHO I AM</div>
                <h2 className="section-title">Who I Am</h2>
                <div className="section-divider" />
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.8, color: COLORS.onSurfaceVariant, marginBottom: 20 }}>
                  I am a Senior AI/ML Engineer with 8+ years of experience spanning software engineering, data engineering, machine learning, and Generative AI.
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.8, color: COLORS.onSurfaceVariant, marginBottom: 20 }}>
                  My career started as a Python Developer at Accenture, evolved into Data Science at Bank of America, expanded into ML Engineering at UnitedHealth Group, and currently focuses on enterprise Generative AI systems at Forward Networks.
                </p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, lineHeight: 1.8, color: COLORS.onSurfaceVariant }}>
                  I bridge the gap between research and production — moving AI systems from prototype to deployment at enterprise scale.
                </p>
              </div>

              <div>
                <div style={{ background: "rgba(26,16,53,.6)", border: "1px solid rgba(168,85,247,.2)", borderRadius: 8, padding: 32 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".12em", color: COLORS.tertiary, marginBottom: 20 }}>I SPECIALIZE IN</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {["RAG Systems", "Agentic AI Workflows", "LLM Applications", "MLOps & LLMOps", "Cloud AI Platforms", "Production AI Systems"].map((spec) => (
                      <span key={spec} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "8px 16px", background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.25)", borderRadius: 4, color: COLORS.tertiary, letterSpacing: ".03em" }}>{spec}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(59,47,107,.3)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center" }}>
                      {[{ v: "8+", l: "Years" }, { v: "3", l: "Domains" }, { v: "4", l: "Companies" }].map((s) => (
                        <div key={s.l}>
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 28, fontWeight: 700, color: COLORS.secondary, lineHeight: 1 }}>{s.v}</div>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".1em", color: COLORS.onSurfaceVariant, marginTop: 4 }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CURRENT ROLE ─────────────────────────────────────────── */}
        <section id="current-role" style={{ padding: "80px 0", background: "rgba(5,8,22,.6)", borderTop: "1px solid rgba(59,47,107,.25)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div data-reveal style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>// CURRENT POSITION</div>
                <h2 className="section-title" style={{ textAlign: "center" }}>Currently Building</h2>
              </div>
              <div style={{ background: "rgba(26,16,53,.7)", border: "1px solid rgba(168,85,247,.25)", borderRadius: 10, padding: "36px 40px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #A855F7, #C084FC, transparent)" }} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".1em", color: COLORS.tertiary, marginBottom: 6 }}>COMPANY</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 26, fontWeight: 700, color: COLORS.onSurface, marginBottom: 4 }}>Forward Networks</div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: COLORS.secondary, fontWeight: 500 }}>Senior AI/ML Engineer – Generative AI</div>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 10px", background: "rgba(168,85,247,.08)", border: "1px solid rgba(168,85,247,.3)", borderRadius: 99, alignSelf: "flex-start" }}>
                    <span className="pulse-dot" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: COLORS.tertiary, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".08em", color: COLORS.tertiary }}>2025 – PRESENT</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: COLORS.onSurfaceVariant, marginBottom: 14 }}>BUILDING ENTERPRISE AI SOLUTIONS INCLUDING:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Agentic AI workflows using LangGraph for automated network operations",
                    "Production RAG pipelines with hybrid retrieval and re-ranking",
                    "LLM evaluation systems for response quality and hallucination detection",
                    "Network Operations AI Assistants for real-time infrastructure queries",
                    "Cloud-native AI platforms on AWS and GCP with MLOps automation",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ color: COLORS.tertiary, flexShrink: 0, marginTop: 1, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>▸</span>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: COLORS.onSurfaceVariant, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAREER JOURNEY ───────────────────────────────────────── */}
        <section id="experience" style={{ padding: "100px 0", borderTop: "1px solid rgba(59,47,107,.25)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div data-reveal style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// CAREER</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>Career Journey</h2>
            </div>

            <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(168,85,247,.35) 10%, rgba(168,85,247,.35) 90%, transparent)", transform: "translateX(-50%)" }} className="hidden md:block" />

              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} data-reveal
                    style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: 0, marginBottom: i < timeline.length - 1 ? 48 : 0, transitionDelay: `${i * 100}ms` }}
                    className="hidden md:grid"
                  >
                    <div style={{ paddingRight: 32, textAlign: "right", paddingTop: 4 }}>
                      {isLeft ? (
                        <div className="card-hover" style={{ background: item.active ? "rgba(168,85,247,.06)" : "rgba(26,16,53,.5)", border: `1px solid ${item.active ? "rgba(168,85,247,.3)" : "rgba(59,47,107,.3)"}`, borderRadius: 8, padding: "20px 24px", display: "inline-block", width: "100%", textAlign: "left" }}>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: item.color, marginBottom: 6 }}>{item.period}</div>
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.onSurface, marginBottom: 2 }}>{item.company}</div>
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: item.color, marginBottom: 10, fontWeight: 500 }}>{item.role}</div>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.6, color: COLORS.onSurfaceVariant, margin: 0 }}>{item.description}</p>
                        </div>
                      ) : null}
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 20 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: item.active ? COLORS.tertiary : "rgba(168,85,247,.35)", border: `2px solid ${item.active ? COLORS.tertiary : "rgba(168,85,247,.45)"}`, boxShadow: item.active ? `0 0 14px ${COLORS.tertiary}` : "none", zIndex: 1, flexShrink: 0 }} />
                    </div>

                    <div style={{ paddingLeft: 32, paddingTop: 4 }}>
                      {!isLeft ? (
                        <div className="card-hover" style={{ background: item.active ? "rgba(168,85,247,.06)" : "rgba(26,16,53,.5)", border: `1px solid ${item.active ? "rgba(168,85,247,.3)" : "rgba(59,47,107,.3)"}`, borderRadius: 8, padding: "20px 24px" }}>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: item.color, marginBottom: 6 }}>{item.period}</div>
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.onSurface, marginBottom: 2 }}>{item.company}</div>
                          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: item.color, marginBottom: 10, fontWeight: 500 }}>{item.role}</div>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.6, color: COLORS.onSurfaceVariant, margin: 0 }}>{item.description}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {/* Mobile timeline */}
              <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
                <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(168,85,247,.35) 10%, rgba(168,85,247,.35) 90%, transparent)" }} />
                {timeline.map((item, i) => (
                  <div key={i} data-reveal style={{ paddingLeft: 32, transitionDelay: `${i * 80}ms` }}>
                    <div style={{ position: "absolute", left: 0, width: 13, height: 13, borderRadius: "50%", background: item.active ? COLORS.tertiary : "rgba(168,85,247,.35)", border: `2px solid ${item.active ? COLORS.tertiary : "rgba(168,85,247,.45)"}`, boxShadow: item.active ? `0 0 12px ${COLORS.tertiary}` : "none", marginTop: 20 }} />
                    <div style={{ background: item.active ? "rgba(168,85,247,.06)" : "rgba(26,16,53,.5)", border: `1px solid ${item.active ? "rgba(168,85,247,.3)" : "rgba(59,47,107,.3)"}`, borderRadius: 8, padding: "18px 20px" }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: item.color, marginBottom: 4 }}>{item.period}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, fontWeight: 700, color: COLORS.onSurface, marginBottom: 2 }}>{item.company}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: item.color, marginBottom: 8, fontWeight: 500 }}>{item.role}</div>
                      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.6, color: COLORS.onSurfaceVariant, margin: 0 }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS ────────────────────────────────────── */}
        <section id="projects" style={{ padding: "100px 0", borderTop: "1px solid rgba(59,47,107,.25)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div data-reveal style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// WORK</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>Featured Projects</h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: COLORS.onSurfaceVariant, maxWidth: 540, margin: "0 auto" }}>Real systems built and deployed in production environments.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
              {projects.map((p, i) => (
                <div key={i} data-reveal className="card-hover"
                  style={{ background: "rgba(26,16,53,.6)", border: "1px solid rgba(59,47,107,.3)", borderRadius: 10, overflow: "hidden", transitionDelay: `${i * 80}ms` }}
                >
                  <div style={{ aspectRatio: "16/7", background: p.bgGradient, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    {p.svgContent}
                    <div style={{ position: "absolute", top: 12, left: 14 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".08em", color: p.accentColor, background: "rgba(5,8,22,.7)", padding: "3px 8px", borderRadius: 3 }}>{p.tag}</span>
                    </div>
                  </div>

                  <div style={{ padding: "24px 24px 28px" }}>
                    <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.onSurface, lineHeight: 1.3, marginBottom: 20 }}>{p.title}</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                      {[
                        { label: "Problem", text: p.problem, color: "rgba(233,213,255,.45)" },
                        { label: "Solution", text: p.solution, color: COLORS.secondary },
                        { label: "Impact", text: p.impact, color: COLORS.tertiary },
                      ].map((row) => (
                        <div key={row.label}>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: row.color, marginBottom: 4 }}>{row.label.toUpperCase()}</div>
                          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.6, color: COLORS.onSurfaceVariant, margin: 0 }}>{row.text}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                      {p.badges.map((b) => (
                        <span key={b} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, padding: "3px 9px", background: COLORS.surfaceVariant, borderRadius: 3, color: COLORS.onSurfaceVariant }}>{b}</span>
                      ))}
                    </div>

                    <Link href="https://github.com/arnold655" target="_blank"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".06em", color: COLORS.secondary, textDecoration: "none", padding: "7px 16px", border: "1px solid rgba(168,85,247,.25)", borderRadius: 4, background: "rgba(168,85,247,.06)", transition: "background .2s, border-color .2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.14)"; e.currentTarget.style.borderColor = "rgba(168,85,247,.45)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(168,85,247,.06)"; e.currentTarget.style.borderColor = "rgba(168,85,247,.25)"; }}
                    >
                      <IconGitHub /> VIEW ON GITHUB
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ───────────────────────────────────────────── */}
        <section id="skills" style={{ padding: "100px 0", borderTop: "1px solid rgba(59,47,107,.25)", background: "rgba(5,8,22,.5)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div data-reveal style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// TECHNOLOGIES</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>Tech Stack</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {techStack.map((group, i) => (
                <div key={i} data-reveal
                  style={{ background: "rgba(26,16,53,.6)", border: "1px solid rgba(59,47,107,.3)", borderRadius: 8, padding: "22px 20px", transitionDelay: `${i * 60}ms` }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(59,47,107,.3)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: group.color, boxShadow: `0 0 8px ${group.color}`, flexShrink: 0 }} />
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: group.color }}>{group.group.toUpperCase()}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {group.items.map((item) => (
                      <span key={item} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, padding: "4px 9px", background: "rgba(59,47,107,.4)", border: "1px solid rgba(59,47,107,.4)", borderRadius: 3, color: COLORS.onSurfaceVariant }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ───────────────────────────────────────── */}
        <section id="certifications" style={{ padding: "100px 0", borderTop: "1px solid rgba(59,47,107,.25)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div data-reveal style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// CREDENTIALS</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>Certifications</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
              {certifications.map((cert, i) => (
                <div key={i} data-reveal className="card-hover"
                  style={{ background: "rgba(26,16,53,.6)", border: "1px solid rgba(59,47,107,.3)", borderRadius: 8, padding: "24px", position: "relative", overflow: "hidden", transitionDelay: `${i * 80}ms` }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 6, background: `${cert.color}14`, border: `1px solid ${cert.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: cert.color, letterSpacing: ".05em", fontWeight: 700 }}>{cert.abbr}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.onSurface, lineHeight: 1.4, marginBottom: 6 }}>{cert.name}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".06em", color: cert.color }}>{cert.issuer}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: "100px 0", borderTop: "1px solid rgba(59,47,107,.25)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "rgba(168,85,247,.04)", filter: "blur(100px)", borderRadius: "50%", zIndex: 0 }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <div data-reveal style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// GET IN TOUCH</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>Let's Build Something Intelligent</h2>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: COLORS.onSurfaceVariant, maxWidth: 520, margin: "0 auto" }}>
                I am open to Senior AI/ML Engineer roles, technical advisory, and high-impact Generative AI projects.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 860, margin: "0 auto" }}>
              {[
                { label: "Email", value: "arnoldkumar0524@gmail.com", icon: <IconMail />, href: "mailto:arnoldkumar0524@gmail.com", color: COLORS.tertiary },
                { label: "Phone", value: "+1 (940) 843-1390", icon: <IconPhone />, href: "tel:+19408431390", color: COLORS.secondary },
                { label: "LinkedIn", value: "arnold-kumar-m", icon: <IconLinkedIn />, href: "https://www.linkedin.com/in/arnold-kumar-m-bb6012241", color: COLORS.secondary },
                { label: "GitHub", value: "arnold655", icon: <IconGitHub />, href: "https://github.com/arnold655", color: COLORS.tertiary },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                  className="card-hover"
                  style={{ background: "rgba(26,16,53,.6)", border: "1px solid rgba(59,47,107,.3)", borderRadius: 8, padding: "22px 20px", textDecoration: "none", display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: item.color }}>{item.label.toUpperCase()}</span>
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: COLORS.onSurface, fontWeight: 500, wordBreak: "break-word" }}>{item.value}</div>
                </a>
              ))}
            </div>

            <div data-reveal style={{ textAlign: "center", marginTop: 48, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="/resume.pdf" download
                style={{ background: COLORS.secondary, color: "#fff", fontWeight: 700, padding: "14px 36px", borderRadius: 4, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "opacity .2s", boxShadow: "0 0 24px rgba(168,85,247,.35)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = ".85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <IconDownload /> Download Resume
              </a>
              <Link href="https://www.linkedin.com/in/arnold-kumar-m-bb6012241" target="_blank"
                style={{ background: "transparent", color: COLORS.onSurface, fontWeight: 600, padding: "14px 36px", borderRadius: 4, fontSize: 15, textDecoration: "none", border: "1px solid rgba(59,47,107,.5)", display: "inline-flex", alignItems: "center", gap: 8, transition: "border-color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(59,47,107,.5)")}
              >
                <IconLinkedIn /> Connect on LinkedIn
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ background: COLORS.background, borderTop: "1px solid rgba(59,47,107,.25)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.onSurface, marginBottom: 6 }}>
              Arnold<span className="gradient-text">.</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: ".03em", color: COLORS.onSurfaceVariant }}>
              © 2025 Arnold Kumar M · Senior AI/ML Engineer
            </div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[{ label: "GitHub", href: "https://github.com/arnold655" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/arnold-kumar-m-bb6012241" }].map((l) => (
              <Link key={l.label} href={l.href} target="_blank"
                style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: ".05em", color: COLORS.onSurfaceVariant, textDecoration: "none", transition: "color .3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.tertiary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.onSurfaceVariant)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
