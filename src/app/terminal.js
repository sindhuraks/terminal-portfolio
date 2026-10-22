import React, { useState, useRef, useEffect } from 'react';
import './terminal.css';
import { MatrixRainingLetters } from "react-mdr";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import Chatbot from './chatbot';
import {
  PROFILE,
  ABOUT_DATA,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  RESEARCH,
  ME,
  CONTACT,
} from '../data/portfolioContent';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const ABOUT_DATA = [
//   // { key: 'location',  val: '"Bentonville, AR"' },
//   { key: 'interests', val: '["backend", "ai/ml"]' },
//   { key: 'education', val: '"CS @ University of Florida | Go Gators!🐊"' },
// ];

// const SKILLS = [
//   {
//     tag: 'LANGUAGES',
//     title: 'LANGUAGES',
//     items: ['Python', 'Java', 'JavaScript', 'Go'],
//   },
//   {
//     tag: 'FRONTEND',
//     title: 'FRONTEND',
//     items: ['React', 'Next.js'],
//   },
//   {
//     tag: 'BACKEND',
//     title: 'BACKEND',
//     items: ['FastAPI', 'Spring Boot', 'Node.js (Express)', 'Transact T24'],
//   },
//   {
//     // tag: 'AI / ML',
//     title: 'AI / ML',
//     items: ['LangChain', 'HuggingFace', 'PyTorch', 'spaCy', 'Prompt Engineering', 'RAG'],
//   },
//   {
//     tag: 'DATA',
//     title: 'DATA',
//     items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'DuckDB'],
//   },
//   {
//     tag: 'DEVOPS',
//     title: 'DEVOPS',
//     items: ['Docker', 'Git', 'AWS', 'Apptainer', 'Kubernetes'],
//   },
//     {
//     tag: 'MESSAGE QUEUE(S)',
//     title: 'MESSAGE QUEUE(S)',
//     items: ['RabbitMQ', 'Apache Kafka'],
//   },
//   //   {
//   //   tag: 'DATA',
//   //   title: 'DATA PROCESSING',
//   //   items: ['Numpy', 'Pandas'],
//   // },
// ];

// const EXPERIENCE = [
//   {
//     role: 'Software Engineer Apprentice',
//     company: 'UF WiCSE | UF ACM-W',
//     location: 'Gainesville, FL',
//     period: 'Jan 2026 – Apr 2026',
//     type: 'APPRENTICESHIP',
//     //tags: ['Spring Boot', 'PostgreSQL', 'LLM APIs', 'REST APIs', 'React.js', 'Next.js'],
//     bullets: [
//       'Built Spring Boot microservices backed by a PostgreSQL database to explain log messages, identify their first occurrence, integrating OpenAI, Claude, and Llama APIs for automated log analysis; added retry mechanism for API overload failures to improve resilience.',
//       'Implemented LLM-as-a-Judge (Claude Sonnet) to evaluate responses on correctness, completeness, clarity, and answer relevance, improving response quality to 90–95% for clarity/relevance and 85–90% for correctness/completeness.',
//     ],
//   },
//   {
//     role: 'Graduate Research Assistant',
//     company: 'Trustworthy Engineered Autonomy Lab',
//     location: 'Gainesville, FL',
//     period: 'Aug 2025 – Apr 2026',
//     type: 'RESEARCH',
//     //tags: ['HuggingFace', 'PyTorch', 'Python', 'FastAPI'],
//     bullets: [
//       //'Leveraged Hugging Face transformers and LLMs to enhance model reasoning through Chain of Thought prompting, improving performance via self-consistency across multiple sampled reasoning paths.',
//       'Built a FastAPI multi-GPU inference service for Llama, Qwen, and Gemma using HuggingFace Transformers, incorporating Chain-of-Thought prompting and analyzing latency, token probabilities, and top-50 logits.',
//       'Co-authored ”Confidence over Time: Confidence Calibration with Temporal Logic for Large Language Model Reasoning,” accepted to Findings of ACL 2026.'
//     ],
//   },
//   {
//     role: 'Associate Product Engineer',
//     company: 'Temenos',
//     location: 'Chennai, India',
//     period: 'Nov 2021 – Jul 2024',
//     type: 'FULL-TIME',
//     //tags: ['JBase', 'SQL', 'Java', 'REST APIs', 'Transact T24'],
//     bullets: [
//       'Built scalable backend solutions for asset lease lifecycle, bill generation, payment processing and settlement; automating recurring bill schedules across 2000+ active arrangement contracts with time-triggered payment workflows.',
//       'Delivered high-performance code with 95% test coverage, resulting in consistently low production defect rates and minimal need for post-release hotfixes across core asset-finance workflows.',
//       'Collaborated in agile environment, participating in sprint planning, daily stand-ups, code reviews, and iterative feature delivery.',
//       'Resolved client and production defects with low MTTR; ensuring 100% on-time release delivery.',
//     ],
//   },
//   {
//     role: 'Programmer Analyst',
//     company: 'Cognizant',
//     location: 'Chennai, India',
//     period: 'Nov 2020 – Nov 2021',
//     type: 'FULL-TIME',
//     //tags: ['SAP', 'SAP ABAP'],
//     bullets: [
//       'Developed a custom UI feature for displaying purchase order discrepancies, enhancing visibility and decision-making using SAP tools.',
//     ],
//   },
// ];

// const PROJECTS = [
//   {
//     id: 'PROJECT_001',
//     name: 'Reddit Clone',
//     description: 'A Reddit simulator built with the actor model, supporting account registration, subreddit management, posting, commenting, voting, and direct messaging functionalities.',
//     tags: ['Go', 'Protoactor', 'Protobuf', 'Git'],
//     github: 'https://github.com/sindhuraks/RedditClone',
//   },
//   {
//     id: 'PROJECT_002',
//     name: 'StartupNexus',
//     description: 'A responsive web app for startup collaboration, featuring user feeds, profiles, and full post CRUD operations.',
//     tags: ['React', 'Next.js', 'Go'],
//     github: 'https://github.com/sindhuraks/StartupNexus',
//   },
//     {
//     id: 'PROJECT_003',
//     name: 'Incident Radius Analyzer',
//     description: 'A Python tool that queries incident data from APIs, stores it in a DuckDB database, identifies the traffic crash affecting the most people on a given date, and finds other incidents within a 1 km radius using geodesic distance.',
//     tags: ['Python', 'DuckDB'],
//     github: 'https://github.com/sindhuraks/cis6930sp25-project1',
//   },
//   {
//     id: 'PROJECT_004',
//     name: 'Data Redaction Platform',
//     description: 'A redaction system for sensitive information in PDF documents using Named Entity Recognition (NER) and coreference resolution to redact specified names and entities.',
//     tags: ['Python', 'spaCy', 'Apptainer', 'NER'],
//     github: 'https://github.com/sindhuraks/cis6930sp25-project2',
//   },
//   {
//     id: 'PROJECT_005',
//     name: 'GenAI Log Analyzer',
//     description: 'An AI-powered log analysis tool that ingests system logs, explains errors and root causes, recommends remediation actions using Claude, OpenAI, and Llama APIs, and evaluates responses with an LLM-as-a-Judge framework across correctness, completeness, clarity, relevance, and reasoning while identifying first occurrence and recurrence of anomalies.',
//     tags: ['Spring Boot', 'PostgreSQL', 'LLMs', 'REST APIs'],
//     github: 'https://github.com/sindhuraks/genai-log-analyzer',
//   },
//   {
//     id: 'PROJECT_006',
//     name: 'Matrix.dev',
//     description: 'A terminal-inspired portfolio exploring backend systems, AI agents, and intelligent software.',
//     tags: ['React', 'HTML', 'CSS', 'Next.js'],
//     github: 'https://github.com/sindhuraks/terminal-portfolio',
//   },
// ];

// const RESEARCH = [
//   {
//     id: 'PAPER_001',
//     title: 'Confidence over Time: Confidence Calibration with Temporal Logic for Large Language Model Reasoning',
//     authors: [
//       'Zhenjiang Mao*',
//       'Anirudhh Venkat*',
//       'Artem Bisliouk',
//       'Akshat Kothiyal',
//       'Sindhura Kumbakonam Subramanian',
//       'Saithej Singhu',
//       'Ivan Ruchkin',
//     ],
//     venue: 'Findings of ACL',
//     year: 2026,
//     arxiv: 'https://arxiv.org/abs/2601.13387',
//   },
// ];

function WhoAmI() {

  return (
    <section id="about" className="section">
      <div className="box">
        <span className="sectionTag">01 // ABOUT</span>
        <h2 className="whoTitle">$whoami</h2>

        <h3 className="whoHello">HELLO, THERE();</h3>

        <p className="whoBio">
          &gt; Compiling ideas into systems and shipping code that refuses to break. <br></br> <br></br>
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

const NOSQL_DBS = ['MongoDB'];

function Skills() {

  return (
    // <section id="skills" className="section">
    //   <span className="sectionTag">02 // SKILLS</span>
    //   <h2 className="whoTitle">$skills</h2>
    //   <div className="skillsGrid">
    //     {SKILLS.map((s, i) => (
    //       <div key={i} className="skillCard">
    //         <div className="skillCardHeader">
    //           {/* <span className="skillCardTag">── {s.tag}</span> */}
    //           <h3 className="skillCardTitle">{s.title}</h3>
    //         </div>
    //         <ul className="skillList">
    //           {s.items.map((item, j) => (
    //             <li key={j} className="skillItem">
    //               <span className="skillDot">▸</span>
    //               <span>{item}</span>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </section>
        <section id="skills" className="section">
      <span className="sectionTag">02 // SKILLS</span>
      <h2 className="whoTitle">$skills</h2>
      <div className="skillsGrid">
        {SKILLS.map((s, i) => (
          <div key={i} className="skillCard">
            <div className="skillCardHeader">
              {/* <span className="skillCardTag">── {s.tag}</span> */}
              <h3 className="skillCardTitle">{s.title}</h3>
            </div>
            <ul className="skillList">
              {(s.title === 'DATA'
                ? [
                    { header: '-- SQL' },
                    ...s.items.filter((it) => !NOSQL_DBS.includes(it)),
                    { header: '-- NOSQL' },
                    ...s.items.filter((it) => NOSQL_DBS.includes(it)),
                  ]
                : s.items
              ).map((item, j) =>
                item.header ? (
                  <li key={j} className="skillItem">
                    {item.header}
                  </li>
                ) : (
                  <li key={j} className="skillItem">
                    <span className="skillDot">▸</span>
                    <span>{item}</span>
                  </li>
                )
              )}
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
      <h2 className="whoTitle">$worklog</h2>
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
                {/* {e.tags.map((t, j) => (
                  <span key={j} className="expTag">{t}</span>
                ))} */}
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

// const ME = 'Sindhura Kumbakonam Subramanian';

function Research() {
   return (
    <section id="research" className="section">
      <span className="sectionTag">05 // RESEARCH</span>
      <h2 className="whoTitle">$papers</h2>
      <div className="resList">
        {RESEARCH.map((r, i) => (
          <div key={i} className="projCard">
            <div className="projCardTop">
              <span className="projId">{r.id}</span>
              <span className="projPeriod">{r.year}</span>
            </div>
            <h3 className="projName">{r.title}</h3>
            <p className="projDesc">
              {r.authors.map((a, j) => (
                <span key={j}>
                  {a === ME ? <strong className="resMe">{a}</strong> : a}
                  {j < r.authors.length - 1 && ', '}
                </span>
              ))}
            </p>
            <p className="projDesc">Accepted to {r.venue}, {r.year}</p>
            <a href={r.arxiv} target="_blank" rel="noopener noreferrer" className="projLink">
              VIEW ON ARXIV →
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
      <span className="sectionTag">06 // CONTACT</span>
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
            <a href="#research" onClick={(e) => handleNavClick(e, 'research')}>RESEARCH</a>
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
      <Research />
      <Contact />
      <Chatbot />
      {showTopBtn && (
        <button className="scrollTopBtn" onClick={scrollToTop} aria-label="Scroll to top"> ↑ </button>
      )}
      <footer style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem", borderTop: "1px solid rgba(0, 255, 64, 0.12)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(0, 255, 64, 0.52)", letterSpacing: "0.15em" }}>
        © 2026 SINDHURA &nbsp;|&nbsp; BUILT WITH ♥
      </footer>
    </div>
  );
}