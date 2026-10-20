export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  href: string;
  /** Use an ISO date only when verified. */
  publishedAt?: string;
  /** Supply only when supported by the actual article text. */
  readingMinutes?: number;
  format?: string;
}

export const profile = {
  name: "Mahdi Kazemi",
  phone: "+989100072340",
  role: ".NET Backend Developer",
  direction: "Software Architecture Enthusiast",
  introduction:
    "I build backend systems for real business problems. My work in enterprise, financial, and investment software shapes how I think about domains, design, and the decisions that make software last.",
  socials: {
    github: "https://github.com/mahdikazemi96",
    // Verified from the public GitHub profile on 2026-10-20.
    linkedin: "https://www.linkedin.com/in/mahdi-kazemi-jobseeker",
    email: "",
  },
  /** Run npm run photo -- /path/to/original.jpg, inspect crops, then set true. */
  portrait: {
    enabled: true,
    alt: "Mahdi Kazemi in a dark suit, seated against a charcoal studio background",
    objectPosition: "50% 40%",
  },
};

/** Title verified from the supplied PDF cover. Summary based on its contents.
 * The PDF metadata creation date is NOT a verified publication date.
 * Replace this Article and the feature + writing card will both update automatically.
 * href may be a verified https URL or a base-relative local HTML path, e.g. articles/ddd.html.
 */
export const featuredArticle: Article | null = {
  id: "understanding-domain-driven-design",
  title: "Understanding Domain-Driven Design",
  summary:
    "From a shared business language to explicit model boundaries: a detailed exploration of strategic design, context mapping, and the tactical patterns that turn domain knowledge into software.",
  category: "Domain-Driven Design",
  tags: ["Bounded Contexts", "Ubiquitous Language", "Aggregates"],
  href: "articles/domain-driven-design-fa.pdf",
  format: "Persian PDF · 50 pages",
};

export const articles: Article[] = [];

export const projects = [
  {
    title: "Personal AI Assistant",
    label: "FEATURED PROJECT / OPEN SOURCE",
    description:
      "A local AI assistant built with .NET to explore how language models, document retrieval, and extensible tools work together.",
    detail:
      "A monolithic, pluggable design separates the engine, shared contracts, infrastructure, and tool modules. The repository also documents the concepts behind the implementation.",
    technologies: ["C#", ".NET", "Qdrant", "LM Studio", "Docker"],
    concepts: [
      "Retrieval-augmented generation",
      "Vector search",
      "LLM tool calling",
      "Pluggable tools",
    ],
    href: "https://github.com/mahdikazemi96/PersonalAiAssistant",
  },
];

export const expertise = [
  {
    number: "01",
    title: "Backend engineering",
    note: "My professional foundation",
    description:
      "Building the services and data layers behind enterprise software.",
    items: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "REST APIs",
      "Entity Framework Core",
      "SQL Server",
    ],
  },
  {
    number: "02",
    title: "Software architecture",
    note: "An evolving area of practice & study",
    description:
      "Connecting business needs to boundaries, models, and maintainable designs.",
    items: [
      "Domain-Driven Design",
      "Clean Architecture",
      "CQRS",
      "Microservices",
      "Modular Monoliths",
      "Event-Driven Architecture",
    ],
  },
  {
    number: "03",
    title: "Distributed systems",
    note: "Technical interests & continued learning",
    description:
      "Understanding what happens when software communicates across boundaries.",
    items: [
      "Kafka",
      "RabbitMQ",
      "Asynchronous communication",
      "Consistency",
      "Idempotency",
      "Messaging reliability",
      "Integration patterns",
    ],
  },
  {
    number: "04",
    title: "Engineering & infrastructure",
    note: "Tools & practices I continue to develop",
    description:
      "Considering how systems are tested, operated, observed, and improved.",
    items: [
      "Docker",
      "Kubernetes fundamentals",
      "Git",
      "Automated testing",
      "Performance optimization",
      "Observability",
      "Resilience",
    ],
  },
];

export const philosophy = [
  {
    title: "Start with the domain.",
    body: "Understand the business, its language, and its constraints before choosing the technology.",
  },
  {
    title: "Make the trade-offs explicit.",
    body: "Let real requirements guide architectural decisions. Prefer the simplest design that meets them.",
  },
  {
    title: "Build for the next change.",
    body: "Treat maintainability as part of delivery, and share the knowledge that helps a team carry the work forward.",
  },
];
