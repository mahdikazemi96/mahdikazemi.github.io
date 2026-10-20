import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { profile, type Article } from "./content";

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const articleHref = (href: string) =>
  /^https:\/\//.test(href) ? href : asset(href.replace(/^\//, ""));

function Github({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.12.68-3.78-1.32-3.78-1.32-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.49-.28-5.11-1.25-5.11-5.54 0-1.22.44-2.22 1.15-3-.11-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.61 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.22 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.3-2.63 5.25-5.13 5.53.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}
function Linkedin({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.1-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.73H9.53V9.2h2.83v1.3h.04c.39-.75 1.36-1.54 2.79-1.54 2.98 0 3.56 1.96 3.56 4.5v5.29Z" />
    </svg>
  );
}

export function SocialLinks({ text = false }: { text?: boolean }) {
  return (
    <div className={`socials ${text ? "socials-text" : ""}`}>
      <a href={profile.socials.github} aria-label="Mahdi Kazemi on GitHub">
        <Github size={19} />
        {text && "GitHub"}
        {text && <ArrowUpRight size={16} />}
      </a>
      {profile.socials.linkedin && (
        <a
          href={profile.socials.linkedin}
          aria-label="Mahdi Kazemi on LinkedIn"
        >
          <Linkedin size={19} />
          {text && "LinkedIn"}
          {text && <ArrowUpRight size={16} />}
        </a>
      )}
      {profile.socials.email && (
        <a
          href={`mailto:${profile.socials.email}`}
          aria-label="Email Mahdi Kazemi"
        >
          <Mail size={19} />
          {text && "Email"}
          {text && <ArrowUpRight size={16} />}
        </a>
      )}
    </div>
  );
}

const navigation = [
  "Home",
  "About",
  "Expertise",
  "Projects",
  "Articles",
  "Contact",
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    navigation.forEach((name) => {
      const section = document.getElementById(name.toLowerCase());
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a
          className="brand"
          href="#home"
          aria-label="Mahdi Kazemi, home"
          onClick={() => setOpen(false)}
        >
          mk<span>.</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          {navigation.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              aria-current={
                active === name.toLowerCase() ? "location" : undefined
              }
              onClick={() => {
                setOpen(false);
                document
                  .getElementById(name.toLowerCase())
                  ?.focus({ preventScroll: true });
              }}
            >
              {name}
              {name === "Contact" && <ArrowUpRight size={15} />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="article-meta">
      <span>{article.format ?? article.category}</span>
      {article.publishedAt && (
        <time dateTime={article.publishedAt}>
          {new Intl.DateTimeFormat("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          }).format(new Date(article.publishedAt))}
        </time>
      )}
      {article.readingMinutes && <span>{article.readingMinutes} min read</span>}
    </div>
  );
}

export function DomainDiagram() {
  return (
    <figure className="domain-figure">
      <div className="diagram-topline">
        <span>CONTEXT MAP</span>
        <span>ILLUSTRATIVE EXAMPLE</span>
      </div>
      <svg
        viewBox="0 0 440 290"
        role="img"
        aria-labelledby="domain-title domain-description"
      >
        <title id="domain-title">
          Two bounded contexts with their own models
        </title>
        <desc id="domain-description">
          An illustrative sales context contains an Order aggregate with
          OrderLine entities. A separate fulfillment context contains a Shipment
          aggregate. An integration event, OrderPlaced, communicates between the
          contexts; they do not share a model.
        </desc>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        <rect
          className="context-boundary"
          x="16"
          y="26"
          width="187"
          height="211"
          rx="8"
        />
        <rect
          className="context-boundary"
          x="251"
          y="26"
          width="173"
          height="211"
          rx="8"
        />
        <text className="diagram-label" x="33" y="53">
          SALES
        </text>
        <text className="diagram-label" x="269" y="53">
          FULFILLMENT
        </text>
        <rect
          className="aggregate-boundary"
          x="32"
          y="73"
          width="155"
          height="141"
          rx="5"
        />
        <rect
          className="model-node"
          x="49"
          y="94"
          width="121"
          height="40"
          rx="4"
        />
        <text className="node-text" x="109" y="119">
          Order
        </text>
        <path className="diagram-line" d="M109 134 V157" />
        <circle cx="109" cy="158" r="3" fill="currentColor" />
        <rect
          className="model-node secondary-node"
          x="49"
          y="167"
          width="121"
          height="30"
          rx="4"
        />
        <text className="node-text small-text" x="109" y="187">
          OrderLine
        </text>
        <rect
          className="model-node"
          x="268"
          y="94"
          width="139"
          height="40"
          rx="4"
        />
        <text className="node-text" x="337" y="119">
          Shipment
        </text>
        <path
          className="diagram-line event-line"
          d="M170 114 H267"
          markerEnd="url(#arrow)"
        />
        <path className="diagram-line event-line" d="M224 115 V253" />
        <rect
          className="event-label"
          x="161"
          y="252"
          width="126"
          height="28"
          rx="14"
        />
        <text className="node-text small-text" x="224" y="271">
          OrderPlaced
        </text>
      </svg>
      <figcaption>Distinct boundaries. Shared understanding.</figcaption>
    </figure>
  );
}
