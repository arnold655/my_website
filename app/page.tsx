"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

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

  const navLinks: {
    label: string;
    href: string;
    target?: string;
    download?: boolean;
  }[] = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "AI Systems", href: "#ai-systems" },
    { label: "Resume", href: "/resume.pdf", target: "_blank", download: true },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
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
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.4); } }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(90deg, #4edea3 0%, #5de6ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .profile-card-glow {
          box-shadow: 0 0 0 1px rgba(78,222,163,.15), 0 8px 32px rgba(78,222,163,.12), 0 32px 64px rgba(5,20,36,.8);
        }
        .project-card-hover {
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .project-card-hover:hover {
          border-color: rgba(93,230,255,.25) !important;
          box-shadow: 0 0 32px rgba(93,230,255,.06), 0 16px 48px rgba(5,20,36,.6);
          transform: translateY(-2px);
        }
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
                target={l.target}
                download={l.download}
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
              target={l.target}
              download={l.download}
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
                    padding: "6px 14px 6px 10px",
                    background: "rgba(78,222,163,.06)",
                    border: "1px solid rgba(78,222,163,.2)",
                    borderRadius: 99,
                    marginBottom: 28,
                  }}
                >
                  <span
                    className="pulse-dot"
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: COLORS.tertiary,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11,
                      letterSpacing: ".08em",
                      color: COLORS.tertiary,
                    }}
                  >
                    SENIOR AI/ML Engineer
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
                  Building Enterprise{" "}
                  <span className="gradient-text">AI Systems</span> That Scale.
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
                  Senior AI/ML Engineer with 8+ years of experience designing
                  machine learning platforms, RAG applications, and agentic AI
                  systems across network infrastructure, healthcare, and
                  financial services.
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

              {/* Hero right – AI ID Card portrait */}
              <div
                className="hidden md:flex"
                style={{
                  gridColumn: "span 4",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 500,
                }}
              >
                {/* Ambient glow backdrop */}
                <div
                  style={{
                    position: "absolute",
                    width: 340,
                    height: 340,
                    background:
                      "radial-gradient(circle, rgba(78,222,163,.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(48px)",
                    zIndex: 0,
                  }}
                />

                {/* ID Card frame */}
                <div
                  style={{
                    position: "relative",
                    width: 270,
                    height: 400,
                    zIndex: 1,
                  }}
                >
                  {/* Corner brackets */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 22,
                      height: 22,
                      borderTop: `2px solid ${COLORS.tertiary}`,
                      borderLeft: `2px solid ${COLORS.tertiary}`,
                      zIndex: 4,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 22,
                      height: 22,
                      borderTop: `2px solid ${COLORS.tertiary}`,
                      borderRight: `2px solid ${COLORS.tertiary}`,
                      zIndex: 4,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: 22,
                      height: 22,
                      borderBottom: `2px solid ${COLORS.tertiary}`,
                      borderLeft: `2px solid ${COLORS.tertiary}`,
                      zIndex: 4,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 22,
                      height: 22,
                      borderBottom: `2px solid ${COLORS.tertiary}`,
                      borderRight: `2px solid ${COLORS.tertiary}`,
                      zIndex: 4,
                    }}
                  />

                  {/* Thin outer border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "1px solid rgba(78,222,163,.15)",
                      borderRadius: 2,
                      zIndex: 3,
                      pointerEvents: "none",
                    }}
                  />

                  {/* Image + overlays */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 2,
                      overflow: "hidden",
                      background: "#0a1929",
                    }}
                  >
                    <Image
                      src="/profile.jpeg"
                      alt="Arnold Kumar"
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                      priority
                    />

                    {/* Bottom gradient fade */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "55%",
                        background:
                          "linear-gradient(to top, rgba(5,20,36,1) 0%, rgba(5,20,36,.75) 50%, transparent 100%)",
                        zIndex: 1,
                      }}
                    />

                    {/* Subtle scanline texture */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.04) 3px, rgba(0,0,0,.04) 4px)",
                        zIndex: 2,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Top scan info */}
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        right: 10,
                        zIndex: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9,
                          letterSpacing: ".1em",
                          color: COLORS.tertiary,
                          textShadow: "0 0 10px rgba(78,222,163,.6)",
                        }}
                      >
                        SCAN_ID: ARNOLD
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 8,
                          letterSpacing: ".08em",
                          color: "rgba(212,228,250,.45)",
                        }}
                      >
                        CLEARANCE: LVL-5 / ACTIVE
                      </span>
                    </div>

                    {/* Bottom overlay text */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        right: 12,
                        zIndex: 3,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 8,
                          letterSpacing: ".1em",
                          color: "rgba(212,228,250,.4)",
                          marginBottom: 3,
                        }}
                      >
                        ROLE
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 10,
                          letterSpacing: ".06em",
                          color: COLORS.secondary,
                          fontWeight: 500,
                          marginBottom: 10,
                        }}
                      >
                        SENIOR_AI_ML_ENGINEER
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span
                          className="pulse-dot"
                          style={{
                            display: "inline-block",
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: COLORS.tertiary,
                            boxShadow: `0 0 6px ${COLORS.tertiary}`,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: 9,
                            letterSpacing: ".1em",
                            color: COLORS.tertiary,
                          }}
                        >
                          STATUS: Building GenAI @ Forward Networks
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating status badge – overlapping bottom-right of card */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 36,
                    right: 0,
                    background: "rgba(12,22,40,.97)",
                    border: "1px solid rgba(93,230,255,.2)",
                    borderRadius: 6,
                    padding: "10px 14px",
                    zIndex: 5,
                    backdropFilter: "blur(16px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    minWidth: 138,
                    boxShadow: "0 8px 24px rgba(0,0,0,.5)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 8,
                      letterSpacing: ".1em",
                      color: "rgba(198,198,205,.4)",
                      marginBottom: 2,
                      borderBottom: "1px solid rgba(93,230,255,.08)",
                      paddingBottom: 4,
                    }}
                  >
                    CURRENT FOCUS
                  </div>
                  {[
                    { label: "RAG", color: COLORS.tertiary },
                    { label: "Agentic AI", color: COLORS.secondary },
                    { label: "MLOps", color: COLORS.onSurface },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: item.color,
                          boxShadow: `0 0 4px ${item.color}`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9,
                          color: item.color,
                          letterSpacing: ".04em",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI SYSTEMS */}
        <section
          id="ai-systems"
          style={{ padding: "120px 0", position: "relative" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div
              data-reveal
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
                  AI Systems in Motion
                </h2>
                <p
                  style={{
                    color: COLORS.onSurfaceVariant,
                    fontSize: 16,
                    lineHeight: 1.6,
                  }}
                >
                  Explore the intelligence architecture powering next-generation
                  enterprise systems — from real-time ML pipelines to autonomous
                  agentic workflows.
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
                / AI_SYSTEMS_SHOWCASE
              </span>
            </div>

            <div
              data-reveal
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(78,222,163,.15)",
                background: "rgba(0,0,0,.96)",
                boxShadow:
                  "0 0 80px rgba(78,222,163,.04), 0 32px 64px rgba(5,20,36,.8)",
              }}
            >
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="#4edea3"
              />

              <div
                style={{ display: "flex" }}
                className="flex-col md:flex-row md:h-[500px]"
              >
                {/* Left – text */}
                <div
                  style={{
                    flex: 1,
                    padding: "48px",
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 12px 4px 10px",
                      background: "rgba(78,222,163,.06)",
                      border: "1px solid rgba(78,222,163,.2)",
                      borderRadius: 99,
                      marginBottom: 24,
                      width: "fit-content",
                    }}
                  >
                    <span
                      className="pulse-dot"
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: COLORS.tertiary,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 10,
                        letterSpacing: ".1em",
                        color: COLORS.tertiary,
                      }}
                    >
                      INTERACTIVE_3D
                    </span>
                  </div>

                  <h3
                    className="gradient-text"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      marginBottom: 20,
                      fontSize: "clamp(28px, 4vw, 44px)",
                    }}
                  >
                    Enterprise AI
                    <br />
                    Architecture
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: COLORS.onSurfaceVariant,
                      maxWidth: 420,
                      marginBottom: 32,
                    }}
                  >
                    From agentic RAG pipelines to real-time ML inference at
                    scale — building the intelligence layer that powers
                    enterprise decision-making.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      "RAG Pipelines",
                      "Agentic AI",
                      "MLOps",
                      "LLM Fine-tuning",
                    ].map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 11,
                          padding: "4px 12px",
                          background: COLORS.surfaceVariant,
                          borderRadius: 3,
                          color: COLORS.onSurfaceVariant,
                          border: "1px solid rgba(93,230,255,.1)",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right – Spline scene */}
                <div
                  className="min-h-[300px] md:min-h-0"
                  style={{ flex: 1, position: "relative" }}
                >
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section id="portfolio" style={{ padding: "120px 0" }}>
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
                      className="project-card-hover"
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
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 12,
                          letterSpacing: ".06em",
                          color: COLORS.secondary,
                          textDecoration: "none",
                          padding: "8px 18px",
                          border: "1px solid rgba(93,230,255,.25)",
                          borderRadius: 4,
                          background: "rgba(93,230,255,.04)",
                          transition: "background .2s, border-color .2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(93,230,255,.10)";
                          e.currentTarget.style.borderColor =
                            "rgba(93,230,255,.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(93,230,255,.04)";
                          e.currentTarget.style.borderColor =
                            "rgba(93,230,255,.25)";
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        VIEW ON GITHUB
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
          id="experience"
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
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    padding: "24px 0",
                    borderTop: `2px solid ${i % 2 === 0 ? COLORS.tertiary : COLORS.secondary}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 48,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: COLORS.onSurface,
                      marginBottom: 8,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      letterSpacing: ".08em",
                      color: COLORS.onSurfaceVariant,
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
          id="contact"
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
