import { Truck } from "@prisma/client";
import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

const TruckForm = dynamic(() => import("@/components/TruckForm"), {
  ssr: false,
});

const EdiTruck = async ({ params }: Props) => {
  const truck = await prisma?.truck.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!truck) {
    return <p className="text-destructive">Truck not found</p>;
  }
  return <TruckForm truck={truck}></TruckForm>;
};

export default EdiTruck;
