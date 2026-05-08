import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export type Category = "Residential" | "Commercial" | "Cultural" | "Interior";

export interface Project {
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
}

export const categories: ("All" | Category)[] = [
  "All",
  "Residential",
  "Commercial",
  "Cultural",
  "Interior",
];

export const projects: Project[] = [
  {
    slug: "casa-umbria",
    title: "Casa Umbria",
    category: "Residential",
    location: "Perugia, Italy",
    year: 2024,
    area: "640 m²",
    description:
      "A monolithic family residence carved into the Umbrian hillside. Board-formed concrete and travertine frame uninterrupted views of the valley, while a sequence of courtyards orchestrates light from dawn to dusk.",
    materials: ["Board-formed concrete", "Travertine", "Smoked oak", "Bronze"],
    cover: p1,
    images: [p1, p4, p5],
    featured: true,
  },
  {
    slug: "atrium-tower",
    title: "Atrium Tower",
    category: "Commercial",
    location: "Rotterdam, Netherlands",
    year: 2023,
    area: "12,400 m²",
    description:
      "A workplace defined by daylight. Vertical timber fins modulate solar gain across a fully glazed envelope, framing the harbour beyond and softening the building's civic presence at street level.",
    materials: ["Cross-laminated timber", "Low-iron glass", "Anodised aluminium"],
    cover: p2,
    images: [p2, p3],
  },
  {
    slug: "stone-pavilion",
    title: "Stone Pavilion",
    category: "Cultural",
    location: "Kyoto, Japan",
    year: 2022,
    area: "2,800 m²",
    description:
      "A contemplative cultural pavilion conceived as a procession of carved stone volumes. The interplay of mass and shadow creates an atmosphere of stillness for the museum's permanent collection.",
    materials: ["Limestone ashlar", "Patinated brass", "Lime plaster"],
    cover: p3,
    images: [p3, p6, p2],
    featured: true,
  },
  {
    slug: "linen-residence",
    title: "Linen Residence",
    category: "Interior",
    location: "Copenhagen, Denmark",
    year: 2024,
    area: "320 m²",
    description:
      "An interior study in restraint. Oak, linen and brushed brass form a calm material palette across a piano nobile of generous, light-filled rooms.",
    materials: ["European oak", "Belgian linen", "Brushed brass", "Carrara marble"],
    cover: p4,
    images: [p4, p1],
  },
  {
    slug: "cliff-house",
    title: "Cliff House",
    category: "Residential",
    location: "Big Sur, California",
    year: 2023,
    area: "510 m²",
    description:
      "A pair of cantilevered concrete volumes hover above the Pacific. The house dissolves into the cliff, choreographing the meeting of land, sea and sky.",
    materials: ["In-situ concrete", "Cor-ten steel", "Western red cedar"],
    cover: p5,
    images: [p5, p1, p4],
    featured: true,
  },
  {
    slug: "chapel-of-light",
    title: "Chapel of Light",
    category: "Cultural",
    location: "Asturias, Spain",
    year: 2021,
    area: "180 m²",
    description:
      "A small sacred space defined by a single shaft of light. Vertical timber slats wrap the interior, transforming sunlight into a slow, daily ritual.",
    materials: ["Pale ash", "Lime-washed concrete", "Patinated bronze"],
    cover: p6,
    images: [p6, p3],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
