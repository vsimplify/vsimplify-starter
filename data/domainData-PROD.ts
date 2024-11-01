import { Domain } from './domainData';

export const domainData: Domain[] = [
  // Game Development (103.01)
  {
    ForUse: "Work 💼",
    Audience: "Individual 👤",
    Domain: "Digital Services 🌐",
    Area: "Productivity ⚡",
    Id: 103.01
  },
  {
    ForUse: "Work 💼",
    Audience: "Individual 👤",
    Domain: "Digital Services 🌐",
    Area: "Game Design 🎮",
    Id: 103.02
  },
  {
    ForUse: "Work 💼",
    Audience: "Individual 👤",
    Domain: "Digital Services 🌐",
    Area: "Asset Creation 🎨",
    Id: 103.03
  },
  // Healthcare (100.01)
  {
    ForUse: "Work 💼",
    Audience: "Healthcare 🏥",
    Domain: "Medical Services 👨‍⚕️",
    Area: "Patient Care 🏥",
    Id: 100.01
  },
  {
    ForUse: "Work 💼",
    Audience: "Healthcare 🏥",
    Domain: "Medical Services 👨‍⚕️",
    Area: "Diagnostics 🔬",
    Id: 100.02
  },
  {
    ForUse: "Work 💼",
    Audience: "Healthcare 🏥",
    Domain: "Medical Services 👨‍⚕️",
    Area: "Research 📚",
    Id: 100.03
  },
  // Finance (101.01)
  {
    ForUse: "Work 💼",
    Audience: "Finance 💰",
    Domain: "Financial Services 💹",
    Area: "Investment Analysis 📊",
    Id: 101.01
  },
  {
    ForUse: "Work 💼",
    Audience: "Finance 💰",
    Domain: "Financial Services 💹",
    Area: "Risk Management 🎯",
    Id: 101.02
  },
  {
    ForUse: "Work 💼",
    Audience: "Finance 💰",
    Domain: "Financial Services 💹",
    Area: "Portfolio Management 📈",
    Id: 101.03
  }
];

export const agentData = [
  {
    id: 1,
    role: "Senior Software Engineer",
    title: "Scheduler Pro",
    goal: "Create efficient scheduling algorithms",
    domainId: 103.01,
    tools: ["DUCK_DUCK_GO_SEARCH"],
    image: "/agents_images/103.01/engineer.png"
  },
  {
    id: 2,
    role: "Quality Control Engineer",
    title: "Content Master",
    goal: "Ensure the content generated is error-free",
    domainId: 103.01,
    tools: ["DUCK_DUCK_GO_SEARCH"],
    image: "/agents_images/103.01/qa-engineer.png"
  },
  {
    id: 3,
    role: "Chief Quality Engineer",
    title: "Health Monitor",
    goal: "Oversee the health monitoring algorithms",
    domainId: 103.01,
    tools: ["SEMANTIC_SCHOLAR", "WIKIDATA", "YOUTUBE_SEARCH"],
    image: "/agents_images/103.01/chief-qa.png"
  },
  // New Agent
  {
    id: 4,
    role: "Technical Architect",
    title: "System Designer",
    goal: "Design scalable system architectures",
    domainId: 103.01,
    tools: ["SEMANTIC_SCHOLAR", "WIKIDATA"],
    image: "/agents_images/103.01/architect.png"
  }
];