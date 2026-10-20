import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Braces,
  Network,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  articles,
  expertise,
  featuredArticle,
  philosophy,
  profile,
  projects,
} from "./content";
import {
  ArticleMeta,
  articleHref,
  asset,
  DomainDiagram,
  Header,
  SectionHeading,
  SocialLinks,
} from "./components";

function Hero() {
  return (
    <section id="home" tabIndex={-1} className="hero container">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> ENGINEERING WITH INTENTION
        </p>
        <h1>
          Mahdi
          <br />
          <span>
            Kazemi<span className="accent-dot">.</span>
          </span>
        </h1>
        <p className="hero-role">
          {profile.role}
          <span className="role-divider" aria-hidden="true">
            {" "}
            /{" "}
          </span>
          <span>{profile.direction}</span>
        </p>
        <p className="hero-intro">{profile.introduction}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore My Work <ArrowUpRight size={18} />
          </a>
          <a className="button button-text" href="#articles">
            Read My Articles <ArrowRight size={18} />
          </a>
        </div>
        <div className="hero-social">
          <SocialLinks />
          <span className="small-divider" />
          <span>Build. Understand. Share.</span>
        </div>
      </div>
      <div className="portrait-composition">
        <div className="portrait-frame">
          {profile.portrait.enabled ? (
            <picture>
              <source
                type="image/avif"
                srcSet={`${asset("images/portrait-480.avif")} 480w, ${asset("images/portrait-960.avif")} 960w`}
                sizes="(max-width: 760px) 90vw, 42vw"
              />
              <source
                type="image/webp"
                srcSet={`${asset("images/portrait-480.webp")} 480w, ${asset("images/portrait-960.webp")} 960w`}
                sizes="(max-width: 760px) 90vw, 42vw"
              />
              <img
                className="portrait"
                src={asset("images/portrait-960.jpg")}
                width="960"
                height="1200"
                alt={profile.portrait.alt}
                style={{ objectPosition: profile.portrait.objectPosition }}
                fetchPriority="high"
              />
            </picture>
          ) : (
            <div className="portrait-placeholder">
              <div className="placeholder-corner">PERSONAL PORTRAIT</div>
              <span className="monogram" aria-hidden="true">
                mk<span>.</span>
              </span>
              <span className="portrait-pending">Photograph to be added</span>
            </div>
          )}
          <div className="portrait-caption">
            <span>THE PERSON BEHIND THE CODE</span>
            <p>
              Engineer.
              <br />
              Architecture thinker.
              <br />
              <em>Knowledge sharer.</em>
            </p>
          </div>
        </div>
        <div className="portrait-side-note" aria-hidden="true">
          BACKEND ENGINEERING · BUSINESS-FIRST THINKING
        </div>
      </div>
      <div className="hero-bottom">
        <span>.NET AT THE CORE. ARCHITECTURE IN MIND.</span>
        <a href="#featured" aria-label="Explore featured insight">
          SCROLL TO EXPLORE <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}

function FeaturedInsight() {
  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="featured-section container"
    >
      <div className="featured-panel">
        <div className="featured-copy">
          <p className="eyebrow">
            <span className="tiny-line" /> FEATURED INSIGHT
          </p>
          <div className="feature-category">
            {(
              featuredArticle?.category ?? "Domain-Driven Design"
            ).toUpperCase()}
          </div>
          <h2 id="featured-title">
            {featuredArticle?.title ?? (
              <>
                Good software starts
                <br />
                with <em>the domain.</em>
              </>
            )}
          </h2>
          <p>
            {featuredArticle?.summary ??
              "Domain-Driven Design is central to how I study software architecture: understanding the business, making boundaries explicit, and developing a shared language."}
          </p>
          {featuredArticle ? (
            <>
              <ArticleMeta article={featuredArticle} />
              <div className="tags">
                {featuredArticle.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="button article-cta"
                href={articleHref(featuredArticle.href)}
              >
                <BookOpen size={18} aria-hidden="true" />
                <span>Read the Article</span>
                <span className="article-cta-icon" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </a>
            </>
          ) : (
            <div className="pending-article">
              <BookOpen size={19} />
              <div>
                <strong>DDD article · link pending</strong>
                <span>
                  The featured article will appear here once its details are
                  supplied.
                </span>
              </div>
            </div>
          )}
        </div>
        <DomainDiagram />
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="section container about-section"
    >
      <SectionHeading
        number="01"
        label="ABOUT ME"
        title="Beyond the implementation."
      />
      <div className="about-grid">
        <p className="large-editorial">
          Building software.
          <br />
          Understanding <em>why.</em>
        </p>
        <div className="about-copy">
          <p>
            I’m a .NET backend developer with professional experience in
            enterprise software, particularly financial and investment systems.
            Working with complex business rules has made me interested in more
            than how a feature is implemented: I want to understand the domain
            it serves.
          </p>
          <p>
            That perspective guides my study of software architecture and
            Domain-Driven Design. I care about clear boundaries, useful
            abstractions, and decisions that help a system evolve without losing
            sight of its purpose.
          </p>
          <p>
            My long-term goal is to become a Software Architect. Along the way,
            I’m deepening my engineering practice, studying architectural ideas,
            and sharing what I learn through writing and teaching.
          </p>
          <div className="about-note">
            <span className="status-dot" /> A developer’s practice. An
            architect’s curiosity.
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const icons = [Braces, Boxes, Network, Sparkles];
  return (
    <section id="expertise" tabIndex={-1} className="section expertise-section">
      <div className="container">
        <SectionHeading
          number="02"
          label="TECHNICAL EXPERTISE"
          title="Tools with a purpose."
        >
          <p>
            A foundation in backend development, with a growing focus on
            architecture and distributed systems.
          </p>
        </SectionHeading>
        <div className="expertise-grid">
          {expertise.map((group, i) => {
            const Icon = icons[i];
            return (
              <article className="expertise-card" key={group.number}>
                <div className="card-top">
                  <Icon size={25} strokeWidth={1.4} />
                  <span>{group.number}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <p className="expertise-note">{group.note}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="section container">
      <SectionHeading
        number="03"
        label="SELECTED WORK"
        title="Ideas, put into practice."
      >
        <a
          className="text-link"
          href={`${profile.socials.github}?tab=repositories`}
        >
          Explore GitHub <ArrowUpRight size={17} />
        </a>
      </SectionHeading>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project" key={project.href}>
            <div
              className="project-visual"
              aria-label="Conceptual flow: a question enters the assistant engine, which uses document retrieval or tools"
            >
              <div className="project-visual-header">
                <span>PERSONAL AI ASSISTANT</span>
                <span>01 / SYSTEM OVERVIEW</span>
              </div>
              <div className="flow-input">Your question</div>
              <div className="flow-line" />
              <div className="flow-engine">
                <Boxes size={29} strokeWidth={1.3} />
                <span>
                  Assistant engine<small>.NET · orchestration</small>
                </span>
              </div>
              <div className="flow-branches">
                <div>
                  <span>Document retrieval</span>
                  <small>RAG · Qdrant</small>
                </div>
                <div>
                  <span>Tool modules</span>
                  <small>Extensible capabilities</small>
                </div>
              </div>
              <span className="project-visual-caption">
                A LOCAL AI AGENT. A PLUGGABLE DESIGN.
              </span>
            </div>
            <div className="project-copy">
              <p className="eyebrow">{project.label}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="project-detail">{project.detail}</p>
              <div className="tags">
                {project.technologies.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <ul className="concepts">
                {project.concepts.map((concept) => (
                  <li key={concept}>{concept}</li>
                ))}
              </ul>
              <a className="text-link" href={project.href}>
                View Repository <ArrowUpRight size={18} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Articles() {
  const allArticles = [
    ...(featuredArticle ? [featuredArticle] : []),
    ...articles.filter((article) => article.id !== featuredArticle?.id),
  ];
  return (
    <section id="articles" tabIndex={-1} className="section articles-section">
      <div className="container">
        <SectionHeading
          number="04"
          label="WRITING & KNOWLEDGE"
          title="Learning, made shareable."
        >
          <p>
            Making sense of complex engineering ideas, then making them easier
            to discuss.
          </p>
        </SectionHeading>
        <div className="articles-grid">
          {!featuredArticle && (
            <article className="writing-card pending-writing">
              <BookOpen size={24} strokeWidth={1.4} />
              <p className="eyebrow">DOMAIN-DRIVEN DESIGN</p>
              <h3>A place for deeper thinking.</h3>
              <p>
                My DDD article will be collected here as well as in the featured
                insight above.
              </p>
              <span className="pending-label">Article details pending</span>
            </article>
          )}
          {allArticles.map((article) => (
            <article key={article.id} className="writing-card">
              <ArticleMeta article={article} />
              <h3>
                <a href={articleHref(article.href)}>
                  {article.title}
                  <ArrowUpRight size={20} />
                </a>
              </h3>
              <p>{article.summary}</p>
              <div className="tags">
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
          <article className="writing-card learning-card">
            <p className="eyebrow">LEARN THROUGH CODE</p>
            <h3>Inside a .NET AI agent.</h3>
            <p>
              The Personal AI Assistant README explains RAG, embeddings, vector
              search, and tool calling alongside the project’s architecture.
            </p>
            <a className="text-link" href={`${projects[0].href}#readme`}>
              Explore the project notes <ArrowUpRight size={18} />
            </a>
            <span className="resource-type">REPOSITORY DOCUMENTATION</span>
          </article>
        </div>
        <div className="writing-topics">
          <span>AREAS I EXPLORE</span>
          <p>
            Domain-Driven Design <i>/</i> Software Architecture <i>/</i> .NET{" "}
            <i>/</i> Distributed Systems
          </p>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section
      className="section container philosophy-section"
      aria-labelledby="philosophy-title"
    >
      <p className="eyebrow">
        <span>05</span> ENGINEERING PHILOSOPHY
      </p>
      <h2 id="philosophy-title">
        Thoughtful decisions.
        <br />
        <em>Lasting software.</em>
      </h2>
      <div className="philosophy-grid">
        {philosophy.map((item, i) => (
          <div key={item.title}>
            <span className="philosophy-number">0{i + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" tabIndex={-1} className="contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">
            <span>06</span> LET’S CONNECT
          </p>
          <h2>
            Good conversations
            <br />
            build <em>better things.</em>
          </h2>
          <p>
            Have an engineering opportunity, an architecture question, or an
            idea worth sharing? I’d be glad to connect.
          </p>
        </div>
        <div className="contact-action">
          <a
            className="button button-primary"
            href={profile.socials.linkedin || profile.socials.github}
          >
            Let’s start a conversation <ArrowUpRight size={19} />
          </a>
          <SocialLinks text />
          <a
            className="text-link contact-phone"
            href={`tel:${profile.phone}`}
            aria-label={`Call Mahdi Kazemi at ${profile.phone}`}
          >
            <Phone size={17} aria-hidden="true" />
            <span dir="ltr">{profile.phone}</span>
          </a>
          <span>Engineering · Architecture · Knowledge sharing</span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <FeaturedInsight />
        <About />
        <Expertise />
        <Projects />
        <Articles />
        <Philosophy />
        <Contact />
      </main>
      <footer className="container footer">
        <a className="brand" href="#home" aria-label="Back to top">
          mk<span>.</span>
        </a>
        <span>© {new Date().getFullYear()} Mahdi Kazemi</span>
        <span>Built with care. Designed to evolve.</span>
        <a href="#home">
          Back to top <ArrowUpRight size={15} />
        </a>
      </footer>
    </>
  );
}
