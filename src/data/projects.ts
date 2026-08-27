export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  role: string;
  year: string;
  image: string;
  color: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "Nebula Dashboard",
    subtitle: "Real-time analytics platform",
    description:
      "A comprehensive analytics dashboard built for monitoring complex data streams with real-time visualization and predictive insights.",
    tech: ["Next.js", "TypeScript", "D3.js", "WebSocket"],
    role: "Lead Frontend Engineer",
    year: "2025",
    image: "/projects/project-01.jpg",
    color: "#CCFF00",
    link: "#",
  },
  {
    id: "project-02",
    number: "02",
    title: "Void Studio",
    subtitle: "Creative agency website",
    description:
      "An immersive digital experience for a creative studio featuring WebGL transitions, custom scroll physics, and generative visuals.",
    tech: ["React", "Three.js", "GSAP", "WebGL"],
    role: "Creative Developer",
    year: "2025",
    image: "/projects/project-02.jpg",
    color: "#FF6B35",
    link: "#",
  },
  {
    id: "project-03",
    number: "03",
    title: "Pulse",
    subtitle: "Health & fitness companion",
    description:
      "A minimal, data-rich fitness tracking application with biometric visualization and adaptive workout recommendations.",
    tech: ["React Native", "Node.js", "PostgreSQL", "Figma"],
    role: "Full-Stack Developer & Designer",
    year: "2024",
    image: "/projects/project-03.jpg",
    color: "#00F0FF",
    link: "#",
  },
  {
    id: "project-04",
    number: "04",
    title: "Terraform Labs",
    subtitle: "Internal tooling platform",
    description:
      "An internal developer platform for managing infrastructure deployments with visual pipeline builders and real-time monitoring.",
    tech: ["Vue.js", "Go", "Docker", "Kubernetes"],
    role: "Frontend Architect",
    year: "2024",
    image: "/projects/project-04.jpg",
    color: "#B388FF",
    link: "#",
  },
];
