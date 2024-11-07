import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agents',
  description: 'Manage and monitor your AI agents'
}

export default function AIAgentPage() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">AI Agents</h1>
          <p className="text-gray-600 mt-2">Deploy and manage your intelligent agents</p>
        </header>

        {/* Agent Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Processing Agents</h2>
            <p className="opacity-80 mb-4">Specialized in data processing and analysis</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">8 Active</span>
              <span className="bg-blue-400 px-3 py-1 rounded-full text-sm">94% Efficiency</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Learning Agents</h2>
            <p className="opacity-80 mb-4">Focused on model training and optimization</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">5 Active</span>
              <span className="bg-purple-400 px-3 py-1 rounded-full text-sm">87% Accuracy</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Interface Agents</h2>
            <p className="opacity-80 mb-4">Handle user interactions and responses</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">10 Active</span>
              <span className="bg-green-400 px-3 py-1 rounded-full text-sm">98% Uptime</span>
            </div>
          </div>
        </div>

        {/* Agent List */}
        <section className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Deployed Agents</h2>
              <div className="flex space-x-2">
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                  Filter
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Deploy New Agent
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Agent Name</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Performance</th>
                    <th className="text-left py-3 px-4">Last Active</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">AI</span>
                        </div>
                        <span className="font-medium">ImageProcessor-01</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Processing</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                        </div>
                        <span>92%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">2 min ago</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800">Manage</button>
                    </td>
                  </tr>

                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-medium">AI</span>
                        </div>
                        <span className="font-medium">ModelTrainer-03</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">Learning</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">Training</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span>45%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">5 min ago</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800">Manage</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
