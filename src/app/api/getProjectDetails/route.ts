import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { projectName } = await request.json();

    if (!projectName) {
      return NextResponse.json({ error: "Missing projectName" }, { status: 400 });
    }

    const project = await prisma.project.findFirst({
      where: { name: projectName },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.error();
  }
}
