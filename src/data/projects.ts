export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  role: string;
  year: string;
  color: string;
  link: string;
  featured?: boolean;
  impact?: string[];
}

export const GITHUB_URL = "https://github.com/Zuneera134";

export const projects: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "College Management System",
    subtitle: "Full-stack system with 8 role-based portals",
    description:
      "Digitalizes college operations across 8 role-based portals (student, teacher, parent, accounts, exams) with token auth and role-based access.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    role: "Full Stack Developer Intern, Hayat Dev",
    year: "2026",
    color: "#CCFF00",
    link: "https://github.com/ahmadAwann/CMS",
  },
  {
    id: "project-02",
    number: "02",
    title: "SkillLink",
    subtitle: "Verified service provider hiring platform",
    description:
      "A trusted platform for hiring verified daily-wage workers, with ratings, an emergency feature, and three role-based dashboards.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    role: "Semester Project, Web Technologies",
    year: "2026",
    color: "#00C2A8",
    link: "https://github.com/Zuneera134/SKILL-LINK-APP",
  },
  {
    id: "project-03",
    number: "03",
    title: "Skyscrapper Stack Builder",
    subtitle: "Block-stacking game built with Data Structures",
    description:
      "Block-stacking game powered by the Stack data structure, with rising speed and a top-three scoreboard.",
    tech: ["Java", "Java Swing", "OOP", "Stack"],
    role: "Data Structures Project",
    year: "2025",
    color: "#00F0FF",
    link: "https://github.com/Zuneera134/SkyScrapper-Stack-Builder-Game",
  },
  {
    id: "project-04",
    number: "04",
    title: "HRMS",
    subtitle: "AI-centric Human Resource Management System",
    description:
      "AI-assisted HR system with employee, attendance, leave and approval workflows, plus resume parsing and AI candidate screening.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    role: "Full Stack Developer, TechNest x Insiscos",
    year: "2026",
    color: "#8B5CF6",
    link: "https://github.com/artdevelopers-artbyzefa/HRMS",
    featured: true,
  },
  {
    id: "project-05",
    number: "05",
    title: "Mezban",
    subtitle: "Pizza Burger Shop, full-stack production platform",
    description:
      "Production-grade ordering platform for a pizza & burger shop. Next.js + Node/Express + MongoDB in a monorepo, with CI/CD, automated security scans, and zero-downtime rollbacks.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
    role: "Full Stack Developer, Insiscos",
    year: "2026",
    color: "#FF6B35",
    link: "https://github.com/Ininsico/Meezban",
    featured: true,
  },
  {
    id: "project-06",
    number: "06",
    title: "UNO",
    subtitle: "UNO card game built in C# with Windows Forms",
    description:
      "A playable UNO card game with a desktop GUI, built in C# using Windows Forms. Implements turn-based play and core UNO rules.",
    tech: ["C#", ".NET", "Windows Forms", "OOP"],
    role: "Personal Project",
    year: "2025",
    color: "#E63946",
    link: "https://github.com/Zuneera134/UnoWinforms",
  },
];
