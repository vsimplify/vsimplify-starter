import { Agent } from "@/types/agent";
import { Mission } from "@/types/mission";
import { Task } from "@/types/portfolio";

export const agents: Array<Agent> = [
  {
    id: 1,
    role: "Senior Software Engineer",
    goal: "Create software as needed",
    backstory: `
        You are a Senior Software Engineer at a leading tech think tank.
		Your expertise in programming in python. and do your best to
		produce perfect code
    `,
    tools: ["DUCK_DUCK_GO_SEARCH"],
    allowDelegation: false,
    verbose: true,
    image:
      "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    memory:false,
    creator: "Me",
    email:"placeholder@h.com",
    title:"Senior Software Engineer",
    domainId:4,
  },
  {
    id: 2,
    role: "Software Quality Control Engineer",
    goal: "create prefect code, by analizing the code that is given for errors",
    backstory: `
        You are a software engineer that specializes in checking code for errors.
        You have an eye for detail and a knack for finding hidden bugs.
        You check for missing imports, variable declarations, mismatched brackets and syntax errors.
        You also check for security vulnerabilities, and logic errors.
    `,
    tools: ["DUCK_DUCK_GO_SEARCH"],
    allowDelegation: false,
    verbose: true,
    image:
      "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    memory:false,
    creator: "Me",
    email:"placeholder@h.com",
    title:"Senior Software Engineer",
    domainId:4,
  },
  {
    id: 3,
    role: "Chief Software Quality Control Engineer",
    goal: "Ensure that the code does the job that it is supposed to do",
    backstory: `
        You feel that programmers always do only half the job, so you are
        super dedicate to make high quality code.
    `,
    tools: ["SEMANTIC_SCHOLAR", "WIKIDATA", "YOUTUBE_SEARCH"],
    allowDelegation: false,
    verbose: true,
    image:
      "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    memory:false,
    creator: "Me",
    email:"placeholder@h.com",
    title:"Senior Software Engineer",
    domainId:4,
  },
];

export const tools = [
  { text: "DUCK_DUCK_GO_SEARCH", value: "DUCK_DUCK_GO_SEARCH" },
  { text: "SEMANTIC_SCHOLAR", value: "SEMANTIC_SCHOLAR" },
  { text: "WIKIDATA", value: "WIKIDATA" },
  { text: "WIKIPEDIA", value: "WIKIPEDIA" },
  { text: "YAHOO_FINANCE", value: "YAHOO_FINANCE" },
  { text: "YOUTUBE_SEARCH", value: "YOUTUBE_SEARCH" },
  { text: "ARXIV", value: "ARXIV" },
  { text: "PUBMED", value: "PUBMED" },
];

const game = `
"Chrono Quest: Time Traveler" is a narrative-driven web game where players embark on a thrilling journey through different historical periods to save the fabric of time. As a time-traveling adventurer, players must navigate various eras, from ancient civilizations to futuristic worlds, solving puzzles, interacting with historical figures, and altering events to prevent a catastrophic temporal paradox.
Players will face diverse challenges, from deciphering ancient codes in the Egyptian pyramids to outsmarting futuristic robots in a dystopian metropolis. Each decision impacts the course of history and the outcome of the game, leading to multiple branching storylines and endings.
With stunning visuals, immersive storytelling, and dynamic gameplay mechanics, "Chrono Quest: Time Traveler" offers an unforgettable experience that combines elements of adventure, strategy, and puzzle-solving. Dive into the depths of time and rewrite history in this epic web-based adventure game.
`;

export const missions: Array<Mission> = [
  {
    id: 1,
    name: "Game Building",
    projectId: 1,
    email: "placeholder",
    inTokens: 888,
    outTokens: 888,
    abandonedForTokens: false,
    tasks: [
      {
        id: "1",
        name: "Code Task",
        description: `
        You will create a game using python, these are the instructions:

			  Instructions
			  ------------
    	  ${game}
        `,
        assignedAgentId: 1,
        missionId: 1,
        status: 'not_started',
        priority: 'high',
        dependencies: [],
        expected_output: "Your Final answer must be the full python code, only the python code and nothing else.",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        name: "Review Task",
        description: `
        You are helping create a game using python, these are the instructions:

			  Instructions
			  ------------
        ${game}

        Using the code you got, check for errors. Check for logic errors,
        syntax errors, missing imports, variable declarations, mismatched brackets,
        and security vulnerabilities.
        `,
        assignedAgentId: 2,
        missionId: 1,
        status: 'not_started',
        priority: 'high',
        dependencies: ["1"],
        expected_output: "Your Final answer must be the full python code, only the python code and nothing else.",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "3",
        name: "Evaluate Task",
        description: `
        You are helping create a game using python, these are the instructions:

        Instructions
        ------------
        ${game}

        You will look over the code to insure that it is complete and
        does the job that it is supposed to do.
        `,
        assignedAgentId: 3,
        missionId: 1,
        status: 'not_started',
        priority: 'high',
        dependencies: ["2"],
        expected_output: "Your Final answer must be the full python code, only the python code and nothing else.",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ],
    verbose: true,
    process: "SEQUENTIAL",
    result: "",
    domainId: 4,
    _AgentToMission: [
      { A: 1, B: 1 },
      { A: 2, B: 1 },
      { A: 3, B: 1 }
    ],
    agents: agents,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    taskResult: null,
    user_id: "system",
    token_usage: 0,
    execution_time: 0,
    cost_per_execution: 0
  },
  {
    id: 2,
    name: "Mission1",
    projectId: 1,
    email: "placeholder",
    inTokens: 888,
    outTokens: 888,
    abandonedForTokens: false,
    domainId: 4,
    tasks: [
      {
        id: "4",
        name: "Task1",
        description: "description description description description",
        assignedAgentId: 1,
        missionId: 1,
        status: 'not_started',
        priority: 'high',
        dependencies: [],
        expected_output: "Expected Output",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "5",
        name: "Task2",
        description: "description description description description",
        assignedAgentId: 2,
        missionId: 1,
        status: 'not_started',
        priority: 'high',
        dependencies: ["4"],
        expected_output: "Expected Output",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
    ],
    verbose: true,
    process: "SEQUENTIAL",
    result: "result",
    _AgentToMission: [
      { A: 1, B: 2 }
    ],
    agents: [agents[0]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    taskResult: null,
    user_id: "system",
    token_usage: 0,
    execution_time: 0,
    cost_per_execution: 0
  },
  {
    id: 3,
    name: "Mission2",
    projectId: 1,
    email: "placeholder",
    inTokens: 888,
    outTokens: 888,
    abandonedForTokens: false,
    tasks: [
      {
        id: "6",
        name: "Task1",
        description: "description description description description",
        assignedAgentId: 1,
        missionId: 3,
        status: 'not_started',
        priority: 'high',
        dependencies: [],
        expected_output: "Expected Output",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "7",
        name: "Task2",
        description: "description description description description",
        assignedAgentId: 2,
        missionId: 3,
        status: 'not_started',
        priority: 'high',
        dependencies: ["6"],
        expected_output: "Expected Output",
        async_execution: true,
        user_id: "system",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    verbose: true,
    process: "SEQUENTIAL",
    result: "result",
    domainId: 4,
    _AgentToMission: [
      { A: 1, B: 3 }
    ],
    agents: [agents[0]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    taskResult: null,
    user_id: "system",
    token_usage: 0,
    execution_time: 0,
    cost_per_execution: 0
  }
];
