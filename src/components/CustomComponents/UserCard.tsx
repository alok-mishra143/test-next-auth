import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";
import { GetSession } from "@/action/Useraction";
import { ConfirmDelete } from "./ConformDelete";
import EditProfile from "./EditProfile";

interface User {
  id: string;
  name: string;
  email: string;
  gender: string | null;
  profileImage?: string | null;
  phone: string | null;
  department: string | null;
  class: string | null;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  address: string | null;
  isVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserCard = async ({ user }: { user: User }) => {
  const formatDate = (date: Date) => date.toLocaleDateString();
  const session = await GetSession();

  // Don't render if the user is the logged-in user
  if (!session) return null;
  if (session?.user.id === user.id) return null;

  return (
    <Card className="sm:w-[350px] w-full mx-auto p-4 m-2 shadow-lg rounded-lg border-2 border-dotted border-gray-400 border-opacity-30">
      {/* Card Header with Avatar and User Info */}
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.profileImage || ""} alt="Profile Image" />
            <AvatarFallback>{user.name ? user.name[0] : "?"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
              {user.name || "Nill"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
              {user.role}
            </CardDescription>
          </div>
        </div>

        {/* Verified Badge */}
        <Badge
          className={`rounded-full text-xs font-medium px-2 py-0.5 flex items-center gap-1 ${
            user.isVerified
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          }`}
        >
          {user.isVerified ? (
            <>
              <CheckCircle className="w-3 h-3" /> Verified
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3" /> Not Verified
            </>
          )}
        </Badge>
      </CardHeader>

      <Separator className="dark:border-gray-600 mt-2 mb-2" />

      {/* Card Content with User Details */}
      <CardContent className="space-y-3">
        {[
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phone },
          { label: "Department", value: user.department },
          { label: "Class", value: user.class },
          { label: "Address", value: user.address },
          { label: "Gender", value: user.gender },
          {
            label: "Onboarding Completed",
            value: user.onboardingCompleted ? "Yes" : "No",
          },
          { label: "Created At", value: formatDate(user.createdAt) },
          { label: "Updated At", value: formatDate(user.updatedAt) },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <Label className="text-gray-600 dark:text-gray-400 text-sm">
              {label}
            </Label>
            <span className="text-gray-800 dark:text-gray-200 text-sm">
              {value || "Nill"}
            </span>
          </div>
        ))}
      </CardContent>

      <Separator className="dark:border-gray-600" />

      {/* Card Footer with Onboarding Status */}
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between px-5 py-4  gap-3 ">
        {/* Action Buttons (Edit + Delete) */}
        <div className="flex items-center gap-2">
          <EditProfile
            userFrom={user}
            role={session.user.role as "STUDENT" | "ADMIN" | "TEACHER"}
          />

          <ConfirmDelete id={user.id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
