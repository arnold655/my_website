"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const IconArrowRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconTerminal = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const IconVerified = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#4edea3" stroke="none">
    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const COLORS = {
  background: "#051424",
  surfaceContainerHigh: "#1c2b3c",
  surfaceVariant: "#273647",
  outlineVariant: "#45464d",
  secondary: "#5de6ff",
  tertiary: "#4edea3",
  onSurface: "#d4e4fa",
  onSurfaceVariant: "#c6c6cd",
  onPrimaryFixed: "#131b2e",
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
    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;
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
    const interactives = document.querySelectorAll(
      "a,button,[data-interactive]",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-active"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-active"),
      );
    });
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { label: "Portfolio", href: "#" },
    { label: "Insights", href: "#" },
    { label: "Resume", href: "/resume.pdf" },
    { label: "Experience", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const expertise = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5de6ff"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 3H8M12 3v4" />
          <path d="M8 12h8M8 16h4" />
        </svg>
      ),
      tag: "MLOps Infrastructure",
      desc: "Automated CI/CD for machine learning, feature stores, and robust monitoring for drift detection in high-load environments.",
      badges: ["Kubernetes", "MLFlow", "Docker"],
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4edea3"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
      tag: "LLM & Generative AI",
      desc: "RAG pipelines, fine-tuning with LoRA/QLoRA, prompt engineering, and production deployment of large language models.",
      badges: ["LangChain", "OpenAI", "Transformers"],
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4e4fa"
          strokeWidth="2"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M12 7v4M12 11l-5 6M12 11l5 6" />
        </svg>
      ),
      tag: "Cloud & Data Engineering",
      desc: "Scalable data pipelines and ML infrastructure across AWS, Azure, and GCP with real-time streaming and analytics.",
      badges: ["AWS", "Azure", "Spark"],
    },
  ];

  const projects = [
    {
      tag: "NETWORK INTELLIGENCE",
      title: "Network Operations RAG Agent",
      accentColor: COLORS.tertiary,
      desc: "Built an agentic RAG system that ingests network telemetry and operations runbooks, enabling natural-language querying of infrastructure state, automated root-cause analysis, and on-call triage at scale.",
      badges: ["LangChain", "RAG", "Vector DB", "Python"],
      svgContent: (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          {/* Central hub */}
          <circle
            cx="70"
            cy="50"
            r="10"
            fill="rgba(78,222,163,.15)"
            stroke="#4edea3"
            strokeWidth="1.5"
          />
          <text
            x="70"
            y="54"
            textAnchor="middle"
            fontSize="8"
            fill="#4edea3"
            fontFamily="monospace"
          >
            RAG
          </text>
          {/* Satellite nodes */}
          {[
            { cx: 20, cy: 20 },
            { cx: 120, cy: 20 },
            { cx: 15, cy: 70 },
            { cx: 125, cy: 70 },
            { cx: 70, cy: 90 },
          ].map((n, i) => (
            <g key={i}>
              <line
                x1="70"
                y1="50"
                x2={n.cx}
                y2={n.cy}
                stroke="#4edea3"
                strokeWidth="1"
                opacity=".3"
                strokeDasharray="3 3"
              />
              <circle
                cx={n.cx}
                cy={n.cy}
                r="5"
                fill="rgba(78,222,163,.2)"
                stroke="#4edea3"
                strokeWidth="1"
                opacity=".7"
              />
            </g>
          ))}
          {/* Pulse ring */}
          <circle
            cx="70"
            cy="50"
            r="18"
            stroke="#4edea3"
            strokeWidth="0.5"
            opacity=".3"
          />
          <circle
            cx="70"
            cy="50"
            r="26"
            stroke="#4edea3"
            strokeWidth="0.5"
            opacity=".15"
          />
        </svg>
      ),
      bgGradient:
        "linear-gradient(135deg, #0d1c2d 0%, #001c10 60%, #051424 100%)",
    },
    {
      tag: "HEALTHCARE AI",
      title: "Healthcare Ticket Triage & Fraud Analytics Platform",
      accentColor: COLORS.secondary,
      desc: "Designed an end-to-end platform combining NLP-based ticket classification and ML-driven fraud detection for healthcare operations, reducing manual review time and surfacing anomalous billing patterns in real time.",
      badges: ["NLP", "XGBoost", "Spark", "Azure"],
      svgContent: (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          {/* Ticket stack */}
          <rect
            x="25"
            y="30"
            width="55"
            height="38"
            rx="4"
            fill="rgba(93,230,255,.06)"
            stroke="#5de6ff"
            strokeWidth="1"
            opacity=".5"
          />
          <rect
            x="30"
            y="25"
            width="55"
            height="38"
            rx="4"
            fill="rgba(93,230,255,.08)"
            stroke="#5de6ff"
            strokeWidth="1"
            opacity=".6"
          />
          <rect
            x="35"
            y="20"
            width="55"
            height="38"
            rx="4"
            fill="rgba(93,230,255,.1)"
            stroke="#5de6ff"
            strokeWidth="1.5"
            opacity=".8"
          />
          {/* Lines inside top ticket */}
          {[0, 1, 2].map((i) => (
            <line
              key={i}
              x1="42"
              y1={28 + i * 7}
              x2={72 - i * 6}
              y2={28 + i * 7}
              stroke="#5de6ff"
              strokeWidth="1.2"
              opacity=".5"
            />
          ))}
          {/* Fraud shield */}
          <path
            d="M105 22 L118 28 L118 42 C118 50 105 55 105 55 C105 55 92 50 92 42 L92 28 Z"
            fill="rgba(78,222,163,.1)"
            stroke="#4edea3"
            strokeWidth="1.2"
            opacity=".8"
          />
          <text
            x="105"
            y="42"
            textAnchor="middle"
            fontSize="9"
            fill="#4edea3"
            fontFamily="monospace"
          >
            ✓
          </text>
        </svg>
      ),
      bgGradient:
        "linear-gradient(135deg, #0d1c2d 0%, #00121e 60%, #051424 100%)",
    },
    {
      tag: "FINTECH ML",
      title: "Real-Time Credit Risk Scoring Engine",
      accentColor: COLORS.tertiary,
      desc: "Engineered a low-latency credit risk pipeline processing live transaction streams, featuring automated feature engineering, model retraining triggers, and explainability outputs for regulatory compliance.",
      badges: ["Kafka", "MLflow", "Python", "AWS"],
      svgContent: (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
          {/* Chart bars */}
          {[
            { x: 18, h: 30, o: 0.4 },
            { x: 34, h: 45, o: 0.5 },
            { x: 50, h: 35, o: 0.55 },
            { x: 66, h: 55, o: 0.65 },
            { x: 82, h: 42, o: 0.7 },
            { x: 98, h: 62, o: 0.85 },
            { x: 114, h: 50, o: 1 },
          ].map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={80 - b.h}
              width="12"
              height={b.h}
              rx="2"
              fill={`rgba(78,222,163,${b.o * 0.3})`}
              stroke="#4edea3"
              strokeWidth="1"
              opacity={b.o}
            />
          ))}
          {/* Trend line */}
          <polyline
            points="24,65 40,50 56,58 72,38 88,46 104,28 120,36"
            stroke="#5de6ff"
            strokeWidth="1.5"
            fill="none"
            opacity=".6"
            strokeDasharray="3 2"
          />
          {/* Baseline */}
          <line
            x1="12"
            y1="80"
            x2="128"
            y2="80"
            stroke="#4edea3"
            strokeWidth="0.8"
            opacity=".3"
          />
        </svg>
      ),
      bgGradient:
        "linear-gradient(135deg, #001c10 0%, #0d1c2d 60%, #051424 100%)",
    },
  ];

  const stats = [
    { value: "8+", label: "YEARS EXPERIENCE" },
    { value: "4", label: "COMPANIES" },
    { value: "3", label: "CLOUD PLATFORMS" },
    { value: "4", label: "CERTIFICATIONS" },
  ];

  const footerLinks = [
    { label: "GitHub", href: "https://github.com/arnold655" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/arnold-kumar-m-bb6012241",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body {
          background-color: #051424;
          color: #d4e4fa;
          font-family: 'Inter', sans-serif;
          margin: 0;
          cursor: none;
        }
        .grid-pattern {
          background-image: radial-gradient(rgba(78,222,163,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .glass-panel {
          background: rgba(15,23,42,0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148,163,184,0.1);
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
          #cursor-dot {
            width: 6px; height: 6px;
            background: #10B981;
            transition: width .3s, height .3s;
          }
          #cursor-ring {
            width: 32px; height: 32px;
            border: 1px solid #10B981;
            box-shadow: 0 0 10px rgba(16,185,129,.2);
            transition: width .3s, height .3s, background-color .3s;
          }
          body.cursor-active #cursor-ring {
            width: 56px; height: 56px;
            background: rgba(16,185,129,.05);
          }
        }
        .underline-expand { position: relative; }
        .underline-expand::after {
          content: '';
          position: absolute;
          width: 0; height: 1px;
          bottom: -2px; left: 50%;
          background: #5de6ff;
          transition: all .3s;
          transform: translateX(-50%);
        }
        .underline-expand:hover::after { width: 100%; }
        .metric-card {
          transition: border-color .3s, box-shadow .3s, opacity .7s, transform .7s;
        }
        .metric-card:hover {
          border-color: #4edea3 !important;
          box-shadow: 0 0 20px rgba(78,222,163,.07);
        }
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .7s ease, transform .7s ease;
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem 1.5rem 2rem;
          background: rgba(5,20,36,.97);
          border-top: 1px solid rgba(69,70,77,.3);
        }
        .mobile-nav.open { display: flex; }
        @media (max-width: 767px) {
          body { cursor: auto; }
          #cursor-dot, #cursor-ring { display: none; }
        }
      `}</style>

      <div id="cursor-dot" className="hidden md:block" />
      <div id="cursor-ring" className="hidden md:block" />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(5,20,36,.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid rgba(69,70,77,${scrolled ? ".3" : ".1"})`,
          transition: "border-color .3s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: COLORS.onSurface,
            }}
          >
            Arnold
          </span>

          <div
            className="hidden md:flex"
            style={{ gap: 32, alignItems: "center" }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 16,
                  color: COLORS.onSurfaceVariant,
                  textDecoration: "none",
                  transition: "color .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.secondary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = COLORS.onSurfaceVariant)
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="https://www.linkedin.com/in/arnold-kumar-m-bb6012241"
            target="_blank"
            style={{
              background: COLORS.secondary,
              color: COLORS.onPrimaryFixed,
              fontWeight: 700,
              padding: "8px 24px",
              borderRadius: 4,
              fontSize: 14,
              textDecoration: "none",
              transition: "opacity .2s",
            }}
            className="hidden md:inline-flex items-center"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = ".8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Connect
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.onSurface,
              padding: 8,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 14,
                letterSpacing: ".05em",
                color: COLORS.onSurface,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="https://www.linkedin.com/in/arnold-kumar-m-bb6012241"
            target="_blank"
            style={{
              background: COLORS.secondary,
              color: COLORS.onPrimaryFixed,
              fontWeight: 700,
              padding: "10px 20px",
              borderRadius: 4,
              fontSize: 14,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Connect
          </Link>
        </div>
      </nav>

      <main className="grid-pattern">
        {/* HERO */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            paddingTop: 160,
            paddingBottom: 120,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 50%, rgba(78,222,163,.08) 0%, transparent 50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, #051424 0%, transparent 30%, transparent 70%, #051424 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(5,20,36,.6)",
              }}
            />
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: 24,
                alignItems: "center",
              }}
            >
              <div style={{ gridColumn: "span 12" }} className="md:col-span-8">
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 12px",
                    background: COLORS.surfaceContainerHigh,
                    border: "1px solid rgba(148,163,184,.15)",
                    borderRadius: 99,
                    marginBottom: 24,
                  }}
                >
                  <IconVerified />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 12,
                      letterSpacing: ".05em",
                      color: COLORS.onSurfaceVariant,
                    }}
                  >
                    SENIOR AI SYSTEMS ARCHITECT
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: COLORS.onSurface,
                    marginBottom: 32,
                    fontSize: "clamp(36px, 6vw, 64px)",
                  }}
                >
                  Architecting Scalable{" "}
                  <span style={{ color: COLORS.tertiary }}>AI Systems</span> for
                  Global Impact.
                </h1>

                <p
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: COLORS.onSurfaceVariant,
                    maxWidth: 640,
                    marginBottom: 40,
                  }}
                >
                  8+ years of expertise bridging the gap between cutting-edge
                  research and production-grade deployments. Specializing in
                  high-throughput MLOps pipelines, generative AI, and
                  cloud-native data engineering.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  <button
                    style={{
                      background: COLORS.secondary,
                      color: COLORS.onPrimaryFixed,
                      fontWeight: 700,
                      padding: "14px 32px",
                      borderRadius: 4,
                      border: "none",
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "none",
                      transition: "opacity .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = ".9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Explore Systems <IconArrowRight />
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: COLORS.onSurface,
                      fontFamily: "'JetBrains Mono',monospace",
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: ".05em",
                      padding: "14px 32px",
                      borderRadius: 4,
                      border: "1px solid rgba(148,163,184,.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "none",
                      transition: "border-color .3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = COLORS.secondary)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(148,163,184,.2)")
                    }
                  >
                    View Tech Stack <IconTerminal />
                  </button>
                </div>
              </div>

              {/* Hero right – profile + spinning ring */}
              <div
                className="hidden md:flex"
                style={{
                  gridColumn: "span 4",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 360,
                }}
              >
                <div
                  className="spin-slow"
                  style={{
                    position: "absolute",
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    border: "2px dashed rgba(148,163,184,.2)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: 14,
                      height: 14,
                      background: COLORS.tertiary,
                      borderRadius: "50%",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: 10,
                      height: 10,
                      background: COLORS.secondary,
                      borderRadius: "50%",
                      bottom: "25%",
                      right: 0,
                    }}
                  />
                </div>
                <div
                  className="glass-panel"
                  style={{
                    borderRadius: 16,
                    padding: "24px 28px",
                    textAlign: "center",
                    transform: "rotate(3deg)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 180,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: `2px solid ${COLORS.tertiary}`,
                    }}
                  >
                    <Image
                      src="/profile.jpeg"
                      alt="Arnold Kumar"
                      width={80}
                      height={80}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        color: COLORS.tertiary,
                        fontSize: 22,
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      AI / ML
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 10,
                        letterSpacing: ".05em",
                        color: COLORS.onSurfaceVariant,
                        marginTop: 4,
                      }}
                    >
                      SYSTEMS ARCHITECT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE EXPERTISE */}
        <section style={{ padding: "120px 0", background: "rgba(1,15,31,.5)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 64,
                gap: 24,
              }}
            >
              <div style={{ maxWidth: 480 }}>
                <h2
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 32,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: COLORS.onSurface,
                    marginBottom: 12,
                  }}
                >
                  Core Expertise
                </h2>
                <p
                  style={{
                    color: COLORS.onSurfaceVariant,
                    fontSize: 16,
                    lineHeight: 1.6,
                  }}
                >
                  Systemic solutions for complex intelligence challenges, from
                  generative AI pipelines to high-availability cloud
                  deployments.
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 13,
                  letterSpacing: ".05em",
                  color: COLORS.tertiary,
                }}
              >
                / DOMAIN_MASTERY
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 32,
              }}
            >
              {expertise.map((e, i) => (
                <div
                  key={i}
                  data-reveal
                  className="metric-card glass-panel"
                  style={{
                    padding: 32,
                    borderRadius: 8,
                    border: "1px solid rgba(148,163,184,.1)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: "rgba(93,230,255,.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    {e.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: COLORS.onSurface,
                      marginBottom: 12,
                    }}
                  >
                    {e.tag}
                  </h3>
                  <p
                    style={{
                      color: COLORS.onSurfaceVariant,
                      fontSize: 15,
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    {e.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {e.badges.map((b) => (
                      <span
                        key={b}
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 11,
                          padding: "3px 10px",
                          background: COLORS.surfaceVariant,
                          borderRadius: 3,
                          color: COLORS.onSurfaceVariant,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section style={{ padding: "120px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <h2
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 32,
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: COLORS.onSurface,
                  marginBottom: 8,
                }}
              >
                Technical Case Studies
              </h2>
              <div
                style={{
                  width: 80,
                  height: 3,
                  background: COLORS.tertiary,
                  margin: "0 auto",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
              {projects.map((p, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    data-reveal
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: 48,
                      alignItems: "center",
                    }}
                  >
                    {/* Visual – alternates sides on desktop */}
                    <div
                      style={{
                        order: isEven ? 1 : 2,
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid rgba(148,163,184,.1)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          aspectRatio: "16/9",
                          background: p.bgGradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {p.svgContent}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, #051424 0%, transparent 60%)",
                        }}
                      />
                    </div>

                    {/* Text */}
                    <div style={{ order: isEven ? 2 : 1 }}>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 12,
                          letterSpacing: ".05em",
                          color: COLORS.tertiary,
                          marginBottom: 16,
                        }}
                      >
                        {p.tag}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: 26,
                          fontWeight: 600,
                          color: COLORS.onSurface,
                          lineHeight: 1.25,
                          marginBottom: 24,
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          color: COLORS.onSurfaceVariant,
                          fontSize: 16,
                          lineHeight: 1.7,
                          marginBottom: 24,
                        }}
                      >
                        {p.desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 28,
                        }}
                      >
                        {p.badges.map((b) => (
                          <span
                            key={b}
                            style={{
                              fontFamily: "'JetBrains Mono',monospace",
                              fontSize: 11,
                              padding: "3px 10px",
                              background: COLORS.surfaceVariant,
                              borderRadius: 3,
                              color: COLORS.onSurfaceVariant,
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="https://github.com/arnold655"
                        target="_blank"
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 13,
                          letterSpacing: ".05em",
                          color: COLORS.secondary,
                          textDecoration: "none",
                        }}
                        className="underline-expand"
                      >
                        GITHUB REPO
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          style={{
            padding: "96px 0",
            borderTop: "1px solid rgba(69,70,77,.2)",
            borderBottom: "1px solid rgba(69,70,77,.2)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 32,
                textAlign: "center",
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 40,
                      fontWeight: 700,
                      color: COLORS.onSurface,
                      marginBottom: 8,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11,
                      letterSpacing: ".05em",
                      color: COLORS.tertiary,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "120px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 800,
              height: 800,
              background: "rgba(78,222,163,.04)",
              filter: "blur(120px)",
              borderRadius: "50%",
              zIndex: -1,
            }}
          />
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: COLORS.onSurface,
                marginBottom: 24,
                fontSize: "clamp(32px, 5vw, 52px)",
              }}
            >
              Ready to Architect the Future?
            </h2>
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                color: COLORS.onSurfaceVariant,
                maxWidth: 600,
                margin: "0 auto 48px",
              }}
            >
              I am currently open to high-impact roles and technical advisory
              for AI-driven organizations. Let's discuss how we can scale your
              intelligence infrastructure.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <Link
                href="https://www.linkedin.com/in/arnold-kumar-m-bb6012241"
                target="_blank"
                style={{
                  background: COLORS.secondary,
                  color: COLORS.onPrimaryFixed,
                  fontWeight: 700,
                  padding: "16px 40px",
                  borderRadius: 4,
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "transform .2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Schedule Technical Deep-Dive
              </Link>
              <a
                href="/resume.pdf"
                download
                style={{
                  background: "transparent",
                  color: COLORS.onSurface,
                  fontWeight: 700,
                  padding: "16px 40px",
                  borderRadius: 4,
                  fontSize: 16,
                  textDecoration: "none",
                  border: `1px solid ${COLORS.outlineVariant}`,
                  transition: "background .2s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = COLORS.surfaceVariant)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Download CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: COLORS.background,
          borderTop: "1px solid rgba(69,70,77,.2)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "64px 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.onSurface,
                marginBottom: 8,
              }}
            >
              Arnold
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11,
                letterSpacing: ".03em",
                color: COLORS.onSurfaceVariant,
              }}
            >
              © 2024 Arnold | AI/ML Systems Architect. Built with Precision.
            </div>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target="_blank"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 12,
                  letterSpacing: ".05em",
                  color: COLORS.onSurfaceVariant,
                  textDecoration: "none",
                  transition: "color .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.tertiary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = COLORS.onSurfaceVariant)
                }
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
