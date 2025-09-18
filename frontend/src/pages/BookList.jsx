import { useEffect, useState } from "react";
import { Link } from "react-router";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3008/api/v1/")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3008/api/v1/genres")
      .then((res) => res.json())
      .then((data) => setGenres(Array.isArray(data) ? data : []))
      .catch((err) => {
        setGenres([]);
        console.error(err);
      });
  }, []);

  const deleteClick = (id) => {
    fetch(`http://localhost:3008/api/v1/${id}`, {
      method: "DELETE",
    })
      .then(() => setBooks(books.filter((book) => book.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3008/api/v1/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, genre, isbn }),
    });
    const newBook = await res.json();
    setBooks(books.concat(newBook));
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
  };

  return (
    <>
      <h1 className="text-4xl text-red-800 mb-8 text-center">Bücherliste</h1>

      <div className="flex flex-wrap justify-center items-start gap-6 mb-12 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-100 border-2 border-gray-600 shadow-md rounded-lg p-6 flex flex-col gap-2 min-w-[250px] max-w-xs"
          >
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p>
              <span className="font-semibold">Autor:</span> {book.author}
            </p>
            <p>
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {book.isbn}
            </p>
            <Link
              to={`/book/${book.id}`}
              className="mt-4 bg-green-500 text-white px-4 py-1 rounded"
            >
              Details
            </Link>
            <button
              onClick={() => deleteClick(book.id)}
              className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col max-w-2xl gap-4 mx-auto"
      >
        <h2 className="text-2xl font-bold mb-2">Neues Buch anlegen</h2>
        <div className="flex items-center justify-between gap-2">
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titel"
            className="border px-2 py-1"
            required
          />
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
            className="border px-2 py-1"
            required
          />
        </div>
        <select
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border px-2 py-1"
          required
        >
          <option value="">Genre wählen</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <input
          name="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          className="border px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Buch anlegen
        </button>
      </form>
    </>
  );
};

export default BookList;
