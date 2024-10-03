import prisma from "@/prisma/db";
import React from "react";

import UserDeail from "./UserDeail";
interface Props {
  params: { id: string };
}
const ViewTruck = async ({ params }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) return <p className="text-destructive">not Found</p>;

  return <UserDeail user={user}></UserDeail>;
};

export default ViewTruck;
