"use server";

import { signIn } from "@/../auth";
import { AuthError } from "next-auth";
import { addReview, createUser, NewUser } from "@/lib/queries";
import { z } from "zod";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type RegisterResult = { ok: boolean; message: string };

export async function registerUser(
  prevState: RegisterResult | undefined,
  formData: FormData
): Promise<RegisterResult> {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!email || !name || !password) {
      throw new Error("All fields are required");
    }

    const parsedData = z
      .object({
        email: z.string().email("Invalid email format"),
        name: z.string().min(1, "Name is required"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
      })
      .safeParse({ email, name, password });

    if (!parsedData.success) {
      const errors = parsedData.error.issues
        .map((issue) => issue.message)
        .join(", ");
      throw new Error(`Validation failed: ${errors}`);
    }

    const user: NewUser | null = await createUser(email, name, password);
    if (!user) {
      return { ok: false, message: "Registration failed." };
    }

    // try auto login
    try {
      await signIn("credentials", {
        email: user.email,
        password,
        redirect: false,
      });
      return { ok: true, message: `Welcome, ${user.name}! Redirecting...` };
    } catch {
      return { ok: true, message: "Registration successful! Please log in." };
    }
  } catch (error) {
    // Normalize error to RegisterResult
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: "Something went wrong." };
  }
}

export async function submitReview(
  productId: number,
  user: string,
  comment: string,
  rating: number
) {
  await addReview(productId, user, comment, rating);
}
