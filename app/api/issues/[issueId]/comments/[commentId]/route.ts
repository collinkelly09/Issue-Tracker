import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/api/auth/authOptions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ issueId: string; commentId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { issueId, commentId } = await params;

  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(commentId), issueId: parseInt(issueId) },
  });

  if (!comment) {
    return NextResponse.json({ message: "Invalid Comment" }, { status: 404 });
  }

  await prisma.comment.delete({
    where: {
      id: parseInt(commentId),
      issueId: parseInt(issueId),
    },
  });
  return NextResponse.json({});
}
