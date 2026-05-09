import architect from "@/assets/architect.jpg";
import hero from "@/assets/hero.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export type Category = "Residential" | "Commercial" | "Cultural" | "Urban" | "Interior";
export type SectionType = "hero" | "about" | "projects" | "skills" | "experience" | "education" | "publications" | "contact" | "cv";

export interface PortfolioSection {
  id: SectionType;
  label: string;
  title: string;
  eyebrow: string;
  body: string;
  visible: boolean;
  order: number;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: number;
  area: string;
  description: string;
  materials: string[];
  cover: string;
  images: string[];
  featured?: boolean;
  files?: PortfolioFile[];
}

export interface PortfolioFile {
  id: string;
  name: string;
  type: "image" | "pdf" | "revit" | "cad" | "other";
  url: string;
  size: number;
}

export interface PortfolioContent {
  profile: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    image: string;
    heroImage: string;
    cvUrl: string;
  };
  sections: PortfolioSection[];
  skills: string[];
  experience: {
    id: string;
    role: string;
    studio: string;
    period: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    period: string;
  }[];
  publications: {
    id: string;
    title: string;
    source: string;
    year: string;
  }[];
  projects: PortfolioProject[];
  files: PortfolioFile[];
}

export const categories: ("All" | Category)[] = [
  "All",
  "Residential",
  "Commercial",
  "Cultural",
  "Urban",
  "Interior",
];

export const defaultContent: PortfolioContent = {
  profile: {
    name: "Muhand El-Nady",
    title: "Architectural Engineer",
    tagline: "Architecture portfolio shaped around design clarity, technical documentation, Revit modeling and calm visual storytelling.",
    location: "Egypt",
    email: "hello@muhand-architect.com",
    phone: "+20 100 000 0000",
    linkedin: "linkedin.com/in/muhand-elnady",
    image: architect,
    heroImage: hero,
    cvUrl: "",
  },
  sections: [
    {
      id: "hero",
      label: "Hero",
      eyebrow: "Architectural Portfolio",
      title: "Muhand El-Nady",
      body: "Architectural engineer focused on residential, cultural and urban design, with a practical command of BIM workflows and atmospheric visualization.",
      visible: true,
      order: 0,
    },
    {
      id: "about",
      label: "About",
      eyebrow: "Profile",
      title: "Design grounded in context, detail and buildable thinking.",
      body: "Muhand works across concept design, architectural drawings, Revit documentation, CAD coordination and presentation visuals. His portfolio brings together spatial studies, measured plans, material thinking and clear project narratives.",
      visible: true,
      order: 1,
    },
    {
      id: "projects",
      label: "Projects",
      eyebrow: "Selected Work",
      title: "Architectural projects across housing, culture and interiors.",
      body: "A curated set of academic and professional architecture projects with project notes, typology, area, location, materials and media.",
      visible: true,
      order: 2,
    },
    {
      id: "skills",
      label: "Skills",
      eyebrow: "Capabilities",
      title: "From first sketches to coordinated technical packages.",
      body: "Core tools include Revit, AutoCAD, SketchUp, Enscape, Lumion, Photoshop and presentation workflows for architecture boards.",
      visible: true,
      order: 3,
    },
    {
      id: "experience",
      label: "Experience",
      eyebrow: "Timeline",
      title: "Professional formation and project exposure.",
      body: "Experience entries can be edited from the admin panel as the CV is finalized.",
      visible: true,
      order: 4,
    },
    {
      id: "education",
      label: "Education",
      eyebrow: "Education",
      title: "Academic background in architecture and design.",
      body: "Education details are editable so the portfolio can match the final CV precisely.",
      visible: true,
      order: 5,
    },
    {
      id: "publications",
      label: "Publications",
      eyebrow: "Recognition",
      title: "Awards, certificates and features.",
      body: "Use this section for awards, workshops, press, certificates or competitions.",
      visible: true,
      order: 6,
    },
    {
      id: "contact",
      label: "Contact",
      eyebrow: "Contact",
      title: "Available for architecture roles, collaborations and project discussions.",
      body: "Send a message or use the direct contact details below.",
      visible: true,
      order: 7,
    },
    {
      id: "cv",
      label: "CV",
      eyebrow: "Download",
      title: "CV and project sheets.",
      body: "Upload a PDF CV from the admin panel and keep it available for visitors.",
      visible: true,
      order: 8,
    },
  ],
  skills: ["Revit", "AutoCAD", "SketchUp", "Enscape", "Lumion", "Photoshop", "Architectural Design", "Working Drawings", "3D Visualization", "Presentation Boards"],
  experience: [
    {
      id: "exp-1",
      role: "Architectural Designer",
      studio: "Portfolio and freelance project work",
      period: "2023 - Present",
      description: "Prepared conceptual layouts, BIM models, CAD drawings and presentation visuals for residential and mixed-use design studies.",
    },
    {
      id: "exp-2",
      role: "Junior Architect Trainee",
      studio: "Architecture practice experience",
      period: "2022 - 2023",
      description: "Supported drawing production, design research, site-informed studies and architectural documentation.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Sc. Architectural Engineering",
      school: "Faculty of Engineering",
      period: "Editable from admin",
    },
  ],
  publications: [
    {
      id: "pub-1",
      title: "Architecture portfolio prepared for professional applications",
      source: "Selected works",
      year: "2026",
    },
  ],
  projects: [
    {
      slug: "courtyard-house",
      title: "Courtyard House",
      category: "Residential",
      location: "Egypt",
      year: 2025,
      area: "420 m2",
      description: "A residential concept organized around a shaded courtyard, controlled openings and a calm material palette suited to a warm climate.",
      materials: ["Concrete", "Limestone", "Timber screens", "Plaster"],
      cover: p1,
      images: [p1, p4, p5],
      featured: true,
    },
    {
      slug: "urban-housing-block",
      title: "Urban Housing Block",
      category: "Urban",
      location: "New Cairo, Egypt",
      year: 2024,
      area: "8,600 m2",
      description: "A compact housing study balancing density, daylight, shared circulation and ground-floor community spaces.",
      materials: ["Reinforced concrete", "Glass", "Aluminum louvers"],
      cover: p2,
      images: [p2, p3],
      featured: true,
    },
    {
      slug: "cultural-pavilion",
      title: "Cultural Pavilion",
      category: "Cultural",
      location: "Cairo, Egypt",
      year: 2024,
      area: "1,200 m2",
      description: "A public pavilion designed as a sequence of compressed and open spaces, using light and shadow as a primary architectural material.",
      materials: ["Stone", "Fair-faced concrete", "Bronze mesh"],
      cover: p3,
      images: [p3, p6, p2],
    },
    {
      slug: "minimal-apartment",
      title: "Minimal Apartment",
      category: "Interior",
      location: "Giza, Egypt",
      year: 2023,
      area: "160 m2",
      description: "Interior redesign with warm wood, integrated storage and quiet lighting details for a compact urban apartment.",
      materials: ["Oak veneer", "Microcement", "Linen", "Brushed metal"],
      cover: p4,
      images: [p4, p1],
    },
    {
      slug: "coastal-retreat",
      title: "Coastal Retreat",
      category: "Residential",
      location: "North Coast, Egypt",
      year: 2025,
      area: "360 m2",
      description: "A coastal residence concept using layered terraces, shaded outdoor rooms and strong indoor-outdoor connections.",
      materials: ["White render", "Local stone", "Timber pergolas"],
      cover: p5,
      images: [p5, p1, p4],
      featured: true,
    },
    {
      slug: "light-study-gallery",
      title: "Light Study Gallery",
      category: "Cultural",
      location: "Alexandria, Egypt",
      year: 2023,
      area: "540 m2",
      description: "A gallery concept focused on indirect daylight, thick thresholds and flexible exhibition rooms.",
      materials: ["Pale concrete", "Ash timber", "Translucent glass"],
      cover: p6,
      images: [p6, p3],
    },
  ],
  files: [],
};

export const getDefaultProject = (slug: string) =>
  defaultContent.projects.find((p) => p.slug === slug);
