import { userSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (session)
        return NextResponse.json(
            { message: "Cannot register when signed in" },
            { status: 401 }
        );

    const body = await request.json();

    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
        return NextResponse.json({
            error: "An account with this email already exists",
            status: 400,
        });
    }

    if (body.password !== body.confirmPassword) {
        return NextResponse.json({
            error: "Passwords do not match",
            status: 400,
        });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: `${body.firstName} ${body.lastName}`,
            email: body.email,
            hashedPassword,
        },
    });

    return NextResponse.json(
        { name: newUser.name, email: newUser.email },
        { status: 201 }
    );
}
