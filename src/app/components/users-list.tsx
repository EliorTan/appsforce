
"use client";

import { User } from "@/types/user";
import { UserCard } from "./user-card";

interface UsersListProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
  onDeleteUser: (userId: string) => void;
}

export const UsersList = ({ 
  users, 
  onUpdateUser, 
  onDeleteUser 
}: UsersListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          onUpdateUser={onUpdateUser}
          onDeleteUser={onDeleteUser}
          allUsers={users}
        />
      ))}
    </div>
  );
};