export type Category = "Outdoor Space" | "Residential Facade";
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
  year?: number;
  area?: string;
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
  "Outdoor Space",
  "Residential Facade",
];

export const defaultContent: PortfolioContent = {
  profile: {
    name: "Muhand Muhammed Sulaiman El-Nady",
    title: "Architectural Engineer (4th Year Student)",
    tagline: "Architectural Engineering student from Egypt with experience in finishing, construction site training, Revit, AutoCAD, Photoshop, Enscape and D5 Render.",
    location: "Burqin, Zagazig, Sharqia, Egypt",
    email: "mohandelnady33@gmail.com",
    phone: "01011517780",
    linkedin: "",
    image: "",
    heroImage: "",
    cvUrl: "",
  },
  sections: [
    {
      id: "hero",
      label: "Hero",
      eyebrow: "Architectural Engineer from Egypt",
      title: "Muhand Muhammed Sulaiman El-Nady",
      body: "Architectural Engineer (4th Year Student), Obour Institute of Engineering and Technology. Expected Graduation: July 2026.",
      visible: true,
      order: 0,
    },
    {
      id: "about",
      label: "About",
      eyebrow: "Profile",
      title: "Architectural Engineer (4th Year Student)",
      body: "Muhand Muhammed Sulaiman El-Nady is Egyptian, born March 15, 2003, based in Burqin, Zagazig, Sharqia, Egypt. English Level: B2.",
      visible: true,
      order: 1,
    },
    {
      id: "projects",
      label: "Projects",
      eyebrow: "Projects",
      title: "Design of Modern Outdoor Space and Residential Building Facade",
      body: "Real projects from Muhand's CV, located in 10th of Ramadan City, Egypt, using Revit, Photoshop and Enscape Render.",
      visible: true,
      order: 2,
    },
    {
      id: "skills",
      label: "Skills",
      eyebrow: "Skills",
      title: "Software, rendering and architectural skills",
      body: "Revit (Architectural), AutoCAD, Photoshop, Enscape, D5 Render, technical drawing, 2D/3D modeling, rendering presentation, landscape design and site coordination basics.",
      visible: true,
      order: 3,
    },
    {
      id: "experience",
      label: "Experience",
      eyebrow: "Experience",
      title: "Architectural finishing and construction site training",
      body: "Architectural Finishing Intern and Site Training - Construction Internship experience in Egypt.",
      visible: true,
      order: 4,
    },
    {
      id: "education",
      label: "Education",
      eyebrow: "Education",
      title: "Obour Institute of Engineering and Technology",
      body: "Bachelor of Architectural Engineering (B.Eng.), Senior Year (4th Year), Expected Graduation: July 2026.",
      visible: true,
      order: 5,
    },
    {
      id: "contact",
      label: "Contact",
      eyebrow: "Contact",
      title: "Contact Muhand Muhammed Sulaiman El-Nady",
      body: "Phone: 01011517780. Email: mohandelnady33@gmail.com. Location: Burqin, Zagazig, Sharqia, Egypt.",
      visible: true,
      order: 6,
    },
    {
      id: "publications",
      label: "Publications",
      eyebrow: "Publications",
      title: "",
      body: "",
      visible: false,
      order: 7,
    },
    {
      id: "cv",
      label: "CV",
      eyebrow: "CV",
      title: "",
      body: "",
      visible: false,
      order: 8,
    },
  ],
  skills: [
    "Revit (Architectural)",
    "AutoCAD",
    "Photoshop",
    "Enscape",
    "D5 Render",
    "Technical drawing",
    "2D/3D modeling",
    "Rendering presentation",
    "Landscape Design",
    "Site coordination basics",
  ],
  experience: [
    {
      id: "exp-1",
      role: "Architectural Finishing Intern",
      studio: "Private Finishing Office - Al-Najjar General Contracting and Finishing, 10th of Ramadan, Egypt",
      period: "Feb 2025 - Jun 2025",
      description: "Worked on interior finishing for residential units. Assisted in material selection and site supervision. Gained hands-on experience with gypsum board, paints, tiles, electrical outlets.",
    },
    {
      id: "exp-2",
      role: "Site Training - Construction Internship",
      studio: "Protection Contracting Company, Cairo, Egypt",
      period: "Aug 2024",
      description: "Observed structural and architectural execution. Gained exposure to safety protocols and project scheduling. Assisted engineers in reviewing plans and monitoring contractors.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Architectural Engineering (B.Eng.)",
      school: "Obour Institute of Engineering and Technology",
      period: "Senior Year (4th Year), Expected Graduation: July 2026",
    },
  ],
  publications: [],
  projects: [
    {
      slug: "design-of-modern-outdoor-space",
      title: "Design of Modern Outdoor Space",
      category: "Outdoor Space",
      location: "10th of Ramadan City, Egypt",
      description: "Modern outdoor space combining comfort and nature.",
      materials: ["Revit", "Photoshop", "Enscape Render", "Has QR code for project"],
      cover: "",
      images: [],
      featured: true,
    },
    {
      slug: "architectural-design-for-residential-building-facade",
      title: "Architectural Design for Residential Building Facade",
      category: "Residential Facade",
      location: "10th of Ramadan City, Egypt",
      description: "Residential facade design.",
      materials: ["Revit", "Photoshop", "Enscape Render", "Has QR code for project"],
      cover: "",
      images: [],
      featured: true,
    },
  ],
  files: [],
};

export const getDefaultProject = (slug: string) =>
  defaultContent.projects.find((p) => p.slug === slug);
