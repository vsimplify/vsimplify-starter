// 'use client'

// import { useState, useEffect } from 'react'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Database } from '@/lib/database.types'

// type Portfolio = Database['public']['Tables']['Portfolio']['Row']
// type Project = Database['public']['Tables']['Project']['Row']
// type Mission = Database['public']['Tables']['Mission']['Row']
// type Task = Database['public']['Tables']['Task']['Row']
// type Domain = Database['public']['Tables']['Domain']['Row']

// // Mock data - replace with actual API calls
// const mockDomains: Domain[] = [
//   { id: 1, identifier: 1, Domain: 'AI', ForUse: 'Research', Audience: 'Scientists', Area: 'Machine Learning', Agents: [], Missions: [] },
//   { id: 2, identifier: 2, Domain: 'Web Development', ForUse: 'Commercial', Audience: 'Developers', Area: 'Frontend', Agents: [], Missions: [] },
// ]

// const mockPortfolio: Portfolio[] = [
//   { id: '1', title: 'AI Research Projects', status: 'Active', domainId: 1, user_id: 'user1', created_at: new Date().toISOString() },
//   { id: '2', title: 'Web Development Initiatives', status: 'In Progress', domainId: 2, user_id: 'user1', created_at: new Date().toISOString() },
// ]

// const mockProjects: Project[] = [
//   { id: 1, title: 'Neural Network Optimization', status: 'In Progress', domainId: 1, email: 'user@example.com', goal: 'Improve AI model efficiency', nugget: 'Efficiency boost', objective: 'Reduce computational resources', outcome: 'Faster AI models', dueOn: new Date().toISOString(), createdAt: new Date().toISOString(), user_id: 'user1' },
//   { id: 2, title: 'Responsive Web Design Framework', status: 'Planning', domainId: 2, email: 'user@example.com', goal: 'Create a versatile CSS framework', nugget: 'Flexibility', objective: 'Support multiple device sizes', outcome: 'Improved web responsiveness', dueOn: new Date().toISOString(), createdAt: new Date().toISOString(), user_id: 'user1' },
// ]

// const mockMissions: Mission[] = [
//   { id: 1, name: 'Implement Pruning Algorithm', process: 'SEQUENTIAL', project_id: 1, domainId: 1, email: 'user@example.com', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), user_id: 'user1', inTokens: 0, outTokens: 0, abandonedForTokens: false, verbose: false },
//   { id: 2, name: 'Design Grid System', process: 'HIERARCHICAL', project_id: 2, domainId: 2, email: 'user@example.com', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), user_id: 'user1', inTokens: 0, outTokens: 0, abandonedForTokens: false, verbose: false },
// ]

// const mockTasks: Task[] = [
//   { id: '1', name: 'Research pruning techniques', status: 'In Progress', missionId: 1, user_id: 'user1' },
//   { id: '2', name: 'Implement pruning algorithm', status: 'To Do', missionId: 1, user_id: 'user1' },
//   { id: '3', name: 'Define grid breakpoints', status: 'Done', missionId: 2, user_id: 'user1' },
// ]

// export default function PortfolioDashboard() {
//   const [selectedForUse, setSelectedForUse] = useState<string | null>(null)
//   const [selectedAudience, setSelectedAudience] = useState<string | null>(null)
//   const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
//   const [selectedArea, setSelectedArea] = useState<string | null>(null)
//   const [domains, setDomains] = useState<Domain[]>([])
//   const [Portfolio, setPortfolio] = useState<Portfolio[]>([])
//   const [projects, setProjects] = useState<Project[]>([])
//   const [missions, setMissions] = useState<Mission[]>([])
//   const [tasks, setTasks] = useState<Task[]>([])

//   useEffect(() => {
//     // Simulating API calls - replace with actual data fetching
//     setDomains(mockDomains)
//     setPortfolio(mockPortfolio)
//     setProjects(mockProjects)
//     setMissions(mockMissions)
//     setTasks(mockTasks)
//   }, [])

//   const filteredDomains = domains.filter(domain => 
//     (!selectedForUse || domain.ForUse === selectedForUse) &&
//     (!selectedAudience || domain.Audience === selectedAudience) &&
//     (!selectedDomain || domain.Domain === selectedDomain) &&
//     (!selectedArea || domain.Area === selectedArea)
//   )

//   const filteredPortfolio = Portfolio.filter(portfolio => 
//     filteredDomains.some(domain => domain.id === portfolio.domainId)
//   )

//   const groupedPortfolio = filteredPortfolio.reduce((acc, portfolio) => {
//     const status = portfolio.status || 'Unknown'
//     if (!acc[status]) acc[status] = []
//     acc[status].push(portfolio)
//     return acc
//   }, {} as Record<string, Portfolio[]>)

//   return (
//     <div className="container mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
//       <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">AI Portfolio Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <Select onValueChange={setSelectedForUse}>
//           <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
//             <SelectValue placeholder="Select For Use" />
//           </SelectTrigger>
//           <SelectContent>
//             {Array.from(new Set(domains.map(d => d.ForUse))).map(forUse => (
//               <SelectItem key={forUse} value={forUse}>{forUse}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select onValueChange={setSelectedAudience}>
//           <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
//             <SelectValue placeholder="Select Audience" />
//           </SelectTrigger>
//           <SelectContent>
//             {Array.from(new Set(domains.map(d => d.Audience))).map(audience => (
//               <SelectItem key={audience} value={audience}>{audience}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select onValueChange={setSelectedDomain}>
//           <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
//             <SelectValue placeholder="Select Domain" />
//           </SelectTrigger>
//           <SelectContent>
//             {Array.from(new Set(domains.map(d => d.Domain))).map(domain => (
//               <SelectItem key={domain} value={domain}>{domain}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Select onValueChange={setSelectedArea}>
//           <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600">
//             <SelectValue placeholder="Select Area" />
//           </SelectTrigger>
//           <SelectContent>
//             {Array.from(new Set(domains.map(d => d.Area))).map(area => (
//               <SelectItem key={area} value={area}>{area}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {Object.entries(groupedPortfolio).map(([status, Portfolio]) => (
//         <div key={status} className="mb-12">
//           <h2 className="text-2xl font-semibold mb-6 text-blue-300">{status} Portfolio</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Portfolio.map(portfolio => (
//               <Card key={portfolio.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600">
//                   <CardTitle className="text-white">{portfolio.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-4">
//                   <Accordion type="single" collapsible className="bg-gray-800">
//                     <AccordionItem value="projects" className="border-b-0">
//                       <AccordionTrigger className="text-blue-300 hover:text-blue-400">Projects</AccordionTrigger>
//                       <AccordionContent>
//                         {projects.filter(p => p.domainId === portfolio.domainId).map(project => (
//                           <Accordion key={project.id} type="single" collapsible className="mb-2">
//                             <AccordionItem value={`project-${project.id}`} className="border-gray-700">
//                               <AccordionTrigger className="text-gray-300 hover:text-gray-100">{project.title}</AccordionTrigger>
//                               <AccordionContent>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                   {['To Do', 'In Progress', 'Done'].map(status => (
//                                     <div key={status} className="bg-gray-700 p-4 rounded-lg">
//                                       <h4 className="font-semibold mb-2 text-blue-300">{status}</h4>
//                                       {tasks
//                                         .filter(t => t.missionId && missions.find(m => m.id === t.missionId)?.project_id === project.id && t.status === status)
//                                         .map(task => (
//                                           <Card key={task.id} className="mb-2 p-2 bg-gray-600 border-gray-500">
//                                             <p className="text-sm text-gray-200">{task.name}</p>
//                                             <Badge variant="outline" className="mt-1 text-xs">{task.status}</Badge>
//                                           </Card>
//                                         ))}
//                                     </div>
//                                   ))}
//                                 </div>
//                               </AccordionContent>
//                             </AccordionItem>
//                           </Accordion>
//                         ))}
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }