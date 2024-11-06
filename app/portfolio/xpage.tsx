import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Project } from '@/types/portfolio';

export default async function PortfolioPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch portfolios with their projects
  const { data: portfolios, error } = await supabase
    .from('portfolios')
    .select(`
      *,
      projects:Project (
        id,
        title,
        description,
        status,
        progress
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching portfolios:", error);
    return <div>Error loading portfolios</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Portfolios</h1>
      <div className="grid gap-6">
        {portfolios?.map((portfolio) => (
          <div key={portfolio.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{portfolio.title}</h2>
                <p className="text-gray-600 mt-1">{portfolio.description}</p>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${
                portfolio.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {portfolio.status}
              </span>
            </div>

            {/* Projects Section */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Projects ({portfolio.projects?.length || 0})</h3>
              <div className="space-y-3">
                {portfolio.projects?.map((project: Project) => (
                  <div key={project.id} className="bg-gray-50 rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    {project.progress !== null && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 rounded-full h-2"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {!portfolio.projects?.length && (
                  <p className="text-gray-500 text-sm">No projects yet</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {!portfolios?.length && (
          <p className="text-gray-500 text-center">No portfolios found. Create your first portfolio to get started!</p>
        )}
      </div>
    </div>
  );
}

