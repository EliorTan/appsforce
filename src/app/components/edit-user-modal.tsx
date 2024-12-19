import { useEffect } from "react";
import { User } from "@/types/user";
import { TextField } from "./ui/text-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormValues } from "@/lib/validations/user";

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  allUsers: User[];
}

export const EditUserModal = ({
  user,
  isOpen,
  onClose,
  onSave,
  allUsers,
}: EditUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: user.name.first,
      lastName: user.name.last,
      title: user.name.title,
      email: user.email,
      city: user.location.city,
      country: user.location.country,
      street: user.location.street.name,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        firstName: user.name.first,
        lastName: user.name.last,
        title: user.name.title,
        email: user.email,
        city: user.location.city,
        country: user.location.country,
        street: user.location.street.name,
      });
    }
  }, [isOpen, user, reset]);

  const onSubmit = (data: UserFormValues) => {
    const isEmailTaken = allUsers.some(
      (u) => u.id !== user.id && u.email === data.email
    );

    if (isEmailTaken) {
      setError("email", {
        type: "manual",
        message: "Email address must be unique",
      });
      return;
    }

    const updatedUser: User = {
      ...user,
      name: {
        title: data.title,
        first: data.firstName,
        last: data.lastName,
      },
      email: data.email,
      location: {
        ...user.location,
        city: data.city,
        country: data.country,
        street: {
          ...user.location.street,
          name: data.street,
        },
      },
    };

    onSave(updatedUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 text-white ">
      <div className="bg-gradient-to-b from-black-800 to-slate-950 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 ">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <TextField
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
            required
          />

          <TextField
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            required
          />

          <TextField
            label="Title"
            {...register("title")}
            error={errors.title?.message}
            required
          />

          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          <TextField
            label="City"
            {...register("city")}
            error={errors.city?.message}
            required
          />

          <TextField
            label="Country"
            {...register("country")}
            error={errors.country?.message}
            required
          />

          <TextField
            label="Street"
            {...register("street")}
            error={errors.street?.message}
            required
          />

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
