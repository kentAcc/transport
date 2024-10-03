import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

interface SearchParams {
  page: string;
}
const Users = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 20;
  const userCount = await prisma.user.count();
  const page = parseInt(searchParams.page) || 1;
  const users = await prisma.user.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <Link href="/user/new" className={buttonVariants({ variant: "default" })}>
        New User
      </Link>
      <DataTable users={users}></DataTable>
      <Pagination
        itemCount={userCount}
        pageSize={pageSize}
        currentPage={page}
      ></Pagination>
    </div>
  );
};

export default Users;
