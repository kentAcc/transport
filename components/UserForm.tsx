"use client";
import React, { useState } from "react";
import { userSchema } from "../app/ValidationSchemas/user";
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
import { User } from "@prisma/client";

type UserFormData = z.infer<typeof userSchema>;
interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      if (user) {
        await axios.patch("/api/user/" + user.id, values);
      } else {
        await axios.post("/api/user/", values);
      }
      setIsSubmitting(false);
      router.push("/user");
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
            defaultValue={user?.name}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="UserName" {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    required={user ? false : true}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <div className="flex w-full mb-4">
            <FormField
              control={form.control}
              defaultValue={user?.role || ""}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.role}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="USER">USER</SelectItem>{" "}
                      <SelectItem value="CLIENT">CLIENT</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex  gap-3">
            <Button type="submit" className="pt-2" disabled={isSubmitting}>
              {user ? "Actualizar" : "Agregar"}
            </Button>
            <Button
              type="button"
              className="pt-2 "
              onClick={() => router.push("/user")}
              variant="ghost"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default UserForm;
