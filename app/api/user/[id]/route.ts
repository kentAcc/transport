import bcrypt from "bcryptjs";
import { userSchema } from "@/app/ValidationSchemas/user";
import prisma from "@/prisma/db";

import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const userFound = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!userFound) {
    return NextResponse.json(userFound, { status: 404 });
  }

  if (body?.password && body?.password != "") {
    body.password = await bcrypt.hash(body.password, 10);
  } else {
    delete body.password;
  }
  const updateUser = await prisma.user.update({
    where: { id: userFound.id },
    data: { ...body },
  });

  return NextResponse.json(updateUser, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json(user, { status: 404 });
  }

  await prisma.truck.delete({
    where: { id: user.id },
  });

  return NextResponse.json({ message: "User deleted" });
}
