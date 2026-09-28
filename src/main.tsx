import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Bot, Check, Code2, Mail, Play, Sparkles, Workflow } from 'lucide-react';
import './styles.css';

const projects = [
  {
    number: '01',
    type: 'AI VIDEO SYSTEM',
    title: 'Short-form content engine',
    description: 'A repeatable creative pipeline that turns one idea into a week of platform-ready video variations.',
    tags: ['Strategy', 'AI workflow', 'Editing'],
    accent: 'violet',
  },
  {
    number: '02',
    type: 'AUTOMATION BUILD',
    title: 'Autonomous lead flow',
    description: 'Connected research, qualification, and follow-up into one calm, observable system for a growing team.',
    tags: ['Make', 'APIs', 'Operations'],
    accent: 'lime',
  },
  {
    number: '03',
    type: 'CREATIVE DIRECTION',
    title: 'The future, made clear',
    description: 'A visual language for explaining emerging technology with clarity, warmth, and a little wonder.',
    tags: ['Concept', 'Motion', 'Story'],
    accent: 'orange',
  },
];

function App() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Jimmy Libot home"><span className="brand-mark">JL</span><span>JIMMY LIBOT</span></a>
        <div className="nav-links">
          <a href="#work">Work</a><a href="#services">Services</a><a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="mailto:hello@jimmyli.bot">Let's talk <ArrowUpRight size={16} /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> AI VIDEO &amp; AUTOMATION SPECIALIST</p>
          <h1>Make the<br /><em>future</em> <span className="outline">flow.</span></h1>
          <p className="hero-lede">I design AI-powered video experiences and autonomous creative workflows for people building what comes next.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore the work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Start a conversation <span>→</span></a></div>
        </div>
        <div className="hero-orbit" aria-label="Abstract AI workflow illustration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><Sparkles size={38} /></div><span className="orbit-label label-one">IDEATE</span><span className="orbit-label label-two">BUILD</span><span className="orbit-label label-three">AMPLIFY</span></div>
      </section>

      <section className="ticker"><div className="ticker-track"><span>CREATIVE SYSTEMS</span><i>✳</i><span>AUTONOMOUS WORKFLOWS</span><i>✳</i><span>AI-POWERED STORIES</span><i>✳</i><span>CREATIVE SYSTEMS</span><i>✳</i><span>AUTONOMOUS WORKFLOWS</span></div></section>

      <section className="intro shell" id="services"><div className="section-kicker">/ 01 — THE APPROACH</div><div className="intro-grid"><h2>Technology is only<br />powerful when it<br /><em>feels human.</em></h2><div className="intro-body"><p>I help ambitious teams move from scattered possibilities to focused momentum. The work lives where creative direction meets practical automation.</p><div className="principles"><div><strong>01</strong><span>Find the signal</span></div><div><strong>02</strong><span>Build the system</span></div><div><strong>03</strong><span>Tell the story</span></div></div></div></div></section>

      <section className="work shell" id="work"><div className="section-heading"><div className="section-kicker">/ 02 — SELECTED WORK</div><p>Ideas in motion →</p></div><div className="project-list">{projects.map((project) => <article className={`project-card ${project.accent}`} key={project.number}><div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div><div className="project-content"><div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="project-icon">{project.number === '01' ? <Play size={26} /> : project.number === '02' ? <Workflow size={26} /> : <Sparkles size={26} />}</div></div><a className="project-arrow" href="#contact" aria-label={`Discuss ${project.title}`}><ArrowUpRight size={20} /></a></article>)}</div></section>

      <section className="services shell"><div className="section-kicker">/ 03 — WHAT I DO</div><div className="service-grid"><div className="service"><div className="service-icon"><Play size={21} /></div><h3>AI Video</h3><p>From first frame to final cut: concepts, production systems, and stories people want to watch.</p></div><div className="service"><div className="service-icon"><Workflow size={21} /></div><h3>Automation</h3><p>Less repetitive work, more creative room. I connect tools and design workflows that run themselves.</p></div><div className="service"><div className="service-icon"><Bot size={21} /></div><h3>AI Strategy</h3><p>A clear, grounded path from “what if?” to a useful advantage your team can own.</p></div></div></section>

      <section className="contact shell" id="contact"><div className="contact-box"><div><p className="eyebrow">HAVE A GOOD PROBLEM?</p><h2>Let's make<br /><em>something</em> move.</h2></div><a className="contact-button" href="mailto:hello@jimmyli.bot"><Mail size={18} /> hello@jimmyli.bot <ArrowUpRight size={18} /></a></div></section>
      <footer className="footer shell"><span>© 2025 JIMMY LIBOT</span><span>DESIGNED FOR WHAT'S NEXT <span className="footer-dot">●</span></span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
