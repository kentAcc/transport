import { User } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "./DeleteButton";
interface props {
  user: User;
}
const UserDeail = ({ user }: props) => {
  return (
    <div className="lg:grid lg:grid-cols-6">
      <Card className="    lg:col-span-4">
        <CardHeader>
          <div className="flex  between justify-between">
            <CardTitle>{user.name}</CardTitle>
          </div>
          <CardDescription>{user.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-3">
            <Link
              href={`/user/edit/${user.id}`}
              className={`${buttonVariants({ variant: "default" })}`}
            >
              Edit User
            </Link>
            <DeleteButton id={user.id}></DeleteButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDeail;
