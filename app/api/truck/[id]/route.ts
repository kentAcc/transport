import prisma from "@/prisma/db";
import { truckSchema } from "../../../ValidationSchemas/truck";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}







export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = truckSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const truck = await prisma.truck.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!truck) {
    return NextResponse.json(truck, { status: 404 });
  }

  const updateTruck = await prisma.truck.update({
    where: { id: truck.id },
    data: { ...body },
  });

  return NextResponse.json(updateTruck, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const truck = await prisma.truck.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!truck) {
    return NextResponse.json(truck, { status: 404 });
  }

  await prisma.truck.delete({
    where: { id: truck.id },
  });

  return NextResponse.json({ message: "truck deleted" });
}
