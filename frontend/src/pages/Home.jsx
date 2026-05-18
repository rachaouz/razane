import { useNavigate }          from "react-router-dom";
import { useState, useEffect }  from "react";
import { LOGO_URL, MOBILIS_LOGO_URL, COLORS } from "../constants";
import { PageBackground }        from "../styles/background";

const G = COLORS.green;

const STATS = [
  { val: "50K+",        label: "IOCs analyzed",  color: COLORS.cyan },
  { val: "99.2%",       label: "Detection rate", color: G           },
  { val: "<10s",        label: "Response time",  color: "#fff"      },
  { val: "Phi-3 Gemma", label: "2 LLMs",         color: G           },
];

const RING_CONFIG = [
  { scale: 1,    opacity: 0.08, duration: 22, reverse: false },
  { scale: 0.78, opacity: 0.12, duration: 15, reverse: true  },
  { scale: 0.56, opacity: 0.18, duration: 9,  reverse: false },
];

// CORRECTION 1 : initialisation lazy pour éviter window.innerWidth
// au premier render (crash potentiel si SSR ou render côté serveur)
function useWindowSize() {
  const [size, setSize] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth  : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  useEffect(() => {
    const handler = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

// ── Sous-composants ────────────────────────────────────────────────────────────

function Navbar() {
  const navigate = useNavigate();
  // CORRECTION 2 : hover via state React, pas e.currentTarget.style (mutation DOM directe)
  const [hovered, setHovered] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(16px, 3vw, 48px)", height: "clamp(48px, 5vw, 64px)",
      background: "rgba(5,10,18,0.75)",
      borderBottom: "1px solid rgba(127,216,50,0.08)",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 12px)" }}>
        <img src={LOGO_URL} alt="Socilis" style={{ height: "clamp(20px, 2.5vw, 30px)", width: "auto" }} />
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(0.8rem, 1.2vw, 1.15rem)", letterSpacing: "0.12em", color: "#fff" }}>
          SOC<span style={{ color: G }}>ILIS</span>
        </span>
        <span className="socilis-badge" style={{ fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)", letterSpacing: "0.2em", color: "rgba(127,216,50,0.45)", padding: "2px 8px", border: "1px solid rgba(127,216,50,0.15)", borderRadius: "20px", fontFamily: "'DM Mono', monospace" }}>
          THREAT INTEL
        </span>
      </div>

      <button
        onClick={() => navigate("/auth")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "clamp(6px, 0.8vw, 9px) clamp(12px, 1.5vw, 20px)",
          borderRadius: "8px", cursor: "pointer", transition: "all 0.2s",
          textTransform: "uppercase", letterSpacing: "0.18em",
          fontFamily: "'DM Mono', monospace", fontWeight: 500,
          fontSize: "clamp(0.55rem, 0.7vw, 0.65rem)",
          background: hovered ? "rgba(127,216,50,0.07)" : "rgba(127,216,50,0.03)",
          border:     hovered ? "1px solid rgba(127,216,50,0.35)" : "1px solid rgba(127,216,50,0.15)",
          color:      hovered ? G : "rgba(127,216,50,0.7)",
          transform:  hovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        LOG IN
      </button>
    </nav>
  );
}

function Stats() {
  return (
    <div className="socilis-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: "1px solid rgba(127,216,50,0.1)", borderRadius: "10px", overflow: "hidden", background: "rgba(127,216,50,0.02)", width: "100%", maxWidth: "clamp(280px, 38vw, 480px)" }}>
      {STATS.map((stat, i) => (
        <div key={i} style={{ padding: "clamp(10px, 1.2vw, 16px) clamp(6px, 1vw, 12px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", borderLeft: i > 0 ? "1px solid rgba(127,216,50,0.07)" : "none" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(0.75rem, 1.1vw, 1.1rem)", fontWeight: 800, color: stat.color, textAlign: "center", lineHeight: 1.2 }}>{stat.val}</span>
          <span style={{ fontSize: "clamp(0.45rem, 0.6vw, 0.58rem)", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", textAlign: "center" }}>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function NavButton({ label, to }) {
  const navigate = useNavigate();
  // CORRECTION 2 (même pattern) : hover via state
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => navigate(`/${to}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s",
        padding: "clamp(10px, 1vw, 13px) clamp(12px, 1.2vw, 18px)",
        textTransform: "uppercase", letterSpacing: "0.14em",
        fontFamily: "'DM Mono', monospace", fontWeight: 500,
        fontSize: "clamp(0.55rem, 0.7vw, 0.65rem)",
        background: hovered ? "rgba(127,216,50,0.07)" : "rgba(127,216,50,0.03)",
        border:     hovered ? "1px solid rgba(127,216,50,0.35)" : "1px solid rgba(127,216,50,0.15)",
        color:      hovered ? G : "rgba(127,216,50,0.7)",
        transform:  hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  );
}

function LogoOrb({ size }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(127,216,50,0.08) 0%, transparent 70%)" }} />
      {RING_CONFIG.map(({ scale, opacity, duration, reverse }, i) => (
        <div key={i} style={{ position: "absolute", width: `${scale * 100}%`, height: `${scale * 100}%`, border: `1px solid rgba(127,216,50,${opacity})`, borderRadius: "50%", animation: `ringRotate ${duration}s linear infinite ${reverse ? "reverse" : ""}` }} />
      ))}
      <img
        src={LOGO_URL}
        alt="Socilis"
        style={{ width: "38%", height: "auto", position: "relative", zIndex: 2, filter: "drop-shadow(0 0 20px rgba(0,200,255,0.45)) drop-shadow(0 0 40px rgba(127,216,50,0.2))", animation: "corePulse 4s ease-in-out infinite" }}
      />
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────────
export default function Home() {
  const { w } = useWindowSize();

  // CORRECTION 4 : isMedium supprimé (déclaré mais jamais utilisé)
  const isSmall = w < 720;
  const navH    = Math.min(64, Math.max(48, w * 0.05));
  const orbSize = Math.min(340, Math.max(160, w * 0.25));

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", flexDirection: "column", background: "#040a12", overflow: "hidden", fontFamily: "'DM Mono', monospace" }}>
      <PageBackground />
      <Navbar />

      {/* Hero */}
      <div
        className="socilis-hero"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: isSmall ? "column" : "row",
          flexWrap: isSmall ? "nowrap" : "wrap",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: navH,
          position: "relative",
          zIndex: 5,
          overflowY: isSmall ? "auto" : "hidden",
        }}
      >
        {/* Gauche */}
        <div
          className="socilis-left"
          style={{
            flex: isSmall ? "none" : "1 1 300px",
            padding: isSmall
              ? "clamp(16px, 3vh, 32px) clamp(16px, 5vw, 48px)"
              : "0 clamp(16px, 3vw, 48px) 0 clamp(16px, 4vw, 72px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: isSmall ? "100%" : "55%",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "20px", border: "1px solid rgba(0,200,255,0.2)", background: "rgba(0,200,255,0.04)", marginBottom: "clamp(10px, 1.5vh, 22px)", width: "fit-content" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c8ff", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "clamp(0.45rem, 0.6vw, 0.58rem)", letterSpacing: "0.2em", color: "#00c8ff", textTransform: "uppercase" }}>SOC AI Platform · Live</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isSmall ? "clamp(2rem, 10vw, 3rem)" : "clamp(2.4rem, 5vw, 4.8rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "0.03em", color: "#fff", marginBottom: "clamp(6px, 1vh, 14px)" }}>
            SOC<span style={{ color: G, filter: "drop-shadow(0 0 18px rgba(127,216,50,0.35))" }}>ILIS</span>
          </h1>

          <p style={{ fontSize: "clamp(0.55rem, 0.8vw, 0.7rem)", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "clamp(6px, 0.8vh, 12px)" }}>
            Detect faster. Respond smarter.
          </p>

          <p style={{ fontSize: isSmall ? "clamp(0.7rem, 2.5vw, 0.85rem)" : "clamp(0.72rem, 0.9vw, 0.88rem)", color: "rgba(255,255,255,0.35)", lineHeight: 1.85, maxWidth: "clamp(260px, 30vw, 400px)", marginBottom: "clamp(16px, 2.5vh, 36px)" }}>
            AI-powered threat intelligence platform for real-time IOC enrichment, automated analysis, and incident response.
          </p>

          <Stats />
        </div>

        {/* Droite */}
        <div
          className="socilis-right"
          style={{
            flex: isSmall ? "none" : "1 1 220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isSmall ? "clamp(12px, 2vh, 20px)" : "clamp(16px, 2vh, 28px)",
            padding: isSmall
              ? "0 clamp(16px, 5vw, 48px) clamp(16px, 2vh, 32px)"
              : "0 clamp(16px, 4vw, 64px) 0 clamp(8px, 1.5vw, 20px)",
          }}
        >
          <LogoOrb size={orbSize} />
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 0.8vh, 10px)", width: "100%", maxWidth: isSmall ? "min(90%, 320px)" : "clamp(200px, 24vw, 340px)" }}>
            <NavButton label="Models"   to="models"   />
            <NavButton label="Platform" to="platform" />
            <NavButton label="Mission"  to="mission"  />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(8px, 1vh, 14px) clamp(16px, 3vw, 48px)", borderTop: "1px solid rgba(127,216,50,0.07)", background: "rgba(4,10,18,0.5)" }}>
        <img src={MOBILIS_LOGO_URL} alt="Mobilis" style={{ height: "clamp(16px, 2vh, 26px)", opacity: 0.5 }} />
        <span style={{ fontSize: "clamp(0.45rem, 0.6vw, 0.58rem)", color: "rgba(255,255,255,0.15)", letterSpacing: "0.12em" }}>SOCILIS · USTHB 2026</span>
      </div>

      <style>{`
        @keyframes pulse      { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes ringRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes corePulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.88;transform:scale(1.04)} }

        @media (min-width: 720px) and (max-width: 1023px) {
          .socilis-hero  { gap: 0; }
          .socilis-left  { padding-left: 32px !important; padding-right: 20px !important; }
          .socilis-right { padding-right: 24px !important; }
          .socilis-stats { max-width: 100% !important; }
        }
        @media (max-width: 719px) {
          .socilis-badge { display: none; }
          .socilis-stats { max-width: 100% !important; }
        }
        @media (min-width: 1600px) {
          .socilis-left { padding-left: 100px !important; }
        }
      `}</style>
    </div>
  );
}