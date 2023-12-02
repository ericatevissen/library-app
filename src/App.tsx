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
  setRead: React.Dispatch<React.SetStateAction<boolean>>
}

type Booksprop = {
  books: Array<book>;
  handleReadSwitch: (bookId: number) => void;
  handleDelete: (bookId: number) => void;
}

type book = {
  title: string;
  author: string;
  pages: number;
  read: boolean;
  id: number;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [books, setBooks] = useState<Array<book>>([]);
  const [read, setRead] = useState(false)

  function handleAddBook() {
    setShowForm(true);
  }

  function handleReadSwitch(bookId: number) {
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          read: !book.read
        };
      }
      return book;
    });

    setBooks(updatedBooks);
  }

  function handleDelete(bookId: number) {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
  }  

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    setShowForm(false);

    const newBook : book = {
      title: title,
      author: author,
      pages: Number(pages),
      id: Math.random(),
      read: read
    }

    setTitle("")
    setAuthor("")
    setPages("")
    setRead(false)

    const currentBooks = [...books]
    const updatedBooks = [...currentBooks, newBook]
    setBooks(updatedBooks)
  }

  return (
    <>
      <h1>Library</h1>
      <AddBook handleAddBook={handleAddBook}/>
      <BookForm showForm={showForm} handleSubmit={handleSubmit} title={title} author={author}
        pages={pages} setTitle={setTitle} setAuthor={setAuthor} setPages={setPages} setRead={setRead} />
      <Books books={books} handleReadSwitch={handleReadSwitch} handleDelete={handleDelete} />
    </>
  );
}

function AddBook ( {handleAddBook } : AddBookProps ) {
  return <button className="add-book-button" onClick={handleAddBook}>+ Add book</button>;
}

function BookForm({ showForm, handleSubmit, title, author, pages, setTitle, 
setAuthor, setPages, setRead } : BookFormProps) {

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
        <input type="checkbox" name="read" id="read"
          onChange={(e) => setRead(e.target.checked)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function Books({ books, handleReadSwitch, handleDelete } : Booksprop) {
  return (
    <div className="books">
      {books.map(book => {

        return (
          <div key={book.id} className="book">
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.pages}</p>
            <ReadButton handleReadSwitch={() => handleReadSwitch(book.id)} read={book.read} bookId={book.id}/>
            <DeleteButton handleDelete={() => handleDelete(book.id)} bookId={book.id}/>
          </div>
        );
      })}
    </div>
  );
}

interface ReadButtonProps {
  read: boolean;
  handleReadSwitch: (bookId: number) => void; 
  bookId: number;
}

function ReadButton({ read, handleReadSwitch, bookId } : ReadButtonProps) {
  let readColor;
  let readText;

  if (read === true) {
    readColor = "#70e69b";
    readText = "Read"
  }
  else {
    readColor = "rgb(251, 47, 81)";
    readText = "Not read";
  }

  return <button style={{ backgroundColor: readColor }} onClick={() => handleReadSwitch(bookId)}>{readText}</button> 
}

interface DeleteButtonProps {
  handleDelete: (bookId: number) => void;
  bookId: number
}

function DeleteButton ( {handleDelete, bookId} : DeleteButtonProps ) {
  return <button onClick={() => handleDelete(bookId)}>Delete</button>
}

export default App