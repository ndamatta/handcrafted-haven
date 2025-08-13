"use server";

import { AuthError } from "next-auth";
import {
  addReview,
  createUser,
  NewUser,
  createProduct,
  updateProduct,
  deleteProduct,
  updateSellerProfile,
} from "@/lib/queries";
import { z } from "zod";
import { auth, signIn, signOut } from "@/../auth";
import { revalidatePath } from "next/cache";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

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
  user_name: string,
  comment: string,
  rating: number
) {
  await addReview(productId, user_name, comment, rating);
}

// Create a new product for the authenticated seller
// Generic product action result. For creation we also optionally carry back the field values
// so the form can preserve user input after a validation / server error.
export type ProductResult = {
  ok: boolean;
  message: string;
  values?: {
    name: string;
    description: string;
    price: string; // keep as string to avoid losing user formatting
    image: string;
    category: string;
    featured?: string;
  };
};

// Upsert (create or update) product depending on presence of id
export async function upsertProductAction(
  prevState: ProductResult | undefined,
  formData: FormData
): Promise<ProductResult> {
  const emptyValues = {
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  };
  const session = await auth();
  if (!session?.user?.id) {
    return {
      ok: false,
      message: "You must be signed in.",
      values: emptyValues,
    };
  }
  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : undefined;
  const raw = {
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    price: String(formData.get("price") || ""),
    image: String(formData.get("image") || ""),
    category: String(formData.get("category") || ""),
    featured: formData.get("featured") ? "on" : "", // checkbox semantics
  };
  const schema = z.object({
    name: z.string().min(1, "Name required"),
    description: z.string().min(1, "Description required"),
    price: z
      .string()
      .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0, "Bad price"),
    image: z.string().url("Invalid image URL"),
    category: z.string().min(1, "Category required"),
    featured: z.string().optional(),
  });
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues.map((i) => i.message).join(", "),
      values: raw,
    };
  }
  try {
    if (id) {
      const { oldSlug, newSlug } = await updateProduct({
        id,
        sellerId: session.user.id,
        name: parsed.data.name,
        description: parsed.data.description,
        price: Number(parsed.data.price),
        image: parsed.data.image,
        category: parsed.data.category,
        featured: !!parsed.data.featured,
      });
      if (oldSlug !== newSlug) revalidatePath(`/products/${oldSlug}`);
      revalidatePath(`/products/${newSlug}`);
      revalidatePath("/seller-portal/products");
      return { ok: true, message: "Updated.", values: emptyValues };
    } else {
      await createProduct({
        name: parsed.data.name,
        description: parsed.data.description,
        price: Number(parsed.data.price),
        image: parsed.data.image,
        category: parsed.data.category,
        sellerId: session.user.id,
        featured: !!parsed.data.featured,
      });
      revalidatePath("/seller-portal/products");
      revalidatePath("/products");
      return { ok: true, message: "Created.", values: emptyValues };
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upsert failed";
    return { ok: false, message: msg, values: raw };
  }
}

export async function deleteProductAction(
  prevState: ProductResult | undefined,
  formData: FormData
): Promise<ProductResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "You must be signed in." };
  }
  const id = Number(formData.get("id"));
  if (!id) return { ok: false, message: "Missing id" };
  try {
    await deleteProduct({ id, sellerId: session.user.id });
    revalidatePath("/seller-portal/products");
    revalidatePath("/products");
    return { ok: true, message: "Deleted." };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Delete failed";
    return { ok: false, message: msg };
  }
}

// --------------- Seller Profile ---------------
export type SellerProfileResult = {
  ok: boolean;
  message: string;
  values?: {
    name: string;
    biography: string;
    location: string;
    years_of_experience: string; // keep as string for form
    profile_picture: string;
  };
};

export async function updateSellerProfileAction(
  prevState: SellerProfileResult | undefined,
  formData: FormData
): Promise<SellerProfileResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "You must be signed in." };
  }
  const raw = {
    name: String(formData.get("name") || ""),
    biography: String(formData.get("biography") || ""),
    location: String(formData.get("location") || ""),
    years_of_experience: String(formData.get("years_of_experience") || ""),
    profile_picture: String(formData.get("profile_picture") || ""),
  };
  const schema = z.object({
    name: z.string().min(1, "Name required"),
    biography: z.string().max(2000).optional(),
    location: z.string().max(255).optional(),
    years_of_experience: z
      .string()
      .optional()
      .refine(
        (v) =>
          v === undefined ||
          v === "" ||
          (!Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 100),
        "Years of experience must be between 0 and 100"
      ),
    profile_picture: z
      .string()
      .url("Invalid image URL")
      .or(z.literal(""))
      .optional(),
  });
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues.map((i) => i.message).join(", "),
      values: raw,
    };
  }
  try {
    await updateSellerProfile(session.user.id, {
      name: parsed.data.name,
      biography: raw.biography || null,
      location: raw.location || null,
      years_of_experience: raw.years_of_experience
        ? Number(raw.years_of_experience)
        : null,
      profile_picture: raw.profile_picture || null,
    });
    // Revalidate account page
    revalidatePath("/seller-portal/account");
    return {
      ok: true,
      message: "Profile updated",
      values: {
        name: parsed.data.name,
        biography: raw.biography,
        location: raw.location,
        years_of_experience: raw.years_of_experience,
        profile_picture: raw.profile_picture,
      },
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Update failed";
    return { ok: false, message: msg, values: raw };
  }
}
