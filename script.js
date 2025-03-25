const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? "✅ Yes" : "❌ No"}</p>
            <button class="toggle-btn">Toggle Read</button>
            <button class="remove-btn">Remove</button>
        `;

        bookCard.querySelector(".toggle-btn").addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        bookCard.querySelector(".remove-btn").addEventListener("click", () => {
            removeBook(book.id);
        });

        libraryDiv.appendChild(bookCard);
    });
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    displayBooks();
}

// Handle new book form
document.getElementById("new-book-btn").addEventListener("click", () => {
    document.getElementById("book-dialog").showModal();
});

document.getElementById("close-dialog").addEventListener("click", () => {
    document.getElementById("book-dialog").close();
});

document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    document.getElementById("book-dialog").close();
    this.reset();
});

addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, false);
addBookToLibrary("Deep Work", "Cal Newport", 304, true);
addBookToLibrary("Rich Dad Poor Dad", "Robert Kiyosaki", 336, false);
addBookToLibrary("The Lean Startup", "Eric Ries", 336, true);
addBookToLibrary("You Don't Know JS", "Kyle Simpson", 278, false);
addBookToLibrary("JavaScript: The Good Parts", "Douglas Crockford", 176, true);