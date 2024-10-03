import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import React from "react";

import Link from "next/link";

interface Props {
  users: User[];
}

const DataTable = ({ users }: Props) => {
  return (
    <div className="min-w-full border border-gray-50 rounded-lg overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary  hover:bg-secondary">
            <TableHead>Number Plate</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id} data-href="/">
                <TableCell>
                  <Link href={`/user/${user.id}`}> {user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
