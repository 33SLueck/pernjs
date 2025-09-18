import { useState, useEffect } from "react";

const Reviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:3008/api/v1/reviews/book/${bookId}`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []));
  }, [bookId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3008/api/v1/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, rating, bookId }),
    });
    const newReview = await res.json();
    setReviews(reviews.concat(newReview));
    setText("");
    setRating(5);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Rezensionen</h3>
      <ul className="mb-4">
        {reviews.length === 0 && <li>Keine Rezensionen vorhanden.</li>}
        {reviews.map((review) => (
          <li key={review.id} className="border-b py-2">
            <span className="font-semibold">Bewertung:</span> {review.rating}{" "}
            <br />
            <span>{review.text}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Rezension schreiben..."
          className="border px-2 py-1"
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border px-2 py-1"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Rezension absenden
        </button>
      </form>
    </div>
  );
};

export default Reviews;
