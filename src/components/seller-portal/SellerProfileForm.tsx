"use client";
import { useActionState, useEffect, useState } from "react";
import {
  updateSellerProfileAction,
  type SellerProfileResult,
} from "@/lib/actions";

export type SellerProfileEditable = {
  name: string;
  biography: string;
  location: string;
  years_of_experience: string; // stored as string for form
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

  // On validation error, repopulate with returned values
  useEffect(() => {
    if (state.values) {
      setLocal((prev) => ({ ...prev, ...state.values! }));
    }
  }, [state.values]);

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Display Name</label>
        <input
          name="name"
          required
          value={local.name}
          onChange={(e) => setLocal({ ...local, name: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Biography</label>
        <textarea
          name="biography"
          rows={5}
          value={local.biography}
          onChange={(e) => setLocal({ ...local, biography: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          placeholder="Tell buyers about your craft, materials, inspiration..."
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            name="location"
            value={local.location}
            onChange={(e) => setLocal({ ...local, location: e.target.value })}
            placeholder="City, Country"
            className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
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
            className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
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
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="submit"
          disabled={pending}
          className="text-sm font-medium px-4 py-2 rounded-md bg-slate-700 text-white hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Profile"}
        </button>
        {state.message && (
          <span
            className={`${
              state.ok ? "text-green-600" : "text-red-600"
            } text-sm`}
          >
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
