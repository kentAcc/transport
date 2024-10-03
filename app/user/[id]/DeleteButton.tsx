"use client";
import React, { use, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [error, setError] = useState();
  const [isdeleting, setIsDeleting] = useState(false);
  const deleteTruck = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/truck/" + id);
      router.push("/truck");
      router.refresh();
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      setError("error when deleting truck");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          className={buttonVariants({ variant: "destructive" })}
        >
          <Button variant="outline" disabled={isdeleting}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Desea eliminar el transporte, esta acción no podrá ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={deleteTruck}
            >
              Confirmar borrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p className="text-destructive">{error}</p>
    </>
  );
};

export default DeleteButton;
