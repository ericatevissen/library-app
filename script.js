class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//Generates a form
const form = document.createElement("form");
const ul = document.createElement("ul");

const formFields = [
    { label: "title", type: "text", name: "title", id: "title" },
    { label: "author", type: "text", name: "author", id: "author" },
    { label: "pages", type: "number", name: "pages", id: "pages" },
    { label: "read", type: "checkbox", name: "read", id: "read", value: "read" },
];

formFields.forEach((field) => {
    const li = document.createElement("li");
    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label;
    const input = document.createElement("input");
    input.setAttribute("type", field.type);
    input.setAttribute("name", field.name);
    input.setAttribute("id", field.id);
    if (field.type === "checkbox") {
        input.setAttribute("value", field.value);
    }
    li.appendChild(label);
    li.appendChild(input);
    ul.appendChild(li);
});

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.textContent = "submit";

form.appendChild(ul);
form.appendChild(submitButton);

const scriptElement = document.querySelector("script");
const books = [];

//appends the form to the DOM and generates a new book from the inputs when it's submitted
function addBook() {
    document.body.insertBefore(form, scriptElement);

    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
    
        const titleInput = document.getElementById('title').value;
        const authorInput = document.getElementById('author').value;
        const pagesInput = document.getElementById('pages').value;
        const readInput = document.getElementById('read').checked;
    
        const book = new Book(titleInput, authorInput, pagesInput, readInput);
        books.push(book);
    });
}