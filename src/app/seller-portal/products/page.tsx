import { auth } from "../../../../auth";
import { getProductsBySellerId } from "@/lib/queries";
import ProductsClient from "./products-client";

export default async function SellerProductsPage() {
  const session = await auth();
  const sellerId = session?.user?.id || "";
  const products = sellerId ? await getProductsBySellerId(sellerId) : [];
  return <ProductsClient initialProducts={products} />;
}
