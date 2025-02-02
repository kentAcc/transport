import prisma from "@/prisma/db";
import React from "react";
import TruckDeail from "./TruckDeail";
interface Props {
  params: { id: string };
}
const ViewTruck = async ({ params }: Props) => {
  const truck = await prisma.truck.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!truck) return <p className="text-destructive">not Found</p>;

  return <TruckDeail truck={truck}></TruckDeail>;
};

export default ViewTruck;
