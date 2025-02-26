"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterButtonProps {
  selectedRoles: string[];
  selectedVerified: string[];
  selectedSort: { value: string; sort: string }; // Fixed `name` -> `value`
  setSelectedRoles: (roles: string[]) => void;
  setSelectedVerified: (verified: string[]) => void;
  setSelectedSort: (sort: { value: string; sort: string }) => void; // Fixed setter function type
}

const roles = ["ADMIN", "STUDENT", "TEACHER"];
const verifiedOptions = ["TRUE", "FALSE"];
const sortOptions = [
  { label: "Sort by name (A-Z)", value: "name", sort: "asc" },
  { label: "Sort by name (Z-A)", value: "name", sort: "desc" },
  {
    label: "Sort by created at (Oldest first)",
    value: "createdAt",
    sort: "asc",
  },
  {
    label: "Sort by created at (Newest first)",
    value: "createdAt",
    sort: "desc",
  },
];

export default function FilterButton(params: FilterButtonProps) {
  const {
    setSelectedRoles,
    setSelectedVerified,
    setSelectedSort,
    selectedRoles,
    selectedVerified,
    selectedSort,
  } = params;
  const [open, setOpen] = React.useState(false);

  console.log(selectedRoles, selectedVerified, selectedSort);

  // Calculate total number of active filters
  const activeFiltersCount =
    selectedRoles.length + selectedVerified.length + (selectedSort ? 1 : 0);

  // Function to clear all filters
  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedVerified([]);
    setSelectedSort({ value: "createdAt", sort: "desc" });
  };

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10 px-4 py-2">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 rounded-sm px-1 font-normal"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-4" align="start">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium leading-none">Filters</h4>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Roles Section */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium leading-none">Roles</h5>
              <div className="grid gap-2">
                {roles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`justify-start w-full ${
                        selectedRoles.includes(role)
                          ? "border-primary bg-primary/10"
                          : ""
                      }`}
                      onClick={() => {
                        const newRoles = selectedRoles.includes(role)
                          ? selectedRoles.filter((r) => r !== role)
                          : [...selectedRoles, role];
                        setSelectedRoles(newRoles);
                      }}
                    >
                      {selectedRoles.includes(role) && (
                        <Check className="mr-2 h-4 w-4 shrink-0" />
                      )}
                      {role}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Verification Status Section */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium leading-none">
                Verification Status
              </h5>
              <div className="grid gap-2">
                {verifiedOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`justify-start w-full ${
                        selectedVerified.includes(option)
                          ? "border-primary bg-primary/10"
                          : ""
                      }`}
                      onClick={() => {
                        const newVerified = selectedVerified.includes(option)
                          ? selectedVerified.filter((o) => o !== option)
                          : [...selectedVerified, option];
                        setSelectedVerified(newVerified);
                      }}
                    >
                      {selectedVerified.includes(option) && (
                        <Check className="mr-2 h-4 w-4 shrink-0" />
                      )}
                      {option}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Sort Section */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium leading-none">Sort</h5>
              <Select
                value={`${selectedSort.value}-${selectedSort.sort}`} // Unique value
                onValueChange={(value) => {
                  const [selectedValue, selectedSort] = value.split("-");
                  setSelectedSort({ value: selectedValue, sort: selectedSort });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sortOptions.map((option) => (
                      <SelectItem
                        key={`${option.value}-${option.sort}`}
                        value={`${option.value}-${option.sort}`}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
