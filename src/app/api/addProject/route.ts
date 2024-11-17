import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { userId, project } = await request.json();
        if (!userId || !project) {
            return NextResponse.json({ error: "Missing userId or project data" }, { status: 400 });
        }

        const projectId = `${userId}-${project.name}-${Date.now()}-${randomUUID()}`;
        const newProject = await prisma.project.create({
            data: {
                ...project,
                userId,
                id: projectId,
            },
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                projects: {
                    connect: { id: newProject.id },
                },
            },
        });

        return NextResponse.json({ message: "Project added successfully", projectId: newProject.id }, { status: 200 });
    } catch (error) {
        console.error("Error adding project:", error);
        return NextResponse.error();
    }
}