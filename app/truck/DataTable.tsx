import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Truck } from "@prisma/client";
import React from "react";
import TruckStatus from "../../components/TruckStatus";
import Link from "next/link";

interface Props {
  trucks: Truck[];
}

const DataTable = ({ trucks }: Props) => {
  return (
    <div className="min-w-full border border-gray-50 rounded-lg overflow-hidden mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Number Plate</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trucks &&
            trucks.map((truck) => (
              <TableRow key={truck.id} data-href="/">
                <TableCell>
                  <Link href={`/truck/${truck.id}`}> {truck.number_plate}</Link>
                </TableCell>
                <TableCell>{truck.description}</TableCell>
                <TableCell>
                  <TruckStatus status={truck.status}></TruckStatus>
                </TableCell>
              </TableRow>
            ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
