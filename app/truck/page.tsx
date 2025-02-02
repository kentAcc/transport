import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

interface SearchParams {
  page: string;
}
const Truck = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 20;
  const truckCount = await prisma.truck.count();
  const page = parseInt(searchParams.page) || 1;
  const trucks = await prisma.truck.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <Link
        href="/truck/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Truck1
      </Link>
      <DataTable trucks={trucks}></DataTable>
      <Pagination
        itemCount={truckCount}
        pageSize={pageSize}
        currentPage={page}
      ></Pagination>
    </div>
  );
};

export default Truck;
