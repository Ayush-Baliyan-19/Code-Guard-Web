import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { userId, project } = await request.json();
        if (!userId || !project || !project.id) {
            return NextResponse.json({ error: "Missing userId, project data, or project ID" }, { status: 400 });
        }

        // The error suggests that the `User` model has a required relation with the `Project` model.
        // This means you can't simply delete the project without also updating the user's project association.
        // To fix this, you need to first remove the project from the user's list of projects before deleting the project.

        await prisma.user.update({
            where: { id: userId },
            data: {
                projects: {
                    disconnect: { id: project.id },
                },
            },
        });
        await prisma.project.delete({
            where: { id: project.id }
        });

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.error();
    }
}