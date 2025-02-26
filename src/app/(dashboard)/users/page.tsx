"use client";
import { GetAllUsers } from "@/action/UserDasAction";
import UserCard from "@/components/CustomComponents/UserCard";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import FilterButton from "@/components/CustomComponents/FilterButton";

const Users = () => {
  const [AllUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState<number>(10);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [selectedVerified, setSelectedVerified] = React.useState<string[]>([]);
  const [selectedSort, setSelectedSort] = React.useState<{
    value: string;
    sort: string;
  }>({ value: "createdAt", sort: "asc" });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedSearch]);

  useEffect(() => {
    async function FetchUsers() {
      const users = await GetAllUsers({
        search,
        page,
        sort: selectedSort,
        Filters: { roles: selectedRoles, verified: selectedVerified },
      });
      setAllUsers(users);
    }
    FetchUsers();
  }, [search, page, selectedSort, selectedRoles, selectedVerified]);

  return (
    <div className="mx-auto p-4 w-full h-screen overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 w-full sticky top-0 bg-white/80 dark:bg-black/30 backdrop-blur-md z-30 rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          All Users
        </h2>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full md:w-auto gap-2">
          <Input
            type="text"
            placeholder="Search Users"
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="w-full sm:w-64 rounded-lg"
          />
          <Select onValueChange={(e) => setPage(parseInt(e))} defaultValue="10">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Select a Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pages</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FilterButton
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            selectedVerified={selectedVerified}
            setSelectedVerified={setSelectedVerified}
          />
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="flex flex-wrap gap-4 mt-4 items-center justify-center">
        {AllUsers.length > 0 ? (
          AllUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="col-span-full flex items-center justify-center">
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
