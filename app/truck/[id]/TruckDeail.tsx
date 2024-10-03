import { Truck } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TruckStatus from "@/components/TruckStatus";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "./DeleteButton";
interface props {
  truck: Truck;
}
const TruckDeail = ({ truck }: props) => {
  return (
    <div className="lg:grid lg:grid-cols-6">
      <Card className="    lg:col-span-4">
        <CardHeader>
          <div className="flex  between justify-between">
            <CardTitle>{truck.description}</CardTitle>
            <TruckStatus status={truck.status}></TruckStatus>
          </div>
          <CardDescription>{truck.number_plate}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-3">
            <Link
              href={`/truck/edit/${truck.id}`}
              className={`${buttonVariants({ variant: "default" })}`}
            >
              Edit Truck
            </Link>
            <DeleteButton id={truck.id}></DeleteButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TruckDeail;
