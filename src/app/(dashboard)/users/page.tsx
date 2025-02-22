"use client";
import { GetAllUsers } from "@/action/UserDasAction";
import UserCard from "@/components/CustomComponents/UserCard";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import FilterButton from "@/components/CustomComponents/FilterButton";

const Users = () => {
  const [AllUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  console.log("search", search);
  console.log("debouncedSearch", debouncedSearch);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedSearch]);

  useEffect(() => {
    async function FetchUsers() {
      const users = await GetAllUsers(search);
      console.log(users);
      setAllUsers(users);
    }
    FetchUsers();
  }, [search]);

  return (
    <div className=" mx-auto p-4 w-full h-full">
      <div className="flex justify-between items-center m-2 p-2 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          All Users
        </h2>
        <Input
          type="text"
          placeholder="Search Users"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          className="max-w-md rounded-lg"
        />
        <FilterButton />
      </div>

      {/* User Cards Grid */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {AllUsers.length > 0 ? (
          AllUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="flex items-center justify-center w-full ">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No Users Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
