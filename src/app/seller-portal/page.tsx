import { auth } from "../../../auth";
import { getSellerStats } from "@/lib/queries";
import Link from "next/link";

export default async function SellerPortalPage() {
  const session = await auth();
  const sellerId = session?.user?.id || "";
  const stats = sellerId
    ? await getSellerStats(sellerId)
    : { productCount: 0, reviewCount: 0, averageRating: null };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-500 dark:text-amber-400 drop-shadow-sm">
        Seller Portal
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-prose">
        {session?.user?.name
          ? `Welcome back, ${session.user.name}!`
          : "Manage your listings, track performance and update products."}
      </p>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-5">
          <div className="text-xs uppercase text-slate-500">Products</div>
          <div className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            {stats.productCount}
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-5">
          <div className="text-xs uppercase text-slate-500">Reviews</div>
          <div className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            {stats.reviewCount}
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-5">
          <div className="text-xs uppercase text-slate-500">Avg Rating</div>
          <div className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            {stats.averageRating ? stats.averageRating.toFixed(2) : "—"}
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-5 flex flex-col">
          <h2 className="font-semibold mb-2 text-slate-800 dark:text-white text-sm uppercase tracking-wide">
            Manage Products
          </h2>
          <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 flex-1">
            Create, update and feature your best handcrafted items.
          </p>
          <Link
            href="/seller-portal/products"
            className="mt-auto inline-block text-xs font-medium px-3 py-2 rounded-md bg-slate-700 text-white hover:brightness-110 transition-colors"
          >
            Open Products
          </Link>
        </div>
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-5 flex flex-col">
          <h2 className="font-semibold mb-2 text-slate-800 dark:text-white text-sm uppercase tracking-wide">
            Profile & Story
          </h2>
          <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 flex-1">
            Share your craftsmanship journey and personalize your profile.
          </p>
          <Link
            href="/seller-portal/account"
            className="mt-auto inline-block text-xs font-medium px-3 py-2 rounded-md bg-slate-700 text-white hover:brightness-110 transition-colors"
          >
            Edit Profile
          </Link>
        </div>
        <div className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-5 flex flex-col">
          <h2 className="font-semibold mb-2 text-slate-800 dark:text-white text-sm uppercase tracking-wide">
            Reviews Snapshot
          </h2>
          <p className="text-sm text-slate-600 dark:text-gray-400 flex-1 mb-4">
            Track feedback and quality perception via average rating.
          </p>
          <Link
            href="/products"
            className="mt-auto inline-block text-xs font-medium px-3 py-2 rounded-md bg-slate-700 text-white hover:brightness-110 transition-colors"
          >
            View Storefront
          </Link>
        </div>
      </section>
    </div>
  );
}
