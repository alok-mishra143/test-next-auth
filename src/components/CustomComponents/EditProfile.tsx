/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { userSchema } from "@/lib/zod";
import { updateProfile } from "@/action/UserDasAction";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  gender: string | null;
  profileImage?: string | null;
  phone: string | null;
  department: string | null;
  class: string | null;
  isVerified: boolean;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  address: string | null;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IEditProfile {
  userFrom: User;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

const EditProfile = ({ userFrom, role }: IEditProfile) => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // State to control dialog open/close
  const [loading, setLoading] = useState(false);
  type UserFormData = z.infer<typeof userSchema>;
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: userFrom.name || "",
      email: userFrom.email || "",
      phone: userFrom.phone || "",
      address: userFrom.address || "",
      isVerified: userFrom.isVerified,
      gender: userFrom.gender as "MALE" | "FEMALE" | "OTHERS",
      department: userFrom.department || "",
      class: userFrom.class || "",
      role: userFrom.role || "STUDENT",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      await updateProfile({ id: userFrom.id, data });
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {role == "ADMIN" && (
              <FormField
                control={form.control}
                name="email"
                disabled={role !== "ADMIN"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="test@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Edit is Verified */}
            {role === "ADMIN" && (
              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Isverifed <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value ? "TRUE" : "FALSE"}
                        onValueChange={(value) =>
                          field.onChange(value === "TRUE")
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TRUE">TRUE</SelectItem>
                          <SelectItem value="FALSE">FALSE</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Gender field using Select pattern */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gender <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHERS">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {role === "ADMIN" && (
              <FormField
                control={form.control}
                name="role"
                disabled={role !== "ADMIN"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STUDENT">STUDENT</SelectItem>
                          <SelectItem value="TEACHER">TEACHER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input placeholder="CS101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role field using Select pattern */}

            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{loading ? "Saving..." : "Save"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
