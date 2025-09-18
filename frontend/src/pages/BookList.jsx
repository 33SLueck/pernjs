import {useEffect, useState} from  'react';
import {Link} from 'react-router';
const BookList = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genres, setGenres] =useState([]);

    useEffect(() => {
        fetch("http://localhost:3008/api/v1/")
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error("Error fetching data", error));
    },[]);

    useEffect(() => {
        fetch("http://localhost:3008/api/v1/genres")
        .then((res) => res.json())
        .then((data) => setGenres(data))
        .catch((error) => console.error("Error fetching genres", error));
    }, []);

    const deleteClick = (id) => {
        fetch(`http://localhost:3008/api/v1/${id}`, {
            method: 'DELETE',
        })
        .then(() => setBooks(books.filter((book) => book.id !== id)))
        .catch((error) => console.error("Error deleting book", error));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3008/api/v1/", {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({title, genre, isbn}),
        });
        const newBook = await res.json();
        setBooks(books.concat(newBook));
        setTitle('');
        setGenre('');
        setIsbn('');
    };
    
  return (
    <>
  <h1 className="text-5xl text-red-600 text-center mb-8">Bücher Liste</h1>

  <div className='flex flex-wrap justify-center items-start gap-6 mb-12 max-w-6xl mx-auto'>
    {books.map((book) => (
        <div
        key={book.id}
        className="bg-gray-100 border-2 border-gray-600 rounded-lg shadow-md p-6 flex flex-col gap-2 min-w-[250px] max-w-xs">
        <h2 className='text-xl font-bold mb-2'>{book.title}</h2>
        <p><span className='font-semibold'>ISBN: </span>{book.isbn}</p>
        <p><span className='font-semibold'>Genre: </span>{book.genre}</p>
        <Link to={`/book/${book.id}`} className='bg-green-500 text-white text-center hover:underline'>Details</Link>
        <button className='bg-red-500 text-white hover:underline' onClick={() => deleteClick(book.id)}>Delete</button>
</div>
    ))}
  </div>
  </>
  )
}

export default BookList