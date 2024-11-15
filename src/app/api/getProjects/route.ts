import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


// This should be in a separate utility file to avoid multiple instances
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export async function GET(request: NextRequest) {
  try {
    // Get userId from searchParams
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing or invalid userId" },
        { status: 400 }
      );
    }

    const projects = await db.project.findMany({
      where: { userId },
      include: {
        configuration: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}