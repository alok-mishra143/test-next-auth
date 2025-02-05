import { GetUserById } from "@/action/Useraction";
import OnBoardingFrom from "@/components/CustomComponents/OnBoardingFrom";
import React from "react";

export const dynamic = "force-dynamic";

interface OnboardingProps {
  params: Promise<{ userid: string }>;
}

const Page = async ({ params }: OnboardingProps) => {
  const { userid } = await params;

  const userData = await GetUserById({ userid });

  if (!userData) {
    return (
      <div className="text-center text-red-500 font-bold text-xl p-4 border border-red-500 rounded-md">
        User not found
      </div>
    );
  }

  return (
    <OnBoardingFrom
      UserData={{
        ...userData,
        gender: (userData.gender as "MALE" | "FEMALE" | "OTHERS") ?? "OTHERS",
      }}
    />
  );
};

export default Page;
