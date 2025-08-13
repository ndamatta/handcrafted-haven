export type Product = {
  id: number;
  slug: string;
  image: string;
  name: string;
  description: string;
  price: number;
  artisan_name: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  biography?: string | null;
  location?: string | null;
  years_of_experience?: number | null;
  profile_picture?: string | null;
};