class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//creates a form to input the book's info
const form = document.createElement("form");
const ul = document.createElement("ul");

const formFields = [
    { type: "text", name: "title", id: "title", placeholder: "Title", autocomplete: "off" },
    { type: "text", name: "author", id: "author", placeholder: "Author", autocomplete: "off" },
    { type: "number", name: "pages", id: "pages", placeholder: "Pages", autocomplete: "off" },
    { type: "checkbox", name: "read", id: "read" },
];

formFields.forEach((field) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.setAttribute("type", field.type);
    input.setAttribute("name", field.name);
    input.setAttribute("id", field.id);
    
    if (field.type === "checkbox") {
        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = "Have you read it?";
        li.appendChild(label);
    }
    else {
        input.setAttribute("placeholder", field.placeholder);
        input.setAttribute("autocomplete", field.autocomplete || "on");
    }
    
    li.appendChild(input);
    ul.appendChild(li);
});

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.textContent = "Submit";

form.appendChild(ul);
form.appendChild(submitButton);

const booksDiv = document.querySelector(".books");
const books = [];

//appends the form to the DOM
function createBook() {
    document.body.insertBefore(form, booksDiv);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
}

//Generates a book from the inputs when it's submitted,
//adds it to the DOM and stores it in an array.
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('title').value;
    const authorInput = document.getElementById('author').value;
    const pagesInput = document.getElementById('pages').value;
    const readInput = document.getElementById('read').checked;

    const book = new Book(titleInput, authorInput, pagesInput, readInput);

    form.remove();

    appendBook(book);
    books.push(book);
});

//Adds the book to the DOM
function appendBook(key) {
    const bookDiv = document.createElement("p");
    const titleParagraph = document.createElement("p");
    const authorParagraph = document.createElement("p");
    const pagesParagraph = document.createElement("p");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    bookDiv.className = "book"
    titleParagraph.textContent = `${key.title}`;
    authorParagraph.textContent = `${key.author}`
    pagesParagraph.textContent = `${key.pages} pages`
    removeButton.textContent = "Remove"

    if (key.read === true) {
        readButton.textContent = "Read"
    }
    else {
        readButton.textContent = "Not read"
        readButton.style.backgroundColor = "#dc2626";
    }

    bookDiv.appendChild(titleParagraph);
    bookDiv.appendChild(authorParagraph);
    bookDiv.appendChild(pagesParagraph);
    bookDiv.appendChild(readButton);
    bookDiv.appendChild(removeButton);

    booksDiv.appendChild(bookDiv);
}

createBook()