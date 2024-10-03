import prisma from "@/prisma/db";
import { truckSchema } from "../../ValidationSchemas/truck";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = truckSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTruck = await prisma.truck.create({
    data: { ...body },
  });

  return NextResponse.json(newTruck, { status: 201 });
}
