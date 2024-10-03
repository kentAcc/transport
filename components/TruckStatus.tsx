import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";
import React from "react";

interface Props {
  status: Status;
}
const statusMap: Record<
  Status,
  {
    label: string;
    color: "bg-red-400" | "bg-blue-400" | "bg-green-400" | "bg-orange-400";
  }
> = {
  ACTIVE: { label: "open", color: "bg-green-400" },
  INACTIVE: { label: "inactive", color: "bg-red-400" },
  OUT: { label: "out", color: "bg-blue-400" },
  DAMAGED: { label: "damaged", color: "bg-orange-400" },
};
const TruckStatus = ({ status }) => {
  return (
    <Badge
      className={`${statusMap[status].color} hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default TruckStatus;
