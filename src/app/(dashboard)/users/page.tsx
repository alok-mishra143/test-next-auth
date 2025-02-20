import { GetAllUsers } from "@/action/UserDasAction";
import UserCard from "@/components/CustomComponents/UserCard";
import React from "react";

const Users = async () => {
  const AllUsers = await GetAllUsers();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        All Users
      </h2>

      {/* User Cards Grid */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {AllUsers.length > 1 ? (
          AllUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center col-span-full">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
