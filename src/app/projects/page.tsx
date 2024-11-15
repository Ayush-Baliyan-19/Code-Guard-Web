import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getServerSession } from "next-auth/next"
import axios from 'axios'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

interface Project {
  id: string;
  name: string;
  configuration?: {
    id: string;
    tabSpace: number;
    useJsDocs: boolean;
    useSemicolons: boolean;
    useSingleQuotes: boolean;
  };
}

const fetchUserProjects = async (userId: string) => {
  const res = await axios.get(`/api/getProjects?userId=${userId}`, {
    params: {
      userId,
    },
  });
  const projects = res.data;
  return projects;
}

export default async function Projects() {
  const session = await getServerSession(authOptions);
  const projects = await fetchUserProjects(session.user.name);

  return (
    <div className='pt-3'>
      <h1 className="text-3xl font-bold mb-4">Your Projects</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: Project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/projects/${project.id}`} className="hover:underline">
                  {project.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {project.configuration ? (
                  <>
                    <p>Tab Space: {project.configuration.tabSpace}</p>
                    <p>Use JSDoc: {project.configuration.useJsDocs ? 'Yes' : 'No'}</p>
                    <p>Use Semicolons: {project.configuration.useSemicolons ? 'Yes' : 'No'}</p>
                    <p>Use Single Quotes: {project.configuration.useSingleQuotes ? 'Yes' : 'No'}</p>
                  </>
                ) : (
                  <p>No configuration found</p>
                )}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href={`/projects/${project.id}`}>
                    Configure
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link href="/projects/new">
            Create New Project
          </Link>
        </Button>
      </div>
    </div>
  )
}