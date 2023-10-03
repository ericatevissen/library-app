class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const books = [];

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const pagesInput = document.getElementById('pages').value;
    const readInput = document.getElementById('read').checked;

    const book = new Book(titleInput, authorInput, pagesInput, readInput);
    books.push(book);
});