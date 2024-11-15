import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { userId, project } = await request.json();
        if (!userId || !project || !project.id) {
            return NextResponse.json({ error: "Missing userId, project data, or project ID" }, { status: 400 });
        }

        const updatedProject = await prisma.project.update({
            where: { id: project.id },
            data: {
                ...project,
                userId,
            },
        });

        return NextResponse.json({ message: "Project updated successfully", projectId: updatedProject.id }, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.error();
    }
}