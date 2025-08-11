import { auth } from "../../../../auth";

export default async function AccountPage() {
  const session = await auth();
  const name = session?.user?.name || "Your profile";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        {name}
      </h1>
      <section className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-6">
        <h2 className="font-semibold mb-2 text-slate-800 dark:text-white">
          TODO
        </h2>
      </section>
    </div>
  );
}
