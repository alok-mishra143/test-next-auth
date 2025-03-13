"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { onboardingValidationSchema } from "@/lib/zod";
import { Textarea } from "../ui/textarea";
import {
  GetSession,
  OnBoardingSubmit,
  UpdateUserOnboarding,
} from "@/action/Useraction";

type OnBoardingFrom = z.infer<typeof onboardingValidationSchema>;

const OnBoardingFrom = ({ UserData }: UserDataProps) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  //   console.log(UserData);
  const form = useForm<OnBoardingFrom>({
    resolver: zodResolver(onboardingValidationSchema),
    defaultValues: {
      phone: "",
      address: "",
      department: "",
      class: "",
      gender: "MALE",
    },
  });

  const onSubmit = async (data: OnBoardingFrom) => {
    const session = await GetSession();
    setLoading(true);

    try {
      const result = await OnBoardingSubmit({
        id: UserData.id,
        UserData: data,
      });
      toast.success("Onboarding Successfull Completed");
      if (session?.user.id) {
        await UpdateUserOnboarding({ id: session?.user.id });
      }
      router.push("/");

      console.log("result", result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
      throw new Error(`Error in form submission: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const { errors } = form.formState;
  console.log(errors);

  return (
    <div className="flex items-center justify-center min-h-screen  flex-col">
      <h1 className="text-lg font-bold">Please Completed the OnBoarding</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <SelectValue placeholder="Select your gender" />
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
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Department" {...field} />
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
                  <Input placeholder="Enter Your class" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnBoardingFrom;
