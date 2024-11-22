import { userSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
        return NextResponse.json({ error: "User already exists", status: 400 });
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
            name: body.name,
            email: body.email,
            hashedPassword,
        },
    });

    return NextResponse.json({ name: newUser.name, email: newUser.email });
}
