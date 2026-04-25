import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';
import { MatrixRainingLetters } from "react-mdr";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ABOUT_DATA = [
  { key: 'location',  val: '"Gainesville, FL"' },
  { key: 'interests', val: '["backend", "llms​", "ai agents", "data engineering"]' },
  { key: 'education', val: '"CS @ University of Florida"' },
];

const SKILLS = [
  {
    tag: 'LANGUAGES',
    title: 'CORE STACK',
    items: ['Python', 'Java', 'JavaScript', 'SQL', 'Go'],
  },
  {
    tag: 'FRONTEND',
    title: 'UI / CLIENT',
    items: ['React', 'Next.js', 'JavaScript', 'CSS'],
  },
  {
    tag: 'BACKEND',
    title: 'SERVER / API',
    items: ['Node.js / Express', 'Python / FastAPI', 'Spring Boot', 'Go', 'REST APIs'],
  },
  {
    tag: 'AI / ML',
    title: 'INTELLIGENCE',
    items: ['LangChain', 'HuggingFace', 'PyTorch', 'spaCy', 'LLM Integration'],
  },
  {
    tag: 'DATABASES',
    title: 'DATA LAYER',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'DuckDB'],
  },
  {
    tag: 'DEVOPS',
    title: 'INFRA / CLOUD',
    items: ['Docker', 'Apache Kafka', 'Git / JIRA', 'AWS', 'Apptainer'],
  },
    {
    tag: 'DATA',
    title: 'DATA PROCESSING',
    items: ['Numpy', 'Pandas'],
  },
];

const EXPERIENCE = [
  {
    role: 'Software Engineer Apprentice',
    company: 'American Express',
    location: 'Gainesville, FL',
    period: 'Jan 2026 – Apr 2026',
    type: 'APPRENTICESHIP',
    tags: ['Spring Boot', 'PostgreSQL', 'LLMs', 'REST APIs', 'React.js', 'Next.js'],
    bullets: [
      'Built Spring Boot microservices for log anomaly detection, integrating OpenAI, Claude, and Llama APIs; delivered up to 95% correctness and relevance and 90% completeness for automated root-cause analysis.',
      'Implemented LLM-as-a-Judge (Claude Sonnet) and anomaly recurrence detection, improving response quality to 90–95% clarity/relevance and boosting correctness/completeness by 20–40%.',
    ],
  },
  {
    role: 'Graduate Research Assistant',
    company: 'Trustworthy Engineered Autonomy Lab',
    location: 'Gainesville, FL',
    period: 'Aug 2025 – Present',
    type: 'RESEARCH',
    tags: ['HuggingFace', 'LLMs', 'PyTorch', 'NLP', 'Python', 'FastAPI'],
    bullets: [
      'Leveraged HuggingFace transformers and LLMs to enhance model reasoning through Chain of Thought prompting.',
      'Contributing to research on building, fine-tuning, and evaluating NLP models for explainable and trustworthy QA systems.',
      'Contributing to research involving agent safety evaluation.'
    ],
  },
  {
    role: 'Associate Product Engineer',
    company: 'Temenos',
    location: 'Chennai, India',
    period: 'Nov 2021 – Jul 2024',
    type: 'FULL-TIME',
    tags: ['JBase', 'SQL', 'Java', 'REST APIs', 'Transact T24'],
    bullets: [
      'Designed and integrated full-stack asset finance solutions; collaborated with cross-functional teams for seamless module integration.',
      'Delivered high-performance code with 95% test coverage.',
      'Led mentoring sessions for new engineers improving onboarding speed.',
    ],
  },
  {
    role: 'Programmer Analyst',
    company: 'Cognizant',
    location: 'Chennai, India',
    period: 'Nov 2020 – Nov 2021',
    type: 'FULL-TIME',
    tags: ['SAP'],
    bullets: [
      'Developed a custom UI feature for displaying purchase order discrepancies, enhancing visibility and decision-making using SAP tools.',
    ],
  },
];

const PROJECTS = [
  {
    id: 'PROJECT_001',
    name: 'Reddit Clone',
    description: 'A Reddit simulator built with the actor model, supporting account registration, subreddit management, posting, commenting, voting, and direct messaging functionalities.',
    tags: ['Go', 'Protoactor', 'Protobuf', 'Git'],
    github: 'https://github.com/sindhuraks/RedditClone',
  },
  {
    id: 'PROJECT_002',
    name: 'StartupNexus',
    description: 'A responsive web app for startup collaboration, featuring user feeds, profiles, and full post CRUD operations.',
    tags: ['React', 'Next.js', 'Go'],
    github: 'https://github.com/sindhuraks/StartupNexus',
  },
    {
    id: 'PROJECT_003',
    name: 'Incident Radius Analyzer',
    description: 'A Python tool that queries incident data from APIs, stores it in a DuckDB database, identifies the traffic crash affecting the most people on a given date, and finds other incidents within a 1 km radius using geodesic distance.',
    tags: ['Python', 'DuckDB'],
    github: 'https://github.com/sindhuraks/cis6930sp25-project1',
  },
  {
    id: 'PROJECT_004',
    name: 'Data Redaction Platform',
    description: 'A redaction system for sensitive information in PDF documents using Named Entity Recognition (NER) and coreference resolution to redact specified names and entities.',
    tags: ['Python', 'spaCy', 'Apptainer', 'NER'],
    github: 'https://github.com/sindhuraks/cis6930sp25-project2',
  },
  {
    id: 'PROJECT_005',
    name: 'GenAI Log Analyzer',
    description: 'A Python tool that queries incident data from APIs, stores it in a DuckDB database, identifies the traffic crash affecting the most people on a given date, and finds other incidents within a 1 km radius using geodesic distance.',
    tags: ['Spring Boot', 'PostgreSQL', 'LLMs', 'REST APIs'],
    github: 'https://github.com/sindhuraks/genai-log-analyzer',
  },
  {
    id: 'PROJECT_006',
    name: 'Matrix.dev',
    description: 'A terminal-inspired portfolio exploring backend systems, AI agents, and intelligent software.',
    tags: ['React', 'HTML', 'CSS'],
    github: 'https://github.com/sindhuraks/terminal-portfolio',
  },
];


function WhoAmI() {

  return (
    <section id="about" className="section">
      <div className="box">
        <span className="sectionTag">01 // ABOUT</span>
        <h2 className="whoTitle">$whoami</h2>

        <h3 className="whoHello">HELLO, THERE();</h3>

        <p className="whoBio">
          &gt; Compiling ideas into systems, rendering logic into interfaces, and shipping code that refuses to break. <br></br> <br></br>
          &gt; I love working with backend frameworks to build scalable services and clean APIs,
          while also shaping intuitive web interfaces. <br></br> <br></br> 
          &gt; Particularly excited about integrating LLMs to build smarter, more interactive software.
        </p>

        <div className="whoCardDivider" />

        <div className="whoDataBlock">
          {ABOUT_DATA.map((d, i) => (
            <div key={i} className="whoDataRow">
              <span className="whoDataKey">{d.key} :  </span>
              <span className="whoDataVal">{d.val}</span>
            </div>
          ))}
        </div>

        <div className="whoStatusLine">
          <span className="whoStatusDot" />
          <span className="whoStatusTxt">AVAILABLE FOR FULL TIME OPPORTUNITIES</span>
        </div>
      </div>
    </section>
  )
}

function Skills() {

  return (
    <section id="skills" className="section">
      <span className="sectionTag">02 // SKILLS</span>
      <h2 className="whoTitle">$capabilities</h2>
      <div className="skillsGrid">
        {SKILLS.map((s, i) => (
          <div key={i} className="skillCard">
            <div className="skillCardHeader">
              <span className="skillCardTag">── {s.tag}</span>
              <h3 className="skillCardTitle">{s.title}</h3>
            </div>
            <ul className="skillList">
              {s.items.map((item, j) => (
                <li key={j} className="skillItem">
                  <span className="skillDot">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {

  return (
    <section id="experience" className="section">
      <span className="sectionTag">03 // EXPERIENCE</span>
      <h2 className="whoTitle">$work_log</h2>
      <div className="expList">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="expCard">
            <div className="expDotCol">
              <div className="expDot" />
              {i < EXPERIENCE.length - 1 && <div className="expLine" />}
            </div>
            <div className="expContent">
              <div className="expTopRow">
                <div className="expLeft">
                  <h3 className="expRole">{e.role}</h3>
                <p className="expCompany">{e.company}</p>
                <p className="expLocation">{e.location}</p>
                </div>
                <div className="expRight">
                  <span className="expPeriod">{e.period}</span>
                  <span className="expType">{e.type}</span>
                </div>
              </div>
              <ul className="expBullets">
                {e.bullets.map((b, j) => (
                  <li key={j} className="expBullet">
                    <span className="expBulletDot">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="expTags">
                {e.tags.map((t, j) => (
                  <span key={j} className="expTag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
   return (
    <section id="projects" className="section">
      <span className="sectionTag">04 // PROJECTS</span>
      <h2 className="whoTitle">$builds</h2>
      <div className="projGrid">
        {PROJECTS.map((p, i) => (
          <div key={i} className="projCard">
            <div className="projCardTop">
              <span className="projId">{p.id}</span>
              <span className="projPeriod">{p.period}</span>
            </div>
            <h3 className="projName">{p.name}</h3>
            <p className="projDesc">{p.description}</p>
            <div className="projTags">
              {p.tags.map((t, j) => (
                <span key={j} className="projTag">{t}</span>
              ))}
            </div>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="projLink">
              VIEW PROJECT →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <span className="sectionTag">05 // CONTACT</span>
      <h2 className="whoTitle">$connect</h2>
        <p className="connect">
          &gt; I'm open to new roles, collaborations, and interesting conversations. <br></br> <br></br>
        </p>
        
      <div className="btnGroup contactBtns">
        <a
          href="mailto:sindhu.ss10@gmail.com"
          className="btn btnPrimary"
        >
          <FaEnvelope style={{ marginRight: "8px" }} />
          EMAIL
        </a>

        <a
          href="https://github.com/sindhuraks"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btnPrimary"
        >
          <FaGithub style={{ marginRight: "8px" }} />
          GITHUB
        </a>

        <a
          href="https://linkedin.com/in/sindhura-k-subramanian"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btnPrimary"
        >
          <FaLinkedin style={{ marginRight: "8px" }} />
          LINKEDIN
        </a>

        <a
          href="/Sindhura_Kumbakonam_Subramanian_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btnPrimary"
        >
          VIEW RESUME
        </a>
      </div>
    </section>
  )
}

export default function Terminal() {
  
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 10) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mainContainer">
      <MatrixRainingLetters custom_class="matrix-rain-bg"/>
      <div className="terminalOverlay">
        <div className="horizontalBar">
          <h1 className="logoText">SKS</h1>
          <div className="navLinks">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>ABOUT</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>SKILLS</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>EXPERIENCE</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>PROJECTS</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>CONTACT</a>
          </div>
        </div>

        <div className="initTxt">
          // loading portfolio.exe . . . access granted
          <h1 className="nameTxt" data-text="&gt; SINDHURA"> &gt; SINDHURA</h1>
        </div>

        <p className="roleTxt"> Software Engineer</p>
        <div className="dividerLine" />
        {/* <p className="aboutTxt"> Compiling ideas into systems, rendering logic into interfaces, and shipping code that refuses to break. </p> */}

        <div className="btnGroup">
          <button className="btn btnPrimary" onClick={(e) => handleNavClick(e, 'projects')}>View Work</button>
          <button className="btn btnPrimary" onClick={(e) => handleNavClick(e, 'contact')}>Get In Touch</button>
        </div>

        <div className="scrollIndicator">
          <span className="scrollText" onClick={(e) => handleNavClick(e, 'about')}>SCROLL</span>
          <div className="scrollLine"></div>
        </div>
      </div>
      <WhoAmI />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      {showTopBtn && (
        <button className="scrollTopBtn" onClick={scrollToTop} aria-label="Scroll to top"> ↑ </button>
      )}
      <footer style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem", borderTop: "1px solid rgba(0, 255, 64, 0.12)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(0, 255, 64, 0.52)", letterSpacing: "0.15em" }}>
        © 2026 SINDHURA &nbsp;|&nbsp; BUILT WITH ♥
      </footer>
    </div>
  );
}