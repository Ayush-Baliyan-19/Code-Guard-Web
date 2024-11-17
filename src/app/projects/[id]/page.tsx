'use server'
import React from 'react'
import ProjectComponent from './ProjectComponent'
import axios from 'axios';
import { headers } from "next/headers";

async function getProjectDetails(projectName: string | undefined) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/getProjectDetails`,{projectName});
  const project = res.data.project;
  return project;
}

const Page = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");  
  console.log(
    pathname?.split('/')[2].replace('%20', ' '));
    const project = await getProjectDetails(pathname?.split('/')[2].replace('%20', ' '));

  return (
    <ProjectComponent project={project}/>
  )
}

export default Page