import { issueStatusSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// const statusMap: Record<string, Status> = {
//     Open: "OPEN",
//     "In Progress": "IN_PROGRESS",
//     Closed: "CLOSED",
// };

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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
