"use client";

import { User } from "@/types/user";
import { TextField } from "./ui/text-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormValues } from "@/lib/validations/user";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newUser: User) => void;
  allUsers: User[];
}

export const AddUserModal = ({
  isOpen,
  onClose,
  onAdd,
  allUsers,
}: AddUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "Mr",
      email: "",
      city: "",
      country: "",
      street: "",
      imageUrl: "",
    },
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = (data: UserFormValues) => {
    const isEmailTaken = allUsers.some((u) => u.email === data.email);

    if (isEmailTaken) {
      setError("email", {
        type: "manual",
        message: "Email address must be unique",
      });
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: {
        title: data.title,
        first: data.firstName,
        last: data.lastName,
      },
      email: data.email,
      picture: {
        medium: data.imageUrl || "https://placehold.co/150x150",
      },
      location: {
        city: data.city,
        country: data.country,
        street: {
          name: data.street,
          number: Math.floor(Math.random() * 1000) + 1,
        },
      },
    };

    onAdd(newUser);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-slate-800 to-slate-950 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">Add New User</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <div className="flex justify-center mb-4">
            <img
              src={imageUrl || "https://placehold.co/150x150"}
              alt="User preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/150x150";
              }}
            />
          </div>

          <TextField
            label="Image URL"
            type="url"
            {...register("imageUrl")}
            error={errors.imageUrl?.message}
            placeholder="https://example.com/image.jpg"
          />

          <div className="grid grid-cols-12 gap-3">
            <TextField
              label="Title"
              {...register("title")}
              error={errors.title?.message}
              required
              className="col-span-3"
            />
            <TextField
              label="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
              required
              className="col-span-4"
            />
            <TextField
              label="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
              required
              className="col-span-5"
            />
          </div>
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          <div className="grid grid-cols-12 gap-3">
            <TextField
              label="City"
              {...register("city")}
              error={errors.city?.message}
              required
              className="col-span-3"
            />
            <TextField
              label="Country"
              {...register("country")}
              error={errors.country?.message}
              required
              className="col-span-4"
            />
            <TextField
              label="Street"
              {...register("street")}
              error={errors.street?.message}
              required
              className="col-span-5"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};