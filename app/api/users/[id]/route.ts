import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { email } = await params;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return NextResponse.json(user);
}
