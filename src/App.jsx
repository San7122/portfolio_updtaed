import { useState, useEffect, useRef, useCallback } from "react";

const HERO_IMG = "data:image/jpeg;base64,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";

/* ─── 3D Particle Field (Canvas) ────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, particles, frame;
    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    resize();
    particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 1000,
      r: Math.random() * 2 + 0.3,
      speed: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.fillStyle = "rgba(6,6,18,0.15)";
      ctx.fillRect(0, 0, w, h);
      particles.forEach((p) => {
        p.z -= p.speed * 2;
        if (p.z <= 0) { p.z = 1000; p.x = Math.random() * w; p.y = Math.random() * h; }
        const scale = 800 / (800 + p.z);
        const sx = (p.x - w / 2) * scale + w / 2;
        const sy = (p.y - h / 2) * scale + h / 2;
        const sr = p.r * scale;
        const alpha = (1 - p.z / 1000) * 0.7;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${alpha})`;
        ctx.fill();
      });
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const sa = 800 / (800 + a.z), sb = 800 / (800 + b.z);
          const ax = (a.x - w/2)*sa + w/2, ay = (a.y - h/2)*sa + h/2;
          const bx = (b.x - w/2)*sb + w/2, by = (b.y - h/2)*sb + h/2;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 80) {
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - d/80)})`;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ─── Navigation Bar ────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const navLinks = ["About", "Skills", "Experience", "Education", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px",
      background: scrolled ? "rgba(6,6,18,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,229,255,0.08)" : "none",
      transition: "all 0.35s ease",
    }}>
      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 22, color: "#00e5ff", letterSpacing: -0.5 }}>ST</span>
      <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontSize: 12, fontWeight: 600, color: "#7a7a90",
            textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => { e.target.style.color = "#00e5ff"; }}
          onMouseLeave={e => { e.target.style.color = "#7a7a90"; }}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Mouse-tracked 3D Container ────────────────────────────── */
function Scene3D({ children }) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e) => {
    const x = (e.clientY / window.innerHeight - 0.5) * -6;
    const y = (e.clientX / window.innerWidth - 0.5) * 6;
    setRot({ x, y });
  }, []);
  return (
    <div onMouseMove={onMove} style={{ perspective: "1200px", minHeight: "100vh" }}>
      <div style={{
        transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Scroll Progress ────────────────────────────────────────── */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => setP(document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight));
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${p * 100}%`, background: "linear-gradient(90deg,#00e5ff,#7c4dff,#ff4081)", zIndex: 9999, transition: "width 0.05s" }} />;
}

/* ─── Scroll Reveal ──────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, {
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0) rotateX(0deg)" : "translateY(60px) rotateX(-8deg)",
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
  }];
}

/* ─── Typing Effect ──────────────────────────────────────────── */
function Typer({ texts }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    let t;
    if (!del && txt.length < cur.length) t = setTimeout(() => setTxt(cur.slice(0, txt.length + 1)), 65);
    else if (!del) t = setTimeout(() => setDel(true), 2200);
    else if (del && txt.length > 0) t = setTimeout(() => setTxt(cur.slice(0, txt.length - 1)), 30);
    else { setDel(false); setIdx((i) => (i + 1) % texts.length); }
    return () => clearTimeout(t);
  }, [txt, del, idx, texts]);
  return <span>{txt}<span style={{ borderRight: "2px solid #00e5ff", marginLeft: 2, animation: "blink 1s step-end infinite" }}>&nbsp;</span></span>;
}

/* ─── 3D Tilt Card ───────────────────────────────────────────── */
function Card3D({ children, style = {}, depth = 12 }) {
  const ref = useRef(null);
  const [tf, setTf] = useState("");
  const [glow, setGlow] = useState("");
  return (
    <div ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const rx = ((y - r.height/2) / r.height) * -depth;
        const ry = ((x - r.width/2) / r.width) * depth;
        setTf(`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`);
        setGlow(`radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.12), transparent 60%)`);
      }}
      onMouseLeave={() => { setTf(""); setGlow(""); }}
      style={{
        transform: tf || "perspective(800px) rotateX(0) rotateY(0)",
        transition: "transform 0.3s ease-out",
        transformStyle: "preserve-3d",
        background: glow ? `${glow}, rgba(255,255,255,0.02)` : "rgba(255,255,255,0.02)",
        border: "1px solid rgba(0,229,255,0.1)",
        borderRadius: 20,
        backdropFilter: "blur(8px)",
        ...style,
      }}
    >{children}</div>
  );
}

/* ─── Animated Counter ───────────────────────────────────────── */
function Counter({ end, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = Date.now();
        const tick = () => { const p = Math.min((Date.now()-s)/2000,1); setV(Math.floor(p*end)); if(p<1) requestAnimationFrame(tick); };
        tick();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

/* ─── Rotating 3D Skill Orb ──────────────────────────────────── */
function SkillOrb({ skills, radius = 120 }) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    let frame;
    const tick = () => { setAngle(a => a + 0.15); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div style={{ perspective: 600, width: radius*2+80, height: radius*2+80, position: "relative", margin: "0 auto" }}>
      <div style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg) rotateX(15deg)`, width: "100%", height: "100%", position: "relative", transition: "transform 0.05s linear" }}>
        {skills.map((s, i) => {
          const theta = (i / skills.length) * Math.PI * 2;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          return (
            <div key={i} style={{
              position: "absolute",
              left: "50%", top: "50%",
              transform: `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px)`,
              padding: "6px 16px",
              borderRadius: 20,
              background: "rgba(0,229,255,0.1)",
              border: "1px solid rgba(0,229,255,0.25)",
              color: "#e0e0e8",
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              backfaceVisibility: "hidden",
            }}>{s}</div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Floating Badge ─────────────────────────────────────────── */
function FloatBadge({ children, delay = 0 }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "7px 16px", borderRadius: 20, fontSize: 13,
      background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.18)",
      color: "#c8c8d0", cursor: "default",
      animation: `floatBadge 3s ease-in-out ${delay}s infinite`,
      transition: "all 0.3s",
    }}
    onMouseEnter={e => { e.target.style.background = "rgba(0,229,255,0.25)"; e.target.style.color = "#fff"; e.target.style.transform = "translateY(-4px) scale(1.08)"; e.target.style.boxShadow = "0 8px 25px rgba(0,229,255,0.2)"; }}
    onMouseLeave={e => { e.target.style.background = "rgba(0,229,255,0.08)"; e.target.style.color = "#c8c8d0"; e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
    >{children}</span>
  );
}

/* ─── Experience Item (hook must live in a component, not a map) */
function ExperienceItem({ exp, index }) {
  const hf = "'Playfair Display', Georgia, serif";
  const [ref, style] = useReveal(index * 0.1);
  return (
    <div ref={ref} style={{ marginBottom: 36, position: "relative", ...style }}>
      <div style={{ position: "absolute", left: -33, top: 8, width: 14, height: 14, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 16px rgba(0,229,255,0.6), 0 0 40px rgba(0,229,255,0.2)", animation: "orbPulse 2s ease infinite" }} />
      <Card3D style={{ padding: 26 }} depth={8}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          <h3 style={{ fontFamily: hf, fontSize: 20, fontWeight: 700, color: "#e8e8f0" }}>{exp.role}</h3>
          <span style={{ fontSize: 13, color: "#00e5ff", fontWeight: 600, padding: "3px 12px", background: "rgba(0,229,255,0.08)", borderRadius: 12 }}>{exp.period}</span>
        </div>
        <p style={{ fontSize: 14, color: "#6a6a7e", marginBottom: 14 }}>{exp.company} · {exp.location}</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {exp.highlights.map((h, hi) => (
            <li key={hi} style={{ fontSize: 14, lineHeight: 1.75, color: "#9898ae", paddingLeft: 20, position: "relative", marginBottom: 6 }}>
              <span style={{ position: "absolute", left: 0, color: "#7c4dff", fontSize: 16 }}>▸</span>{h}
            </li>
          ))}
        </ul>
      </Card3D>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PORTFOLIO
   ═══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [heroRef, heroStyle] = useReveal();
  const [aboutRef, aboutStyle] = useReveal();
  const [skillRef, skillStyle] = useReveal();
  const [expRef, expStyle] = useReveal();
  const [eduRef, eduStyle] = useReveal();
  const [contactRef, contactStyle] = useReveal();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const hf = "'Playfair Display', Georgia, serif";
  const bf = "'DM Sans', 'Segoe UI', sans-serif";
  const glow = { color: "#00e5ff", textShadow: "0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15)" };
  const container = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };
  const sTitle = { fontFamily: hf, fontSize: "clamp(28px,5vw,44px)", fontWeight: 700, color: "#e8e8f0", marginBottom: 12, letterSpacing: -0.5 };
  const accentBar = { width: 60, height: 3, background: "linear-gradient(90deg,#00e5ff,#7c4dff)", borderRadius: 2, marginBottom: 44 };

  const skills = {
    "AI / ML": ["LLMs","NLP","Generative AI","MCP Server","OpenAI / DALL·E","Deep Learning","Machine Learning","Computer Vision","Statistical Modeling","OCR (PaddleOCR, Tesseract, Donut)","Amazon Bedrock","Google Vision AI"],
    "Languages & Frontend": ["Python","SQL","JavaScript","React","HTML"],
    "Data & Tools": ["MongoDB","Power BI","Tableau","Pandas","NumPy","Scikit-learn","Matplotlib","Seaborn","Excel"],
    "Pipelines & Deployment": ["End-to-End AI Pipelines","Data Ingestion","ETL","Model Inference","Workflow Automation","Docker","SEO/Backlink Automation","Social Media Automation"],
  };

  const experiences = [
    { role: "AI Developer (Solo Project Lead)", company: "Sara Analytics Pvt. Ltd.", location: "Jaipur, India", period: "Nov 2025 – Present",
      highlights: [
        "Independently designed, developed & delivered all projects end-to-end — from requirement gathering to deployment",
        "Built AI-powered financial tools using Python & LLMs, cutting manual analysis by 40%",
        "NLP systems processing 500K+ financial documents",
        "DM automation tool increasing engagement by 3x",
        "MongoDB pipelines for structured & unstructured data at scale",
        "Built MCP Server integrations to connect LLMs with internal tools, databases & external APIs — enabling context-aware AI agents",
        "Solo-built a Backlink Automation Tool achieving 100% accuracy across 15+ websites — fully automated backlink creation & tracking",
        "Developed SMO Tool — auto-collects upcoming events (India & USA), generates social media posts using 11 templates (5 predefined + 6 HTML-generated) with DALL·E AI images, manager approval workflow & auto-posts to Facebook, Instagram & LinkedIn",
        "Built a Daily Task Tracker with role-based access (Admin, Manager, Employee) — employees submit daily timesheets by department & project, with status tracking (Pending, In Progress, On Hold, Completed) and manager oversight dashboard",
        "Developed a Capital Addition Tool — rule-based expense tracking system that calculates and categorizes capital expenditures, helping teams make informed financial decisions",
      ],
    },
    { role: "AI Developer", company: "Crazibrain Solutions", location: "Noida, India", period: "Aug – Oct 2025",
      highlights: ["Deployed AI solutions for client-facing automation products","Integrated ML models into existing software platforms"],
    },
    { role: "Data Science Trainee", company: "AlmaBetter", location: "Bengaluru, India", period: "Apr 2024 – Mar 2025",
      highlights: ["Top 1% of cohort — 10+ real-world ML projects","Built predictive models & dashboards (Python, SQL, Tableau, Power BI)"],
    },
    { role: "Data Science & ML Intern", company: "Edureka", location: "Remote", period: "Sep 2023 – Feb 2024",
      highlights: ["6-month intensive: Python, statistics, ML algorithms","End-to-end supervised & unsupervised learning projects"],
    },
    { role: "Banking Operations Associate", company: "Laxmi Sunrise Bank / Bank of Kathmandu", location: "Nepal", period: "Aug 2021 – Oct 2022",
      highlights: ["99.9% accuracy in cash handling","Improved customer response times by 20%, efficiency by 25%"],
    },
  ];

  const education = [
    { degree: "M.S. Computer Science (AI & ML)", school: "Woolf University", year: "Jan 2025" },
    { degree: "Advanced Certification — Full Stack Data Science & AI", school: "IIT Guwahati", year: "2024" },
    { degree: "B.B.A. (Marketing / Finance)", school: "Purbanchal University", year: "2017 – 2021" },
  ];

  const stats = [
    { label: "Manual Analysis Reduced", value: 40, suffix: "%" },
    { label: "Engagement Increase (DM Tool)", value: 3, suffix: "x" },
    { label: "Backlink Accuracy", value: 100, suffix: "%" },
    { label: "AI Projects Built Solo", value: 5, suffix: "+" },
  ];

  // parallax offset for decorative elements
  const px = mousePos.x / window.innerWidth - 0.5;
  const py = mousePos.y / window.innerHeight - 0.5;

  return (
    <div style={{ fontFamily: bf, background: "#060612", color: "#c8c8d0", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes spin3d { from{transform:rotateY(0) rotateX(15deg)} to{transform:rotateY(360deg) rotateX(15deg)} }
        @keyframes floatHero { 0%,100%{transform:translateY(0) rotateY(0deg)} 25%{transform:translateY(-14px) rotateY(3deg)} 75%{transform:translateY(8px) rotateY(-3deg)} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 20px rgba(0,229,255,0.2),0 0 60px rgba(0,229,255,0.05)} 50%{box-shadow:0 0 35px rgba(0,229,255,0.35),0 0 80px rgba(0,229,255,0.12)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(80px) rotateX(-10deg)} to{opacity:1;transform:translateY(0) rotateX(0)} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes orbPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:#060612 }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#00e5ff,#7c4dff); border-radius:3px }
        a { color:#00e5ff; text-decoration:none; transition:all 0.3s }
        a:hover { color:#7c4dff; text-shadow:0 0 12px rgba(124,77,255,0.4) }
      `}</style>

      <Navbar />
      <ParticleField />
      <ScrollProgress />

      {/* ── Floating decorative orbs (parallax) ── */}
      <div style={{ position: "fixed", top: "15%", right: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.04), transparent 70%)", transform: `translate(${px*-30}px, ${py*-30}px)`, zIndex: 0, pointerEvents: "none", animation: "orbPulse 5s ease infinite" }} />
      <div style={{ position: "fixed", bottom: "20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,77,255,0.04), transparent 70%)", transform: `translate(${px*20}px, ${py*20}px)`, zIndex: 0, pointerEvents: "none", animation: "orbPulse 7s ease infinite" }} />

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "80px 24px 40px", perspective: 1200, ...heroStyle }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 60, maxWidth: 1100, transformStyle: "preserve-3d" }}>

          {/* Photo — 3D floating */}
          <div style={{ perspective: 800, flexShrink: 0 }}>
            <div style={{
              width: 270, height: 270, borderRadius: "50%", overflow: "hidden",
              border: "3px solid rgba(0,229,255,0.35)",
              animation: "floatHero 6s ease-in-out infinite, pulseGlow 4s ease-in-out infinite",
              transformStyle: "preserve-3d",
              transform: `rotateY(${px * 12}deg) rotateX(${py * -8}deg)`,
              transition: "transform 0.2s ease-out",
            }}>
              <img src={HERO_IMG} alt="Sanjana Thakur" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            {/* 3D shadow underneath */}
            <div style={{ width: 180, height: 20, margin: "-10px auto 0", borderRadius: "50%", background: "rgba(0,229,255,0.08)", filter: "blur(12px)", animation: "floatBadge 6s ease-in-out infinite" }} />
          </div>

          {/* Text */}
          <div style={{ maxWidth: 560, transformStyle: "preserve-3d" }}>
            <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 5, color: "#00e5ff", marginBottom: 14, transform: "translateZ(30px)" }}>Hello, I'm</p>
            <h1 style={{ fontFamily: hf, fontSize: "clamp(40px,7vw,68px)", fontWeight: 900, lineHeight: 1.08, color: "#f2f2f8", marginBottom: 18, transform: "translateZ(20px)" }}>
              Sanjana<br /><span style={{ ...glow, background: "linear-gradient(135deg,#00e5ff,#7c4dff,#ff4081)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease infinite" }}>Thakur</span>
            </h1>
            <p style={{ fontSize: "clamp(17px,2.5vw,23px)", color: "#a0a0b4", marginBottom: 14, minHeight: 30, transform: "translateZ(15px)" }}>
              <Typer texts={["AI Developer", "NLP Engineer", "Data Scientist", "ML Practitioner", "Solo Project Lead"]} />
            </p>
            <p style={{ fontSize: 13, color: "#6a6a7e", marginBottom: 26, display: "flex", alignItems: "center", gap: 6, transform: "translateZ(12px)" }}>
              <span style={{ color: "#00e5ff", fontSize: 15 }}>◎</span> Delhi-Gurgaon, India
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#7a7a90", marginBottom: 34, transform: "translateZ(10px)" }}>
              Building financial AI tools with Python, LLMs & NLP. Turning complex data into scalable, production-ready AI solutions — independently from concept to deployment.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", transform: "translateZ(5px)" }}>
              {[{ label: "Get In Touch", href: "#contact", primary: true }, { label: "View My Work", href: "#experience" }].map((b, i) => (
                <a key={i} href={b.href} style={{
                  padding: "13px 30px", borderRadius: 10, fontSize: 14, fontWeight: 700,
                  background: b.primary ? "linear-gradient(135deg,#00e5ff,#7c4dff)" : "transparent",
                  color: b.primary ? "#060612" : "#00e5ff",
                  border: b.primary ? "none" : "1px solid rgba(0,229,255,0.35)",
                  transition: "all 0.35s",
                }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px) scale(1.04)"; e.target.style.boxShadow = b.primary ? "0 12px 40px rgba(0,229,255,0.3)" : "0 8px 25px rgba(0,229,255,0.15)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
                >{b.label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / STATS ═══ */}
      <section id="about" ref={aboutRef} style={{ ...container, ...aboutStyle, padding: "100px 24px" }}>
        <h2 style={sTitle}>About Me</h2>
        <div style={accentBar} />
        <p style={{ fontSize: 16, lineHeight: 1.85, maxWidth: 720, color: "#9090a4", marginBottom: 56 }}>
          AI Developer with hands-on experience building financial AI tools using Python, LLMs, and NLP. Currently designing end-to-end AI pipelines for financial text analysis, intelligent automation, and DM automation at Sara Analytics. Master's in Computer Science (AI/ML) with a strong foundation in data science, predictive modeling, and data-driven decision-making.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {stats.map((s, i) => (
            <Card3D key={i} style={{ padding: "32px 22px", textAlign: "center" }}>
              <div style={{ fontFamily: hf, fontSize: 40, fontWeight: 900, ...glow, marginBottom: 10 }}>
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#6a6a7e" }}>{s.label}</div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" ref={skillRef} style={{ ...container, ...skillStyle, padding: "100px 24px" }}>
        <h2 style={sTitle}>Technical Skills</h2>
        <div style={accentBar} />

        {/* 3D Rotating Orb — AI/ML skills */}
        <div style={{ marginBottom: 50 }}>
          <h3 style={{ fontFamily: hf, fontSize: 20, color: "#00e5ff", textAlign: "center", marginBottom: 20 }}>AI / ML Ecosystem</h3>
          <SkillOrb skills={skills["AI / ML"]} radius={140} />
        </div>

        {/* Other skill categories as 3D cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 28 }}>
          {Object.entries(skills).filter(([k]) => k !== "AI / ML").map(([cat, items], ci) => (
            <Card3D key={ci} style={{ padding: 28 }}>
              <h3 style={{ fontFamily: hf, fontSize: 18, color: "#00e5ff", marginBottom: 18, fontWeight: 700 }}>{cat}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map((s, si) => <FloatBadge key={si} delay={si * 0.15}>{s}</FloatBadge>)}
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" ref={expRef} style={{ ...container, ...expStyle, padding: "100px 24px" }}>
        <h2 style={sTitle}>Experience</h2>
        <div style={accentBar} />
        <div style={{ position: "relative", paddingLeft: 36 }}>
          {/* Animated timeline line */}
          <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "linear-gradient(180deg,#00e5ff,#7c4dff,#ff4081,transparent)", animation: "gradientShift 6s ease infinite", backgroundSize: "100% 200%" }} />
          {experiences.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section id="education" ref={eduRef} style={{ ...container, ...eduStyle, padding: "100px 24px" }}>
        <h2 style={sTitle}>Education</h2>
        <div style={accentBar} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {education.map((ed, i) => (
            <Card3D key={i} style={{ padding: 30 }}>
              <div style={{ fontSize: 13, color: "#00e5ff", fontWeight: 600, marginBottom: 10, padding: "3px 12px", background: "rgba(0,229,255,0.06)", borderRadius: 10, display: "inline-block" }}>{ed.year}</div>
              <h3 style={{ fontFamily: hf, fontSize: 18, color: "#e8e8f0", fontWeight: 700, marginBottom: 8 }}>{ed.degree}</h3>
              <p style={{ fontSize: 14, color: "#6a6a7e" }}>{ed.school}</p>
            </Card3D>
          ))}
        </div>
        <div style={{ marginTop: 44 }}>
          <h3 style={{ fontFamily: hf, fontSize: 22, color: "#e8e8f0", marginBottom: 18 }}>Certifications</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["ChatGPT 4 Certification","SQL Intermediate (HackerRank)","Problem Solving – Basic (HackerRank)","Certificate for Best Performance"].map((c, i) => (
              <FloatBadge key={i} delay={i * 0.2}>{c}</FloatBadge>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" ref={contactRef} style={{ ...container, ...contactStyle, padding: "100px 24px 70px", textAlign: "center" }}>
        <h2 style={sTitle}>Let's Connect</h2>
        <div style={{ ...accentBar, margin: "0 auto 44px" }} />
        <p style={{ fontSize: 16, color: "#7a7a90", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}>
          Always open to new opportunities, collaborations, and conversations about AI, data science, and technology.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "📞 +91 99280 95269", href: "tel:+919928095269" },
            { label: "Email", href: "mailto:sanjanathakur302@gmail.com" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sanjana-thakur-sunzoo/", target: "_blank" },
            { label: "Medium", href: "https://medium.com/@sanjanathakur302", target: "_blank" },
            { label: "YouTube", href: "https://www.youtube.com/@Datacrack-h9q", target: "_blank" },
            { label: "GitHub", href: "https://github.com/San7122", target: "_blank" },
          ].map((l, i) => (
            <a key={i} href={l.href} target={l.target || "_self"} rel="noopener noreferrer" style={{
              padding: "11px 26px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", transition: "all 0.35s",
              background: "rgba(0,229,255,0.03)",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(0,229,255,0.12)"; e.target.style.transform = "translateY(-3px) scale(1.05)"; e.target.style.boxShadow = "0 8px 30px rgba(0,229,255,0.2)"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(0,229,255,0.03)"; e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >{l.label}</a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "36px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "#4a4a5e" }}>
        © 2026 Sanjana Thakur · Crafted with AI & passion
      </footer>
    </div>
  );
}
