"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GetSession, GetUserById } from "@/action/Useraction";
import { signInSchema } from "@/lib/zod";

// Zod schema for login

type FormValues = z.infer<typeof signInSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const session = await GetSession();
    try {
      setLoading(true);
      setServerError(null);
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email: values.email,
        password: values.password,
      });
      console.log("result", result);

      if (result?.error) {
        toast.error("Invalide Crediential or Password"); // Display error message
      } else {
        toast.success("Logged in successfully");
        if (session?.user.id) {
          const userData = await GetUserById({ userid: session?.user.id });
          if (!userData) {
            return (
              <div className="text-center text-red-500 font-bold text-xl p-4 border border-red-500 rounded-md">
                User not found
              </div>
            );
          } else if (userData.onboardingCompleted === false) {
            router.push(`/onboarding/${session?.user.id}`);
          } else if (userData.onboardingCompleted === true) {
            router.push(`/`);
          }
        }

        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await GetSession();
        if (session) {
          router.push(`/`);
        }
      } catch (error) {
        console.error("Session error:", error);
      }
    };
    getSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {serverError && (
                  <p className="text-sm font-medium text-destructive">
                    {serverError}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="underline hover:text-primary"
                >
                  Sign up
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
