let myBooks = []; // array that stores the books
const addBtn = document.getElementById('my-form');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');
const showBtn = document.getElementById('show-form');

// show the add book form
showBtn.addEventListener('click', () => {
    addBtn.style.display = 'block';
    showBtn.style.display = 'none';
})

// add new book to library and to table
addBtn.addEventListener('submit', function (e) {
    e.preventDefault();
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let read = bookRead.checked;

    if (title == '' || author == '' || pages == '') {
        return;
    }

    let newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    addToTable(newBook);

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookRead.checked = false;
});

// book constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myBooks.push(book);
}

function render(library) {
    for (let i = 0; i < library.length; i++) {
        addToTable(library[i]);
    }
}
let index = 0;

function addToTable(book) {
    let table = document.querySelector('table');
    let row = document.createElement('tr');
    let title = document.createElement('td');
    let author = document.createElement('td');
    let pages = document.createElement('td');
    let read = document.createElement('td');
    let delBtn = document.createElement('td');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;

    if(book.read) {
        read.id = 'read';
        read.textContent = 'read';
    } else {
        read.id = 'not-read';
        read.textContent = 'not read';
    }

    delBtn.textContent = 'Delete';
    delBtn.id = 'delete';
    row.setAttribute('data-index', index);

    delBtn.addEventListener('click', e => {
        let show = row.getAttribute('data-index');
        console.log(show);
        e.target.textContent = show;
        row.remove();
        delete myBooks[show];
        console.log(myBooks);
    });

    read.addEventListener('click', e => {
        if(e.target.textContent == 'read') {
            e.target.textContent = 'not read';
            e.target.id = 'not-read';
        } else {
            e.target.textContent = 'read';
            e.target.id = 'read';
        }
    });

    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(read);
    row.appendChild(delBtn);
    table.appendChild(row);
    index++;
}

let book1 = {
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    pages: 716,
    read: true
}
let book2 = {
    title: "The Name Of The Rose",
    author: "Umberto Eco",
    pages: 592,
    read: false
}

addBookToLibrary(book1);
addBookToLibrary(book2);

console.log(myBooks);

render(myBooks);