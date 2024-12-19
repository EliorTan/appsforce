"use client";

import useRequest from "@/hooks/use-request";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { UsersList } from "./components/users-list";
import { SkeletonList } from "./components/ui/skeleton-list";
import { ErrorMessage } from "./components/ui/error";
import { AddUserModal } from "./components/add-user-modal";
import { Navbar } from "./components/navbar";

export default function Home() {
  const { sendRequest, isLoading, requestErrors } = useRequest();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      await sendRequest({
        url: "https://randomuser.me/api/?results=10",
        method: "GET",
        onSuccess: (response) => {
          const transformedUsers = response.results.map((user: any) => ({
            id: user.login.uuid,
            email: user.email,
            name: {
              title: user.name.title,
              first: user.name.first,
              last: user.name.last,
            },
            picture: {
              medium: user.picture.medium,
            },
            location: {
              city: user.location.city,
              country: user.location.country,
              street: {
                name: user.location.street.name,
                number: user.location.street.number,
              },
            },
          }));
          setUsers(transformedUsers);
          setFilteredUsers(transformedUsers);
        },
      });
    };

    onLoad();
  }, []);

  const handleSearch = (searchTerm: string, filterType: string) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = users.filter((user) => {
      switch (filterType) {
        case "name":
          return (
            user.name.first.toLowerCase().includes(term) ||
            user.name.last.toLowerCase().includes(term) ||
            `${user.name.first} ${user.name.last}`.toLowerCase().includes(term)
          );
        case "email":
          return user.email.toLowerCase().includes(term);
        case "id":
          return user.id.toLowerCase().includes(term);
        case "location":
          return (
            user.location.city.toLowerCase().includes(term) ||
            user.location.country.toLowerCase().includes(term) ||
            user.location.street.name.toLowerCase().includes(term)
          );
        default:
          return true;
      }
    });

    setFilteredUsers(filtered);
  };

  const handleAddUser = (newUser: User) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  if (requestErrors) {
    return <ErrorMessage message={requestErrors[0].message} />;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-950">
        <Navbar
          onAddUser={() => setIsAddModalOpen(true)}
          onSearch={handleSearch}
        />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl text-white font-bold">User Management</h1>
          </div>
          {isLoading ? <SkeletonList /> : null}

          <UsersList
            users={filteredUsers}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />

          <AddUserModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddUser}
            allUsers={users}
          />
        </main>
      </div>
    </>
  );
}
