"use client";
import React, { useState } from "react";
import { truckSchema } from "../app/ValidationSchemas/truck";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Truck } from "@prisma/client";

type TruckFormData = z.infer<typeof truckSchema>;
interface Props {
  truck?: Truck;
}

const TruckForm = ({ truck }: Props) => {
  console.log(truck, "truck111");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<TruckFormData>({
    resolver: zodResolver(truckSchema),
  });

  async function onSubmit(values: z.infer<typeof truckSchema>) {
    try {
      setIsSubmitting(true);
      if (truck) {
        await axios.patch("/api/truck/" + truck.id, values);
      } else {
        await axios.post("/api/truck/", values);
      }
      setIsSubmitting(false);
      router.push("/truck");
      router.refresh();
    } catch (error) {
      setError("error");

      setIsSubmitting(false);
    }
  }
  return (
    <div className="rounded-md  border p-4  ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            defaultValue={truck?.number_plate}
            name="number_plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number plate</FormLabel>
                <FormControl>
                  <Input placeholder="number plate" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            defaultValue={truck?.description}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <div className="flex w-full mb-4">
            <FormField
              control={form.control}
              defaultValue={truck?.status || ""}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number plate</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={truck?.status}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="pt-2" disabled={isSubmitting}>
            {truck ? "Actualizar" : "Agregar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TruckForm;
