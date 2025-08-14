"use client";
import { useActionState, useState, useEffect, useRef } from "react";
import { upsertProductAction, type ProductResult } from "@/lib/actions";

export type EditableProduct = {
  id?: number;
  name: string;
  description: string;
  price: number | string;
  image: string;
  category: string;
  featured?: boolean;
};

const empty: EditableProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  featured: false,
};

export default function ProductUpsertForm({
  editing,
  onClear,
}: {
  editing?: EditableProduct | null;
  onClear: () => void;
}) {
  const [state, formAction, pending] = useActionState<ProductResult, FormData>(
    upsertProductAction,
    {
      ok: false,
      message: "",
      values: {
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      },
    }
  );
  const [local, setLocal] = useState<EditableProduct>(empty);

  // Sync when user clicks Edit
  const prevEditingId = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (editing) {
      // Initialize local state only when switching to a different product (or entering edit mode)
      if (editing.id !== prevEditingId.current) {
        setLocal(editing);
        prevEditingId.current = editing.id;
      }
    } else {
      // No product selected; after a successful submit (create/update) clear the form
      if (state.ok) {
        setLocal(empty);
        prevEditingId.current = undefined;
      }
    }
  }, [editing, state.ok]);

  // If validation failed, keep entered values
  useEffect(() => {
    if (!state.ok && state.values) {
      setLocal((prev) => ({
        ...prev,
        ...state.values!,
        featured: state.values!.featured ? true : prev.featured,
      }));
    }
  }, [state]);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      {local.id && <input type="hidden" name="id" value={local.id} />}
      <div className="sm:col-span-1">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          name="name"
          required
          value={local.name}
          onChange={(e) => setLocal({ ...local, name: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          name="category"
          required
          value={local.category}
          onChange={(e) => setLocal({ ...local, category: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          value={local.description}
          onChange={(e) => setLocal({ ...local, description: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          name="price"
          type="number"
          min={0}
          step="0.01"
          required
          value={local.price}
          onChange={(e) => setLocal({ ...local, price: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          name="image"
          type="url"
          value={local.image}
          onChange={(e) => setLocal({ ...local, image: e.target.value })}
          className="w-full rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center gap-2 sm:col-span-2 pt-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={!!local.featured}
          onChange={(e) => setLocal({ ...local, featured: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 dark:border-zinc-600"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Featured
        </label>
      </div>
      <div className="sm:col-span-2 flex items-center gap-3 flex-wrap">
        <button
          type="submit"
          disabled={pending}
          className="text-sm font-medium px-4 py-2 rounded-md bg-slate-700 text-white hover:brightness-110 disabled:opacity-60"
        >
          {pending
            ? local.id
              ? "Saving..."
              : "Creating..."
            : local.id
            ? "Save changes"
            : "Create product"}
        </button>
        {local.id && (
          <button
            type="button"
            onClick={() => {
              setLocal(empty);
              onClear();
            }}
            className="text-sm font-medium px-4 py-2 rounded-md border border-slate-400 dark:border-zinc-600 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            Clear
          </button>
        )}
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
