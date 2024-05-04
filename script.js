console.log("Hello, World!");

let id = 0;

let myLibrary = [
    {"title": "Oliver Twist",
    "author": "Charles Dickens",
    "pages": 200,
    "read": "Yes"},
    {"title": "David Copperfield",
    "author": "Charles Dickens",
    "pages": 200,
    "read": "No"}
];

let newBookBtn = document.querySelector("#btn");
let form = document.querySelector("#form");

newBookBtn.addEventListener("click", function() {
    if (newBookBtn.textContent === "Add Book") {
        form.classList.remove("form-hidden");
        newBookBtn.textContent = "Close Form";
    } else {
        form.classList.add("form-hidden");
        newBookBtn.textContent = "Add Book";
    }
})

let formBtn = document.querySelector("#add-btn");
let bookTitle, bookAuthor, bookPages, bookRead, bookObj;

formBtn.addEventListener("click", function() {
    bookTitle = document.querySelector("#title").value;
    bookAuthor = document.querySelector("#author").value;
    bookPages = document.querySelector("#pages").value;
    bookRead = document.querySelector("#read");
    if (bookRead.checked) {
        bookRead = "Yes";
    } else {
        bookRead = "No";
    }
    if (bookTitle === "" || bookAuthor === "" || bookPages === "") {
        alert("Missing Data!");
        return;
    }
    bookObj = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    addBook(bookObj);
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = read;
    this.id = generateUniqueId();
}

function generateUniqueId() {
    return id++;
}

function displayBook(bookObj) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = bookObj.id;

    let titleElement = document.createElement("h2");
    titleElement.textContent = bookObj.title;

    let authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${bookObj.author}`;

    let pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${bookObj.pages}`;

    let readElement = document.createElement("p");
    readElement.textContent = `Read: ${bookObj.read}`;

    let readButton = document.createElement("button");
    if (bookObj.read === "Yes") {
        readButton.textContent = "Mark as Unread";
    } else {
        readButton.textContent = "Mark as Read";
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";

    card.appendChild(titleElement);
    card.appendChild(authorElement);
    card.appendChild(pagesElement);
    card.appendChild(readElement);
    card.appendChild(readButton);
    card.appendChild(removeButton);

    document.body.appendChild(card);

    readButton.addEventListener("click", function() {
        if (readButton.textContent === "Mark as Unread") {
            bookObj.read = "No";
            readElement.textContent = `Read: ${bookObj.read}`;
            readButton.textContent = "Mark as Read";
        } else if (readButton.textContent === "Mark as Read") {
            bookObj.read = "Yes";
            readElement.textContent = `Read: ${bookObj.read}`;
            readButton.textContent = "Mark as Unread";
        }
    })

    removeButton.addEventListener("click", function() {
        let bookIndex = myLibrary.findIndex(book => book.id === bookObj.id);
        myLibrary.splice(bookIndex, 1);
        card.parentNode.removeChild(card);
    });
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].id = generateUniqueId();
    }
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        displayBook(book);
    }
}

function addBook(book) {
    myLibrary.push(book);
    displayBook(book);
}

displayBooks();