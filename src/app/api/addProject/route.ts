import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { userId, project } = await request.json();
        console.log(userId, project);
        if (!userId || !project) {
            return NextResponse.json({ error: "Missing userId or project data" }, { status: 400 });
        }

        const newProject = await prisma.project.create({
            data: {
                ...project,
                userId,
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