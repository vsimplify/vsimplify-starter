export interface Domain {
  ForUse: string;
  Audience: string;
  Domain: string;
  Area: string;
  Id: number;
}

export const domainData: Domain[] = [
  {
    ForUse: "Home 🏠",
    Audience: "Parents 👫",
    Domain: "Home Management 🏕",
    Area: "Family Meals 🍽️",
    Id: 1.01
  },
  {
    ForUse: "Home 🏠",
    Audience: "Parents 👫",
    Domain: "Education 🏫",
    Area: "Household Tasks 🧹",
    Id: 1.02
  },
  {
    ForUse: "Home 🏠",
    Audience: "Parents 👫",
    Domain: "Budgeting 💶",
    Area: "Study Planning 📚",
    Id: 1.03
  },
  {
    ForUse: "Work 💼",
    Audience: "Individual 👤",
    Domain: "Digital Services 🌐",
    Area: "Productivity ⚡",
    Id: 103.01
  }
];