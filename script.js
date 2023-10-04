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

const formFields = [
    { type: "text", name: "title", id: "title", placeholder: "Title", autocomplete: "off", required: true },
    { type: "text", name: "author", id: "author", placeholder: "Author", autocomplete: "off", required: true },
    { type: "number", name: "pages", id: "pages", placeholder: "Pages", autocomplete: "off", required: true },
    { type: "checkbox", name: "read", id: "read" },
];

formFields.forEach((field) => {
    if (field.type === "checkbox") {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = "Have you read it?";

        const input = document.createElement("input");
        input.setAttribute("type", field.type);
        input.setAttribute("name", field.name);
        input.setAttribute("id", field.id);

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    }
    else {
        const input = document.createElement("input");
        input.setAttribute("type", field.type);
        input.setAttribute("name", field.name);
        input.setAttribute("id", field.id);
        input.setAttribute("placeholder", field.placeholder);
        input.setAttribute("autocomplete", field.autocomplete || "on");
        input.setAttribute("required", field.required || false);
        form.appendChild(input);
    }
});

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.textContent = "Submit";

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
        readButton.style.backgroundColor = "rgb(251, 47, 81)";
    }

    bookDiv.appendChild(titleParagraph);
    bookDiv.appendChild(authorParagraph);
    bookDiv.appendChild(pagesParagraph);
    bookDiv.appendChild(readButton);
    bookDiv.appendChild(removeButton);

    booksDiv.appendChild(bookDiv);
}

const addBookButton = document.querySelector(".add-book-button")
addBookButton.addEventListener("click", () => {
    createBook();
});