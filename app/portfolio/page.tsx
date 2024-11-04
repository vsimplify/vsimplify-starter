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
      *,
      projects:Project(
        *,
        missions:Mission(*)
      )
    `);

  if (error) {
    console.error("Error fetching portfolios:", error);
    return <div>Failed to load portfolios.</div>;
  }

  const portfolios = portfoliosData?.map(convertToPortfolio) || [];

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Portfolios</h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and initiatives
          </p>
        </div>
        <Link href="/portfolio/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Portfolio
          </Button>
        </Link>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{portfolio.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {portfolio.description}
                    </p>
                  </div>
                  {portfolio.status && (
                    <Badge variant={portfolio.status === 'active' ? 'default' : 'secondary'}>
                      {portfolio.status}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Section */}
                  {typeof portfolio.progress === 'number' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{portfolio.progress}%</span>
                      </div>
                      <Progress value={portfolio.progress} className="h-2" />
                    </div>
                  )}

                  {/* Projects Summary */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="font-medium">{portfolio.projects.length}</span>
                  </div>

                  {/* Project Tags */}
                  {portfolio.projects.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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

                  {/* Created Date */}
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(portfolio.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Add Portfolio Card */}
        <Link href="/portfolio/create">
          <Card className="hover:shadow-lg transition-all cursor-pointer h-full flex items-center justify-center border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">Create New Portfolio</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Empty State */}
      {portfolios.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No portfolios yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first portfolio to start managing your projects
          </p>
          <Link href="/portfolio/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Portfolio
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

