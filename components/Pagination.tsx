"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  if (!currentPage) currentPage = 1;
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const PageChange = (page: number) => {
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <div>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => PageChange(1)}
      >
        <ChevronFirst></ChevronFirst>
      </Button>
      <Button
        variant="outline"
        onClick={() => PageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft></ChevronLeft>
      </Button>
      <Button
        variant="outline"
        onClick={() => PageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <ChevronRight></ChevronRight>
      </Button>
      <Button
        variant="outline"
        disabled={currentPage === pageCount}
        onClick={() => PageChange(pageCount)}
      >
        <ChevronLast></ChevronLast>
      </Button>
      <div>
        page {currentPage} of {pageCount}
      </div>
    </div>
  );
};

export default Pagination;
