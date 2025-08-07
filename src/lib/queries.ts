import postgres from "postgres";
import { ProductType } from "@/components/Product";
import { Review } from "@/components/ProductReview";
import type { User } from "@/lib/definitions";
import bcrypt from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getProductBySlug(slug: string) {
  const result = await sql`
    SELECT * FROM products WHERE slug = ${slug} LIMIT 1
  `;
  return result[0] || null;
}

export async function getAllProducts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<ProductType[]> {
  const offset = (page - 1) * pageSize;
  const result = await sql`
    SELECT * FROM products
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;
  return result.map((row) => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artist_name: row.artist_name,
  }));
}

export async function getReviewsByProductId(
  productId: number
): Promise<Review[]> {
  const result = await sql`
    SELECT user, comment, rating, date FROM reviews WHERE product_id = ${productId} ORDER BY date DESC
  `;

  return result.map((row) => ({
    user: row.user,
    comment: row.comment,
    rating: Number(row.rating),
    date: row.date.toISOString(),
  }));
}

export async function addReview(
  productId: number,
  user: string,
  comment: string,
  rating: number
): Promise<void> {
  await sql`
    INSERT INTO reviews (product_id, user, comment, rating, date)
    VALUES (${productId}, ${user}, ${comment}, ${rating}, NOW())
  `;
}

export async function getTotalProducts(): Promise<number> {
  const result = await sql`SELECT COUNT(*) FROM products`;
  return Number(result[0].count);
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<User | null> {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if a user with this email already exists
  const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (existingUser.length > 0) {
    throw new Error("User already exists");
  }

  // Add the new user to the database
  const result = await sql<User[]>`
    INSERT INTO users (email, name, password)
    VALUES (${email}, ${name}, ${hashedPassword})
    RETURNING id, email, name
  `;

  return result[0] || null;
}
