import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Reviews from "../Reviews";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3008/api/v1/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <div>Lade Buchdaten...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        Zurück
      </button>
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p>
        <span className="font-semibold">Autor:</span> {book.author}
      </p>
      <p>
        <span className="font-semibold">Genre:</span> {book.genre}
      </p>
      <p>
        <span className="font-semibold">ISBN:</span> {book.isbn}
      </p>
      <Reviews bookId={book.id} />
    </div>
  );
};

export default BookDetails;
