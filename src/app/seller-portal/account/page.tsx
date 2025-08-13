import { auth } from "../../../../auth";
import { getSellerProfile } from "@/lib/queries";
import SellerProfileForm from "@/components/seller-portal/SellerProfileForm";

export default async function AccountPage() {
  const session = await auth();
  const name = session?.user?.name || "Your profile";
  const profile = session?.user?.id
    ? await getSellerProfile(session.user.id)
    : null;

  const initial = {
    name: profile?.name || name,
    biography: profile?.biography || "",
    location: profile?.location || "",
    years_of_experience:
      profile?.years_of_experience != null
        ? String(profile.years_of_experience)
        : "",
    profile_picture: profile?.profile_picture || "",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        {name}
      </h1>
      <section className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-6 space-y-4">
        <div>
          <h2 className="font-semibold mb-1 text-slate-800 dark:text-white text-lg">
            Seller Profile
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Manage how buyers see you. This information appears on your products
            and artisan pages.
          </p>
        </div>
        <SellerProfileForm initial={initial} />
      </section>
    </div>
  );
}
