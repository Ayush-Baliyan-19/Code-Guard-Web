"use server"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getServerSession } from "next-auth/next"
import axios from 'axios'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { Project } from "@prisma/client"

const fetchUserProjects = async (userId: string) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/getProjects`, {
    userId 
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
                {project ? (
                  <>
                    <p>Tab Space: {project.tabSize}</p>
                    <p>Use JSDoc: {project.jsdoc ? 'Yes' : 'No'}</p>
                    <p>Use Single Quotes: {project.quotes=='single' ? 'Yes' : 'No'}</p>
                  </>
                ) : (
                  <p>No configuration found</p>
                )}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href={`/projects/${project.name}`}>
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