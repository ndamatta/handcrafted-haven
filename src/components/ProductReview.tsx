"use client";
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
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <ul className="mb-6">
        {reviews.length === 0 && (
          <li className="text-gray-500">No reviews yet.</li>
        )}
        {reviews.map((review, idx) => (
          <li key={idx} className="mb-4 p-4 bg-slate-100 rounded">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">{review.user_name}</span>
              <span className="text-yellow-500">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-slate-800 p-4 rounded">
        <input
          type="text"
          placeholder="Your name"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          className="p-2 rounded border"
          required
        />
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 rounded border"
          required
        />
        <label className="flex items-center gap-2">
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rounded p-1"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded mt-2">
          Add Review
        </button>
      </form>
    </div>
  );
}
