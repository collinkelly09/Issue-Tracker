import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { assignedId, title, description, status } = body;

    if (assignedId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedId },
        });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid user" },
                { status: 400 }
            );
        }
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) {
        return NextResponse.json({ message: "Invalid issue" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title,
            description,
            status,
            assignedId,
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) {
        return NextResponse.json({ message: "Invalid Issue" }, { status: 404 });
    }

    await prisma.issue.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({});
}
