export type Product = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  seller: string;
};

export type User = {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
};