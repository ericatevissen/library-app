class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let book = new Book("Lord of the rings", "tolkien", "idk", "read");
alert(Object.values(book));