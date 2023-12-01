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

function App() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const books = [];

  function handleAddBook() {
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    const book = {
      name: title.valueOf(),
      author: author.valueOf(),
      pages: Number(pages.valueOf())
    }

    books.push(book)
  }

  return (
    <>
      <h1>Library</h1>
      <AddBook handleAddBook={handleAddBook}/>
      <BookForm showForm={showForm} handleSubmit={handleSubmit} title={title} author={author}
        pages={pages} setTitle={setTitle} setAuthor={setAuthor} setPages={setPages}/>
      <div className="books"></div>
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
      <p>{title}</p> 
    </form>
  );
}

export default App