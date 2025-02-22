"use client";

import { DeleteUser } from "@/action/UserDasAction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IConfirmDelete {
  id: string;
}

export function ConfirmDelete({ id }: IConfirmDelete) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await DeleteUser(id);
      toast.warning("Account deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete account");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md mx-auto p-6 rounded-lg shadow-lg ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-red-600 dark:text-red-400">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm ">
            This action <span className="font-semibold">cannot be undone.</span>{" "}
            It will permanently delete your account and remove all your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-end space-x-3">
          <AlertDialogCancel className="px-4 py-2 text-sm">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm  "
              onClick={handleDelete}
            >
              Yes, Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
