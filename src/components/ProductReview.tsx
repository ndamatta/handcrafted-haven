'use client';
import React, { useState } from "react";
import { submitReview } from "@/lib/actions";

export interface Review {
  user_name: string;
  comment: string;
  rating: number;
  date: string;
}

interface ProductReviewProps {
  productId: number;
  initialReviews: Review[];
}

export default function ProductReview({ productId, initialReviews }: ProductReviewProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [user_name, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user_name.trim() || !comment.trim()) return;

    const newReview: Review = {
      user_name: user_name.trim(),
      comment: comment.trim(),
      rating,
      date: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    await submitReview(productId, newReview.user_name, newReview.comment, newReview.rating);

    setUserName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Reviews</h3>
      <ul className="mb-6">
        {reviews.length === 0 && (
          <li className="text-slate-500 dark:text-slate-400">No reviews yet.</li>
        )}
        {reviews.map((review, idx) => (
          <li
            key={idx}
            className="mb-4 p-4 bg-stone-100 dark:bg-slate-700 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 dark:text-white">{review.user_name}</span>
              <span className="text-amber-400 dark:text-amber-300">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">{review.comment}</p>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-stone-50 dark:bg-slate-800 p-4 rounded-lg border-2 border-transparent"
      >
        <input
          type="text"
          placeholder="Your name"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          required
        />
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          required
        />
        <label className="flex items-center gap-2 text-slate-900 dark:text-white">
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rounded p-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-amber-400 dark:bg-amber-300 hover:bg-amber-500 dark:hover:bg-amber-400 text-slate-900 dark:text-slate-900 font-semibold px-4 py-2 rounded-lg mt-2 transition-colors duration-200"
        >
          Add Review
        </button>
      </form>
    </div>
  );
}
