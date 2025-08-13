import postgres from "postgres";
import { ProductType } from "@/components/Product";
import { Review } from "@/components/ProductReview";
import type { User, SafeUser } from "@/lib/definitions";
import bcrypt from "bcrypt";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getProductBySlug(
  slug: string
): Promise<ProductType | null> {
  const result = await sql`
    SELECT p.*, u.name AS artisan_name 
    FROM products p
    JOIN users u ON p.seller_id = u.id 
    WHERE p.slug = ${slug} 
    LIMIT 1
  `;

  if (!result[0]) {
    return null;
  }

  const row = result[0];
  return {
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artisan_name: row.artisan_name,
    category: row.category,
  };
}

interface GetAllProductsParams {
  page: number;
  pageSize: number;
  category?: string;
  sort?: string;
}

interface GetAllProductsResult {
  products: ProductType[];
  totalProducts: number;
}

// Updated getAllProducts function with filtering and sorting
export async function getAllProducts({
  page,
  pageSize,
  category,
  sort,
}: GetAllProductsParams): Promise<GetAllProductsResult> {
  const offset = (page - 1) * pageSize;

  // Build the main query based on filters and sorting
  let productsQuery;
  let countQuery;

  if (category) {
    countQuery = sql`SELECT COUNT(*) FROM products WHERE category = ${category}`;

    if (sort === "price-low-high") {
      productsQuery = sql`
        SELECT p.*, u.name AS artisan_name 
        FROM products p
        JOIN users u ON p.seller_id = u.id
        WHERE p.category = ${category}
        ORDER BY p.price ASC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
    } else if (sort === "price-high-low") {
      productsQuery = sql`
        SELECT p.*, u.name AS artisan_name 
        FROM products p
        JOIN users u ON p.seller_id = u.id
        WHERE p.category = ${category}
        ORDER BY p.price DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
    } else {
      productsQuery = sql`
        SELECT p.*, u.name AS artisan_name 
        FROM products p
        JOIN users u ON p.seller_id = u.id
        WHERE p.category = ${category}
        ORDER BY p.id DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
    }
  } else {
    countQuery = sql`SELECT COUNT(*) FROM products`;

    if (sort === "price-low-high") {
      productsQuery = sql`
        SELECT p.*, u.name AS artisan_name 
        FROM products p
        JOIN users u ON p.seller_id = u.id
        ORDER BY p.price ASC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
    } else if (sort === "price-high-low") {
      productsQuery = sql`
        SELECT p.*, u.name AS artisan_name 
        FROM products p
        JOIN users u ON p.seller_id = u.id
        ORDER BY p.price DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
    } else {
      productsQuery = sql`
        SELECT p.*, u.name AS artisan_name 
        FROM products p
        JOIN users u ON p.seller_id = u.id
        ORDER BY p.id DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
    }
  }

  try {
    // Execute both queries
    const [productsResult, countResult] = await Promise.all([
      productsQuery,
      countQuery,
    ]);

    const products = productsResult.map((row) => ({
      id: row.id,
      slug: row.slug,
      image: row.image,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      artisan_name: row.artisan_name,
      category: row.category,
    }));

    const totalProducts = Number(countResult[0].count);

    return {
      products,
      totalProducts,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      totalProducts: 0,
    };
  }
}

// New function to get all unique categories
export async function getProductCategories(): Promise<string[]> {
  try {
    const result = await sql`
      SELECT DISTINCT category 
      FROM products 
      WHERE category IS NOT NULL AND category != ''
      ORDER BY category ASC
    `;

    return result.map((row) => row.category);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<ProductType[]> {
  const searchTerm = `%${query}%`;
  const result = await sql`
    SELECT p.*, u.name AS artisan_name
    FROM products p
    JOIN users u ON p.seller_id = u.id
    WHERE p.name ILIKE ${searchTerm} 
       OR p.description ILIKE ${searchTerm} 
       OR u.name ILIKE ${searchTerm}
    ORDER BY p.name ASC
  `;
  return result.map((row) => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artisan_name: row.artisan_name,
    category: row.category,
  }));
}

export async function getProductsByArtist(
  artisanName: string
): Promise<ProductType[]> {
  const result = await sql`
    SELECT p.*, u.name AS artisan_name
    FROM products p
    JOIN users u ON p.seller_id = u.id
    WHERE u.name = ${artisanName}
    ORDER BY p.id DESC
  `;
  return result.map((row) => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artisan_name: row.artisan_name,
    category: row.category,
  }));
}

export async function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number
): Promise<ProductType[]> {
  const result = await sql`
    SELECT p.*, u.name AS artisan_name
    FROM products p
    JOIN users u ON p.seller_id = u.id
    WHERE p.price >= ${minPrice} AND p.price <= ${maxPrice}
    ORDER BY p.price ASC
  `;
  return result.map((row) => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artisan_name: row.artisan_name,
    category: row.category,
  }));
}

export async function getRecentProducts(
  limit: number = 8
): Promise<ProductType[]> {
  const result = await sql`
    SELECT p.*, u.name AS artisan_name
    FROM products p
    JOIN users u ON p.seller_id = u.id
    ORDER BY p.id DESC 
    LIMIT ${limit}
  `;
  return result.map((row) => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artisan_name: row.artisan_name,
    category: row.category,
  }));
}

export async function getReviewsByProductId(
  productId: number
): Promise<Review[]> {
  const result = await sql`
    SELECT user_name, comment, rating, date 
    FROM reviews 
    WHERE product_id = ${productId} 
    ORDER BY date DESC
  `;
  return result.map((row) => ({
    user_name: row.user_name,
    comment: row.comment,
    rating: Number(row.rating),
    date: row.date.toISOString(),
  }));
}

export async function addReview(
  productId: number,
  user_name: string,
  comment: string,
  rating: number
): Promise<void> {
  await sql`
    INSERT INTO reviews (product_id, user_name, comment, rating, date)
    VALUES (${productId}, ${user_name}, ${comment}, ${rating}, NOW())
  `;
}

export async function getTotalProducts(category?: string): Promise<number> {
  try {
    let result;
    if (category) {
      result =
        await sql`SELECT COUNT(*) FROM products WHERE category = ${category}`;
    } else {
      result = await sql`SELECT COUNT(*) FROM products`;
    }
    return Number(result[0].count);
  } catch (error) {
    console.error("Error getting total products:", error);
    return 0;
  }
}

export async function getProductStats() {
  const result = await sql`
    SELECT 
      COUNT(*) as total_products,
      COUNT(DISTINCT seller_id) as total_artists,
      AVG(price) as avg_price,
      MIN(price) as min_price,
      MAX(price) as max_price
    FROM products
  `;
  return result[0];
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

export type NewUser = Pick<User, "id" | "email" | "name">;

export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<NewUser | null> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser =
    await sql`SELECT 1 FROM users WHERE email = ${email} LIMIT 1`;
  if (existingUser.length > 0) {
    throw new Error(`User with email: ${email} already exists`);
  }

  const result = await sql<NewUser[]>`
    INSERT INTO users (email, name, password)
    VALUES (${email}, ${name}, ${hashedPassword})
    RETURNING id, email, name
  `;

  return result[0] || null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function getProductsBySellerId(
  sellerId: string
): Promise<ProductType[]> {
  const result = await sql`
    SELECT p.*, u.name AS artisan_name
    FROM products p
    JOIN users u ON p.seller_id = u.id
    WHERE p.seller_id = ${sellerId}
    ORDER BY p.id DESC
  `;
  return result.map((row) => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artisan_name: row.artisan_name,
    category: row.category,
    featured: row.featured ?? false,
  }));
}

type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
  featured?: boolean;
};

export async function createProduct(input: CreateProductInput): Promise<void> {
  const baseSlug = slugify(input.name);
  let slug = baseSlug;
  const existing = await sql`
    SELECT 1 FROM products WHERE slug = ${slug} LIMIT 1
  `;
  if (existing.length > 0) {
    const suffix = Math.random().toString(36).slice(2, 8);
    slug = `${baseSlug}-${suffix}`;
  }
  await sql`
    INSERT INTO products (slug, image, name, description, price, seller_id, category, featured)
    VALUES (
      ${slug},
      ${input.image},
      ${input.name},
      ${input.description},
      ${input.price},
      ${input.sellerId},
      ${input.category},
      ${input.featured ?? false}
    )
  `;
}

export async function updateProductDescription({
  id,
  description,
  sellerId,
}: {
  id: number;
  description: string;
  sellerId: string;
}): Promise<void> {
  const updated = await sql<{ id: number }[]>`
    UPDATE products
    SET description = ${description}
    WHERE id = ${id} AND seller_id = ${sellerId}
    RETURNING id
  `;
  if (updated.length === 0) {
    throw new Error(
      "Product not found or you do not have permission to edit it."
    );
  }
}

export async function updateProduct({
  id,
  sellerId,
  name,
  description,
  price,
  image,
  category,
  featured,
}: {
  id: number;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}): Promise<{ newSlug: string; oldSlug: string }> {
  const current = await sql<{ slug: string }[]>`
    SELECT slug FROM products WHERE id = ${id} AND seller_id = ${sellerId} LIMIT 1
  `;
  if (current.length === 0) {
    throw new Error("Product not found or not owned by you.");
  }
  const oldSlug = current[0].slug;
  let newSlug = oldSlug;
  if (name) {
    const baseSlug = slugify(name);
    if (baseSlug !== oldSlug) {
      newSlug = baseSlug;
      const exists =
        await sql`SELECT 1 FROM products WHERE slug = ${newSlug} AND id <> ${id} LIMIT 1`;
      if (exists.length > 0) {
        const suffix = Math.random().toString(36).slice(2, 8);
        newSlug = `${baseSlug}-${suffix}`;
      }
    }
  }

  const updated = await sql<{ id: number }[]>`
    UPDATE products
    SET slug = ${newSlug},
        name = ${name},
        description = ${description},
        price = ${price},
        image = ${image},
        category = ${category},
        featured = ${featured ?? false}
    WHERE id = ${id} AND seller_id = ${sellerId}
    RETURNING id
  `;
  if (updated.length === 0) {
    throw new Error("Update failed.");
  }
  return { newSlug, oldSlug };
}

export async function deleteProduct({
  id,
  sellerId,
}: {
  id: number;
  sellerId: string;
}): Promise<void> {
  const deleted = await sql<{ id: number }[]>`
    DELETE FROM products WHERE id = ${id} AND seller_id = ${sellerId} RETURNING id
  `;
  if (deleted.length === 0) {
    throw new Error("Product not found or not owned by you.");
  }
}

export async function getSellerStats(sellerId: string): Promise<{
  productCount: number;
  reviewCount: number;
  averageRating: number | null;
}> {
  const products =
    await sql`SELECT COUNT(*) FROM products WHERE seller_id = ${sellerId}`;
  const productCount = Number(products[0].count);

  const reviews = await sql`
    SELECT COUNT(*) AS count, AVG(rating) AS avg
    FROM reviews r
    JOIN products p ON p.id = r.product_id
    WHERE p.seller_id = ${sellerId}
  `;
  const reviewCount = Number(reviews[0].count || 0);
  const averageRating = reviews[0].avg !== null ? Number(reviews[0].avg) : null;
  return { productCount, reviewCount, averageRating };
}
interface GetAllArtisansParams {
  page: number;
  pageSize: number;
}

interface GetAllArtisansResult {
  artisans: (SafeUser & {
    product_count: number;
    average_rating: number | null;
  })[];
  totalArtisans: number;
}

export async function getAllArtisans({
  page,
  pageSize,
}: GetAllArtisansParams): Promise<GetAllArtisansResult> {
  const offset = (page - 1) * pageSize;

  try {
    // Get artisans with their product count and average rating
    const artisansQuery = sql`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.biography,
        u.location,
        u.years_of_experience,
        u.profile_picture,
        COUNT(p.id) as product_count,
        AVG(r.rating) as average_rating
      FROM users u
      LEFT JOIN products p ON u.id = p.seller_id
      LEFT JOIN reviews r ON p.id = r.product_id
      GROUP BY u.id, u.name, u.email, u.biography, u.location, u.years_of_experience, u.profile_picture
      ORDER BY u.name ASC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;

    // Get total count of artisans (users who have products)
    const countQuery = sql`
      SELECT COUNT(DISTINCT u.id) as count
      FROM users u
      WHERE EXISTS (SELECT 1 FROM products WHERE seller_id = u.id)
    `;

    const [artisansResult, countResult] = await Promise.all([
      artisansQuery,
      countQuery,
    ]);

    const artisans = artisansResult.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      biography: row.biography,
      location: row.location,
      years_of_experience: row.years_of_experience
        ? Number(row.years_of_experience)
        : null,
      profile_picture: row.profile_picture,
      product_count: Number(row.product_count),
      average_rating: row.average_rating ? Number(row.average_rating) : null,
    }));

    const totalArtisans = Number(countResult[0].count);

    return {
      artisans,
      totalArtisans,
    };
  } catch (error) {
    console.error("Error fetching artisans:", error);
    return {
      artisans: [],
      totalArtisans: 0,
    };
  }
}

export async function getArtisanByName(
  name: string
): Promise<
  (SafeUser & { product_count: number; average_rating: number | null }) | null
> {
  try {
    const result = await sql`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.biography,
        u.location,
        u.years_of_experience,
        u.profile_picture,
        COUNT(p.id) as product_count,
        AVG(r.rating) as average_rating
      FROM users u
      LEFT JOIN products p ON u.id = p.seller_id
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE u.name = ${name}
      GROUP BY u.id, u.name, u.email, u.biography, u.location, u.years_of_experience, u.profile_picture
      LIMIT 1
    `;

    if (!result[0]) {
      return null;
    }

    const row = result[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      biography: row.biography,
      location: row.location,
      years_of_experience: row.years_of_experience
        ? Number(row.years_of_experience)
        : null,
      profile_picture: row.profile_picture,
      product_count: Number(row.product_count),
      average_rating: row.average_rating ? Number(row.average_rating) : null,
    };
  } catch (error) {
    console.error("Error fetching artisan:", error);
    return null;
  }
}

// Function to create URL-friendly slug from artisan name
export function createArtisanSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// ---------------- Seller Profile ----------------
export async function getSellerProfile(
  sellerId: string
): Promise<SafeUser | null> {
  try {
    const result = await sql`
      SELECT id, name, email, biography, location, years_of_experience, profile_picture
      FROM users
      WHERE id = ${sellerId}
      LIMIT 1
    `;
    if (!result[0]) return null;
    const row = result[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      biography: row.biography,
      location: row.location,
      years_of_experience:
        row.years_of_experience !== null
          ? Number(row.years_of_experience)
          : null,
      profile_picture: row.profile_picture,
    } as SafeUser;
  } catch (e) {
    console.error("Failed to fetch seller profile", e);
    return null;
  }
}

type UpdateSellerProfileInput = {
  name: string;
  biography?: string | null;
  location?: string | null;
  years_of_experience?: number | null;
  profile_picture?: string | null;
};

export async function updateSellerProfile(
  sellerId: string,
  data: UpdateSellerProfileInput
): Promise<void> {
  const { name, biography, location, years_of_experience, profile_picture } =
    data;
  const updated = await sql<{ id: string }[]>`
    UPDATE users
    SET name = ${name},
  biography = ${biography ?? null},
  location = ${location ?? null},
  years_of_experience = ${years_of_experience ?? null},
  profile_picture = ${profile_picture ?? null}
    WHERE id = ${sellerId}
    RETURNING id
  `;
  if (updated.length === 0) {
    throw new Error("Profile update failed");
  }
}
