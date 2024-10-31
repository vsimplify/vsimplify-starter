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
  {
    ForUse: "Home 🏠",
    Audience: "🧒‍🎓 High or Middle Schoolers 👨‍💻",
    Domain: "🏫 Education 🏫",
    Area: "Help with Homework and Study Scheduling 📚👨‍🏫🕒",
    Id: 2.01
  },
  {
    ForUse: "Home 🏠",
    Audience: "🧒‍🎓 High or Middle Schoolers 👨‍💻",
    Domain: "🤿 Fitness 🌋",
    Area: "Monitor and Guide Fitness and Wellness Routines 👩‍⚕️",
    Id: 2.02
  },
  {
    ForUse: "Home 🏠",
    Audience: "🧒‍🎓 High or Middle Schoolers 👨‍💻",
    Domain: "🎥 Digital Management ⌨️",
    Area: "Organize Digital Photos and Family Memories 💽️",
    Id: 2.03
  },
  {
    ForUse: "Home 🏠",
    Audience: "🧒‍🎓 High or Middle Schoolers 👨‍💻",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 2.04
  },
  {
    ForUse: "Home 🏠",
    Audience: "👔 Bachelors 🎉",
    Domain: "🏸 Budgeting 💶",
    Area: "Budget and Track Household Expenses 💰",
    Id: 3.01
  },
  {
    ForUse: "Home 🏠",
    Audience: "👔 Bachelors 🎉",
    Domain: "💵 Travel ✈️",
    Area: "Plan and Organize Weekend Getaways ✈️",
    Id: 3.02
  },
  {
    ForUse: "Home 🏠",
    Audience: "👔 Bachelors 🎉",
    Domain: "🏠 Home Management 🏕",
    Area: "Manage Household Chores and Cleaning Schedule 🧘‍♂️",
    Id: 3.03
  },
  {
    ForUse: "Home 🏠",
    Audience: "👔 Bachelors 🎉",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 3.04
  },
  {
    ForUse: "Home 🏠",
    Audience: "🏠 Newly Married Couples 💞",
    Domain: "🏠 Home Management 🏕",
    Area: "Plan and Organize Weekly Meals 🍽️",
    Id: 4.01
  },
  {
    ForUse: "Home 🏠",
    Audience: "🏠 Newly Married Couples 💞",
    Domain: "🏠 Home Management 🏕",
    Area: "Manage Household Chores 👨‍🏫",
    Id: 4.02
  },
  {
    ForUse: "Home 🏠",
    Audience: "🏠 Newly Married Couples 💞",
    Domain: "🏸 Budgeting 💶",
    Area: "Budget and Track Household Expenses 💰💰",
    Id: 4.03
  },
  {
    ForUse: "Home 🏠",
    Audience: "🏠 Newly Married Couples 💞",
    Domain: "🧘‍🎨 Activities 👩‍🎨",
    Area: "Plan and Coordinate Family Activities and Outings 🌄😊",
    Id: 4.04
  },
  {
    ForUse: "Home 🏠",
    Audience: "🏠 Newly Married Couples 💞",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 4.05
  },
  {
    ForUse: "Work 💼",
    Audience: "🏥️ Healthcare 💼",
    Domain: "Patient monitoring ﮩ٨ـﮩﮩ٨ـ♡ﮩ٨ـﮩ",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 100.01
  },
  {
    ForUse: "Work 💼",
    Audience: "🏥️ Healthcare 💼",
    Domain: "🤔 Diagnostic Assistance🔬",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 100.02
  },
  {
    ForUse: "Work 💼",
    Audience: "🏥️ Healthcare 💼",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 100.03
  },
  {
    ForUse: "Work 💼",
    Audience: "🔬 Medical 🏥️",
    Domain: "💡 Drug Discovery 🔬",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 101.01
  },
  {
    ForUse: "Work 💼",
    Audience: "🔬 Medical 🏥️",
    Domain: "🏥️ Clinical Trial Management 💊",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 101.02
  },
  {
    ForUse: "Work 💼",
    Audience: "🔬 Medical 🏥️",
    Domain: "🔬 Medical Imaging Analysis 💉",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 101.03
  },
  {
    ForUse: "Work 💼",
    Audience: "🔬 Medical 🏥️",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 101.04
  },
  {
    ForUse: "Work 💼",
    Audience: "💵 Insurance 🔑",
    Domain: "⚠️ Risk Assessment 🔑",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 102.01
  },
  {
    ForUse: "Work 💼",
    Audience: "💵 Insurance 🔑",
    Domain: "💰 Claims Processing 📈",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 102.02
  },
  {
    ForUse: "Work 💼",
    Audience: "💵 Insurance 🔑",
    Domain: "❌ Fraud Detection 🔍",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 102.03
  },
  {
    ForUse: "Work 💼",
    Audience: "💵 Insurance 🔑",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 102.04
  },
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
  },
  {
    ForUse: "Work 💼",
    Audience: "🖱 Technology ⌨️",
    Domain: "📸 Creation 📹",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 104.01
  },
  {
    ForUse: "Work 💼",
    Audience: "🎥 Media 📺",
    Domain: "▶️ Distribution 🔗",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 104.02
  },
  {
    ForUse: "Work 💼",
    Audience: "🎥 Media 📺",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 104.03
  },
  {
    ForUse: "Work 💼",
    Audience: "💰 Finance 💸",
    Domain: "💰 Financial Forecasting 🔮",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 105.01
  },
  {
    ForUse: "Work 💼",
    Audience: "💰 Finance 💸",
    Domain: "Customer Service 👥",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 105.02
  },
  {
    ForUse: "Work 💼",
    Audience: "💰 Finance 💸",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 105.03
  },
  {
    ForUse: "Work 💼",
    Audience: "👚 Retail ⛺",
    Domain: "Inventory Management 📚",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 106.01
  },
  {
    ForUse: "Work 💼",
    Audience: "👚 Retail ⛺",
    Domain: "Customer Behavior Analysis 🧐",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 106.02
  },
  {
    ForUse: "Work 💼",
    Audience: "👚 Retail ⛺",
    Domain: "Personalized Shopping 🛍️",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 106.03
  },
  {
    ForUse: "Work 💼",
    Audience: "👚 Retail ⛺",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 106.04
  },
  {
    ForUse: "Work 💼",
    Audience: "🔧 Manufacturing ⛣",
    Domain: "Predictive Maintenance 🔮",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 107.01
  },
  {
    ForUse: "Work 💼",
    Audience: "🔧 Manufacturing ⛣",
    Domain: "Supply Chain Optimization 🔧",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 107.02
  },
  {
    ForUse: "Work 💼",
    Audience: "🔧 Manufacturing ⛣",
    Domain: "Quality Control 👍",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 107.03
  },
  {
    ForUse: "Work 💼",
    Audience: "🔧 Manufacturing ⛣",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 107.04
  },
  {
    ForUse: "Work 💼",
    Audience: "👨‍💻 Education 🏫",
    Domain: "Personalized Learning 💡️",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 108.01
  },
  {
    ForUse: "Work 💼",
    Audience: "👨‍💻 Education 🏫",
    Domain: "Administrative Automation ⚙️",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 108.02
  },
  {
    ForUse: "Work 💼",
    Audience: "👨‍💻 Education 🏫",
    Domain: "Student Performance Tracking ⚖️",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 108.03
  },
  {
    ForUse: "Work 💼",
    Audience: "👨‍💻 Education 🏫",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 108.04
  },
  {
    ForUse: "Work 💼",
    Audience: "⛵ Logistics 🚢",
    Domain: "Route Optimization 🗺️",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 109.01
  },
  {
    ForUse: "Work 💼",
    Audience: "⛵ Logistics 🚢",
    Domain: "Inventory Tracking 💼",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 109.02
  },
  {
    ForUse: "Work 💼",
    Audience: "⛵ Logistics 🚢",
    Domain: "Demand Forecasting 🔮",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 109.03
  },
  {
    ForUse: "Work 💼",
    Audience: "⛵ Logistics 🚢",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 109.04
  },
  {
    ForUse: "Work 💼",
    Audience: "🏡 Real Estate 🏘️",
    Domain: "Property Valuation 💰",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 110.01
  },
  {
    ForUse: "Work 💼",
    Audience: "🏡 Real Estate 🏘️",
    Domain: "Market Analysis 📊",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 110.02
  },
  {
    ForUse: "Work 💼",
    Audience: "🏡 Real Estate 🏘️",
    Domain: "Virtual Tours 🌄",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 110.03
  },
  {
    ForUse: "Work 💼",
    Audience: "🏡 Real Estate 🏘️",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 110.04
  },
  {
    ForUse: "Work 💼",
    Audience: "📞 Telecommunications 🖱",
    Domain: "Network Optimization 🔧",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 111.01
  },
  {
    ForUse: "Work 💼",
    Audience: "📞 Telecommunications 🖱",
    Domain: "Customer Service ⚡",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 111.02
  },
  {
    ForUse: "Work 💼",
    Audience: "📞 Telecommunications 🖱",
    Domain: "Predictive Maintenance 🔎",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 111.03
  },
  {
    ForUse: "Work 💼",
    Audience: "📞 Telecommunications 🖱",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 111.04
  },
  {
    ForUse: "Work 💼",
    Audience: "👩‍⚖ Legal 🏰",
    Domain: "Contract Analysis 📝",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 112.01
  },
  {
    ForUse: "Work 💼",
    Audience: "👩‍⚖ Legal 🏰",
    Domain: "Legal Research 🔍",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 112.02
  },
  {
    ForUse: "Work 💼",
    Audience: "👩‍⚖ Legal 🏰",
    Domain: "Compliance Monitoring 👮",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 112.03
  },
  {
    ForUse: "Work 💼",
    Audience: "👩‍⚖ Legal 🏰",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 112.04
  },
  {
    ForUse: "Work 💼",
    Audience: " 💼 Human Resources 🧑‍🎓 ",
    Domain: "Talent Acquisition ✈️",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 113.01
  },
  {
    ForUse: "Work 💼",
    Audience: " 💼 Human Resources 🧑‍🎓 ",
    Domain: "Employee Engagement 😊",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 113.02
  },
  {
    ForUse: "Work 💼",
    Audience: " 💼 Human Resources 🧑‍🎓 ",
    Domain: "Performance Management 🏅",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 113.03
  },
  {
    ForUse: "Work 💼",
    Audience: " 💼 Human Resources 🧑‍🎓 ",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 113.04
  },
  {
    ForUse: "Work 💼",
    Audience: "💡Energy 🔋",
    Domain: "Energy Consumption Forecasting 💰",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 114.01
  },
  {
    ForUse: "Work 💼",
    Audience: "💡Energy 🔋",
    Domain: "Grid Management 🔋",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 114.02
  },
  {
    ForUse: "Work 💼",
    Audience: "💡Energy 🔋",
    Domain: "Predictive Maintenance 🔎",
    Area: "🤦‍♂️ Define below 🤷‍♀️",
    Id: 114.03
  },
  {
    ForUse: "Work 💼",
    Audience: "💡Energy 🔋",
    Domain: "🤦‍♂️ Other 🤷‍♀️",
    Area: "🤦‍♂️ Other 🤷‍♀️",
    Id: 114.04
  }
];