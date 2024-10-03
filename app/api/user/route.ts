import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/app/ValidationSchemas/user";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (duplicate) {
    console.log(duplicate, "duplicat1");
    return NextResponse.json(
      { message: "Duplicate username" },
      { status: 409 }
    );
  }

  const hasPasswrord = await bcrypt.hash(body.password, 10);
  body.password = hasPasswrord;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
