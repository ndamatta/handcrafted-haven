"use client";
import { useState } from "react";
import ProductUpsertForm, {
  EditableProduct,
} from "@/components/seller-portal/ProductUpsertForm";
import { deleteProductAction, ProductResult } from "@/lib/actions";
import { useActionState } from "react";

export default function ProductsClient({
  initialProducts,
}: {
  initialProducts: Array<{
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured?: boolean;
  }>;
}) {
  const [editing, setEditing] = useState<EditableProduct | null>(null);
  const [deleteState, deleteAction, deleting] = useActionState<
    ProductResult,
    FormData
  >(deleteProductAction, { ok: false, message: "" });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Your Products
      </h1>
      <section className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800 dark:text-white">
            {editing ? `Edit: ${editing.name}` : "Add new product"}
          </h2>
          {editing && (
            <button
              onClick={() => setEditing(null)}
              className="text-xs px-3 py-1.5 rounded-md border border-slate-400 dark:border-zinc-600 hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          )}
        </div>
        <ProductUpsertForm
          editing={editing ?? undefined}
          onClear={() => setEditing(null)}
        />
      </section>

      <section className="rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-6">
        <h2 className="font-semibold mb-4 text-slate-800 dark:text-white">
          Your listings
        </h2>
        {initialProducts.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-gray-400">
            No products yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500 dark:text-gray-400 border-b border-slate-200 dark:border-zinc-700">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Featured</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-0 border-slate-100 dark:border-zinc-800"
                  >
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-white">
                      <a
                        href={`/products/${p.slug}`}
                        className="hover:underline"
                      >
                        {p.name}
                      </a>
                    </td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-gray-300">
                      {p.category}
                    </td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-gray-300">
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-gray-300">
                      {p.featured ? (
                        <span className="inline-block px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 dark:bg-amber-300/20 dark:text-amber-300">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-2 pr-4 flex gap-2">
                      <button
                        onClick={() =>
                          setEditing({
                            id: p.id,
                            name: p.name,
                            description: p.description,
                            price: p.price,
                            image: p.image,
                            category: p.category,
                            featured: p.featured,
                          })
                        }
                        className="text-xs px-3 py-1.5 rounded-md bg-slate-700 text-white hover:brightness-110"
                      >
                        Edit
                      </button>
                      <form
                        action={deleteAction}
                        onSubmit={(e) => {
                          if (!confirm("Delete this product?"))
                            e.preventDefault();
                        }}
                      >
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          disabled={deleting}
                          className="text-xs px-3 py-1.5 rounded-md bg-red-600 text-white hover:brightness-110 disabled:opacity-60"
                        >
                          {deleting ? "..." : "Delete"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {deleteState.message && (
              <p
                className={`mt-3 text-xs ${
                  deleteState.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                {deleteState.message}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
