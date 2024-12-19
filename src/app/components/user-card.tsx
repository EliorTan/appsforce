"use client";

import { User } from "@/types/user";
import { useState } from "react";
import { EditUserModal } from "./edit-user-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface UserCardProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
  allUsers: User[];
}

export const UserCard = ({
  user,
  onUpdateUser,
  onDeleteUser,
  allUsers,
}: UserCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    onDeleteUser(user.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="bg-slate-900 rounded-lg shadow-xl overflow-hidden p-8">
        <div className="relative w-32 h-32 mx-auto mb-4 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-gradient" />
          <div className="absolute inset-[3px] bg-slate-900 rounded-full" />
          <img
            src={user.picture.medium}
            alt={user.name.first}
            className="absolute inset-[3px] rounded-full object-cover w-[calc(100%-6px)] h-[calc(100%-6px)]"
          />

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute -right-2 top-0 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="absolute -left-2 top-0 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-1">
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            {user.location.city}, {user.location.country}
          </p>

          <p className="text-slate-400 text-sm mb-6">{user.email}</p>

          <p className="text-slate-400 text-sm">
            {user.location.street.name} {user.location.street.number}
          </p>
        </div>
      </div>

      <EditUserModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={onUpdateUser}
        allUsers={allUsers}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">
                {user.name.first} {user.name.last}
              </span>
              's account and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
