import authOptions from "@/app/api/auth/authOptions";
import { issueStatusSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const validation = issueStatusSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format());
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) {
        return NextResponse.json({ message: "Invalid Issue" }, { status: 400 });
    }

    const updatedStatusIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: { status: body.status },
    });

    return NextResponse.json(updatedStatusIssue);
}
