import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import React from "react";

interface Params {
  params: { id: string };
}

const page = async ({ params }: Params) => {
  const userExist = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!userExist) return <p className="text-destructive">not Found</p>;
  return <UserForm user={userExist}>page</UserForm>;
};

export default page;
