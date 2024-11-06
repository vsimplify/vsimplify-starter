import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from '@/types/supabase';
import { convertToPortfolio } from '@/types/portfolio';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export const revalidate = 0;

export default async function PortfolioPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch portfolios with their projects and missions
  const { data: portfoliosData, error } = await supabase
    .from("portfolios")
    .select(`
      // *,
      // projects:Project(
      //   *,
      //   missions:Mission(*)
      // )
      *,
      projects:Project(
        *,
        missions:Mission(
          *,
          _AgentToMission(
            A,
            B
          )
        )
      )
    `);

  if (error) {
    console.error("Error fetching portfolios:", error);
    return <div>Failed to load portfolios.{error.message}</div>;
  }

  const portfolios = portfoliosData?.map(convertToPortfolio) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Portfolios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{portfolio.title}</h2>
                <p className="text-gray-600 mb-4">{portfolio.description}</p>
              </div>
              <Badge variant={portfolio.status === 'active' ? 'default' : 'secondary'}>
                {portfolio.status}
              </Badge>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium">{portfolio.progress || 0}%</span>
              </div>
              <Progress value={portfolio.progress || 0} />
            </div>

            {/* Projects Count */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Projects</span>
              <span className="font-medium">{portfolio.projects?.length || 0}</span>
            </div>

            {/* Project Tags */}
            {portfolio.projects && portfolio.projects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {portfolio.projects.slice(0, 3).map((project) => (
                  <Badge key={project.id} variant="outline" className="text-xs">
                    {project.title}
                  </Badge>
                ))}
                {portfolio.projects.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{portfolio.projects.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Domain and Initiative */}
            <div className="mt-4 flex flex-wrap gap-2">
              {portfolio.domainId && (
                <Badge variant="secondary" className="text-xs">
                  Domain: {portfolio.domainId}
                </Badge>
              )}
              {portfolio.initiative && (
                <Badge variant="secondary" className="text-xs">
                  {portfolio.initiative}
                </Badge>
              )}
            </div>

            {/* Created Date */}
            <div className="mt-4 text-xs text-gray-500">
              Created {formatDistanceToNow(new Date(portfolio.created_at), { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

