import { commentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../../auth/authOptions";

export async function POST(
  request: NextRequest,
  params: { params: Promise<{ issueId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { userId, issueId, comment } = body;

  const user = prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const issue = prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 400 });
  }

  const newComment = await prisma.comment.create({
    data: { comment, issueId, userId },
  });

  return NextResponse.json(newComment, { status: 201 });
}
