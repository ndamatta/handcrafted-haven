'use client';
import { useActionState, useEffect, useState } from "react";
import {
  updateSellerProfileAction,
  type SellerProfileResult,
} from "@/lib/actions";

export type SellerProfileEditable = {
  name: string;
  biography: string;
  location: string;
  years_of_experience: string;
  profile_picture: string;
};

export default function SellerProfileForm({
  initial,
}: {
  initial: SellerProfileEditable;
}) {
  const [state, formAction, pending] = useActionState<
    SellerProfileResult,
    FormData
  >(updateSellerProfileAction, { ok: false, message: "", values: initial });
  const [local, setLocal] = useState<SellerProfileEditable>(initial);

  useEffect(() => {
    if (state.values) {
      setLocal((prev) => ({ ...prev, ...state.values! }));
    }
  }, [state.values]);

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Display Name
        </label>
        <input
          name="name"
          required
          value={local.name}
          onChange={(e) => setLocal({ ...local, name: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Biography
        </label>
        <textarea
          name="biography"
          rows={5}
          value={local.biography}
          onChange={(e) => setLocal({ ...local, biography: e.target.value })}
          placeholder="Tell buyers about your craft, materials, inspiration..."
          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Location
          </label>
          <input
            name="location"
            value={local.location}
            onChange={(e) => setLocal({ ...local, location: e.target.value })}
            placeholder="City, Country"
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
            Years of Experience
          </label>
          <input
            name="years_of_experience"
            type="number"
            min={0}
            max={100}
            value={local.years_of_experience}
            onChange={(e) =>
              setLocal({ ...local, years_of_experience: e.target.value })
            }
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Profile Picture URL
        </label>
        <input
          name="profile_picture"
          type="url"
          value={local.profile_picture}
          onChange={(e) =>
            setLocal({ ...local, profile_picture: e.target.value })
          }
          placeholder="https://..."
          className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="submit"
          disabled={pending}
          className="text-sm font-medium px-4 py-2 rounded-md bg-slate-700 hover:brightness-110 disabled:opacity-60 text-white transition-colors"
        >
          {pending ? "Saving..." : "Save Profile"}
        </button>
        {state.message && (
          <span
            className={`${
              state.ok ? "text-green-500" : "text-red-500"
            } text-sm`}
          >
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
