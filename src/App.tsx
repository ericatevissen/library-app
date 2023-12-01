/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import './App.css'

type AddBookProps = {
  handleAddBook: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type BookFormProps = {
  showForm: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  author: string;
  pages: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setAuthor: React.Dispatch<React.SetStateAction<string>>
  setPages: React.Dispatch<React.SetStateAction<string>>
}

type booksprop = {
  books: Array<book>;
}

type book = {
  title: string;
  author: string;
  pages: number;
  id: number;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [books, setBooks] = useState<Array<book>>([]);

  function handleAddBook() {
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    setShowForm(false);

    const newBook : book = {
      title: title.valueOf(),
      author: author.valueOf(),
      pages: Number(pages.valueOf()),
      id: Math.random()
    }

    setTitle("")
    setAuthor("")
    setPages("")

    const currentBooks = [...books]
    const updatedBooks = [...currentBooks, newBook]
    setBooks(updatedBooks)
  }

  return (
    <>
      <h1>Library</h1>
      <AddBook handleAddBook={handleAddBook}/>
      <BookForm showForm={showForm} handleSubmit={handleSubmit} title={title} author={author}
        pages={pages} setTitle={setTitle} setAuthor={setAuthor} setPages={setPages}/>
      <Books books={books}/>
    </>
  );
}

function AddBook ( {handleAddBook } : AddBookProps ) {
  return <button className="add-book-button" onClick={handleAddBook}>+ Add book</button>;
}

function BookForm({ showForm, handleSubmit, title, author, pages, setTitle, setAuthor, setPages } 
  : BookFormProps) {

  if (!showForm) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" id="title" placeholder="Title" autoComplete="off"
        required={true} value={title} onChange={(e) => setTitle(e.target.value)}>
      </input>
      <input type="text" name="author" id="author" placeholder="Author" autoComplete="off"
        required={true} value={author} onChange={(e) => setAuthor(e.target.value)}>
      </input>
      <input type="number" name="pages" id="pages" placeholder="Pages" autoComplete="off"
        required={true} value={pages} onChange={(e) => setPages(e.target.value)}>
      </input>
      <div>
        <label htmlFor="read">Have you read it?</label>
        <input type="checkbox" name="read" id="read" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function Books({ books } : booksprop) {
  return (
    <div className="books">
      {books.map(book => {
        return (
          <div key={book.id} className="book">
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.pages}</p>
            <button></button>
            <button></button>
          </div>
        );
      })}
    </div>
  );
}

export default App