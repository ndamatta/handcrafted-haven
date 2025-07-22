import { signOut } from "@/../auth";
import Header from "@/components/Header";
import NavButton from "@/components/NavButton";

export default function PortalHeader() {
  return (
    <Header>
      <NavButton href="#features">Features</NavButton>
      <NavButton href="#products">Products</NavButton>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 py-2 px-4 text-sm font-medium hover:bg-amber-100 dark:hover:bg-zinc-700 transition-colors"
        >
          Sign Out
        </button>
      </form>
    </Header>
  );
}
