// ProductReview component for displaying and submitting reviews, comments, and ratings for a product
import React, { useState } from "react";

interface Review {
  user: string;
  comment: string;
  rating: number;
  date: string;
}

interface ProductReviewProps {
  productId: string;
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

function ProductReview({ productId, reviews, onAddReview }: ProductReviewProps) {
  // Local state for new review form
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Handle form submission for new review
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return;
    const newReview: Review = {
      user,
      comment,
      rating,
      date: new Date().toISOString(),
    };
    onAddReview(newReview);
    setUser("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="mt-8">
      {/* Review List */}
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <ul className="mb-6">
        {reviews.length === 0 && <li className="text-gray-500">No reviews yet.</li>}
        {reviews.map((review, idx) => (
          <li key={idx} className="mb-4 p-4 bg-slate-100 rounded">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">{review.user}</span>
              <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </li>
        ))}
      </ul>
      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-slate-200 p-4 rounded">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={e => setUser(e.target.value)}
          className="p-2 rounded border"
        />
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="p-2 rounded border"
        />
        <label className="flex items-center gap-2">
          Rating:
          <select value={rating} onChange={e => setRating(Number(e.target.value))} className="rounded p-1">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded mt-2">Add Review</button>
      </form>
    </div>
  );
}

export default ProductReview;
