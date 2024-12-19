import * as z from "zod";

export const userFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .nonempty("First name is required"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .nonempty("Last name is required"),
  title: z.string().nonempty("Title is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  street: z.string().nonempty("Street is required"),
  imageUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal(''))
});

export type UserFormValues = z.infer<typeof userFormSchema>;