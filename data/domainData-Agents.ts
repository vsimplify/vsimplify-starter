export interface Domain {
  ForUse: string;
  Audience: string;
  Domain: string;
  Area: string;
  Id: number;
}

export const domainData: Domain[] = [
  {
    ForUse: "Placeholder",
    Audience: "Placeholder",
    Domain: "Placeholder",
    Area: "Placeholder",
    Id: 0
  },
  {
    ForUse: "Home 🏠",
    Audience: "🎁 Parents 👫",
    Domain: "🏠 Home Management 🏕",
    Area: "Plan and Organize Weekly Family Meals 🍽️",
    Id: 1.01
  },
  {
    ForUse: "Home 🏠",
    Audience: "🎁 Parents 👫",
    Domain: "🏫 Education 🏫",
    Area: "Manage Household Chores 🧘‍♂️",
    Id: 1.02
  },
  {
    ForUse: "Home 🏠",
    Audience: "🎁 Parents 👫",
    Domain: "🏸 Budgeting 💶",
    Area: "Help with Homework and Study Scheduling 📚👨‍🏫",
    Id: 1.03
  },
  {
    ForUse: "Home 🏠",
    Audience: "🎁 Parents 👫",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 1.04
  },
  // ... continuing with Work section
  {
    ForUse: "Work 💼",
    Audience: "Individual 👤",
    Domain: "Digital Services 🌐",
    Area: "Productivity ⚡",
    Id: 103.01
  },
  {
    ForUse: "Work 💼",
    Audience: "🖱 Technology ⌨️",
    Domain: "🚨 Cybersecurity 🔒",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 103.02
  },
  {
    ForUse: "Work 💼",
    Audience: "🖱 Technology ⌨️",
    Domain: "🤝 IT Support 📞",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 103.03
  },
  {
    ForUse: "Work 💼",
    Audience: "🖱 Technology ⌨️",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 103.04
  },
  {
    ForUse: "Work 💼",
    Audience: "🖱 Technology ⌨️",
    Domain: "📱 Software Development 💻",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 103.05
  }
];