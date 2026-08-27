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
}

export const projects: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "College Management System",
    subtitle: "Full-stack system with 8 role-based portals",
    description:
      "A complete system that digitalizes all major college operations across 8 portals: Student, Teacher, Parent, Principal, Accountant, Admission Officer, and Exam Officer. Features secure token-based authentication with role-based access control, plus a dark/light mode. Built as a project-based experience during my internship.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    role: "Full Stack Developer Intern — Hayat Dev",
    year: "2026",
    color: "#CCFF00",
    link: "#",
  },
  {
    id: "project-02",
    number: "02",
    title: "SkillLink",
    subtitle: "Verified service provider hiring platform",
    description:
      "A full-stack web application solving the lack of trust when hiring daily wage workers. Features verified service-provider profiles, ratings and reviews, an emergency service feature, and three dashboards — Admin, Worker, and Client — with secure role-based access.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    role: "Semester Project — Web Technologies",
    year: "2026",
    color: "#FF6B35",
    link: "#",
  },
  {
    id: "project-03",
    number: "03",
    title: "Skyscrapper Stack Builder",
    subtitle: "Block-stacking game built with Data Structures",
    description:
      "A block-stacking game where the player places blocks precisely on top of the previous one. Uses the Stack data structure (LIFO) to manage placed blocks, with speed increasing as the game progresses and a scoreboard showing the top three highscores.",
    tech: ["Java", "Java Swing", "OOP", "Stack"],
    role: "Data Structures Project",
    year: "2025",
    color: "#00F0FF",
    link: "#",
  },
  {
    id: "project-04",
    number: "04",
    title: "Quiz Management System",
    subtitle: "Role-based quiz platform for education",
    description:
      "A simple application where admins can add or remove teachers and students, teachers can create quizzes and view results, and students can log in with their details to attempt quizzes and check results after.",
    tech: ["Java", "Java Swing", "GUI", "OOP"],
    role: "Group Project",
    year: "2025",
    color: "#B388FF",
    link: "#",
  },
];
