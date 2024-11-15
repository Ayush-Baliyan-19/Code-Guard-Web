'use server'
import React from 'react'
import ProjectComponent from './ProjectComponent'
import axios from 'axios';
import { headers } from "next/headers";

async function getProjectDetails(projectId: string | undefined) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/getProjectDetails`,{projectId});
  const project = res.data.project;
  return project;
}

const Page = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");  
  const project = await getProjectDetails(pathname?.split('/')[2]);

  return (
    <ProjectComponent project={project}/>
  )
}

export default Page