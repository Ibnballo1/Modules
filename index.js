import Book from "./modules/objects";

const listBook = document.getElementById('book-list');
const addForm = document.getElementById('add-form');
const bookListing = document.getElementById('listBook');
const bookReg = document.getElementById('addBook');
const contact = document.getElementById('contact-section');

const listLink = document.getElementById('list-book');
const addLink = document.getElementById('new-book');
const contactLink = document.getElementById('contact');
const date = document.getElementById('date');

class UI {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static storeBook(book) {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = UI.getBooks();
    let bookDiv = '';

    if (books.length !== 0 && books) {
      books.forEach((book, index) => {
        bookDiv += `
      <div class="book-item ${index % 2 ? 'white-back' : 'gray-back'}">

      <p class="book-info">${book.title} by ${book.author}</p>


      <button type="button" id="remove-btn"  onClick='removeBook(${index})' class="remove-btn"> Remove </button>

      </div>`;
      });

      listBook.innerHTML = bookDiv;
      const removeBtn = document.querySelectorAll('.remove-btn');
      removeBtn.forEach((button, index) => button.addEventListener('click', () => {
        UI.deleteBook(index);
      }));
    } else {
      bookDiv += `
            <div class="book">
            <p class="book-message"> No book Available<p>
            </div> `;
      listBook.innerHTML = bookDiv;
    }
  }

  static saveBook(title, author) {
    if (title && author) {
      const book = new Book(title, author);
      UI.storeBook(book);
      UI.displayBooks();
    }
  }

  static deleteBook(index) {
    const books = this.getBooks();
    const filteredBook = books.filter((book, i) => index !== i);
    localStorage.setItem('books', JSON.stringify(filteredBook));
    UI.displayBooks();
  }
}
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  if (title.value.trim !== '' && author.value.trim !== '') {
    UI.saveBook(title.value, author.value);
    title.value = '';
    author.value = '';
  }
});
function renderSection(page) {
  switch (page) {
    case 'listBook':
      bookListing.style.display = 'flex';
      bookReg.style.display = 'none';
      contact.style.display = 'none';
      listLink.style.color = 'blue';
      addLink.style.color = 'black';
      contactLink.style.color = 'black';
      break;
    case 'addBook':
      bookListing.style.display = 'none';
      bookReg.style.display = 'flex';
      contact.style.display = 'none';
      listLink.style.color = 'black';
      addLink.style.color = 'blue';
      contactLink.style.color = 'black';

      break;

    case 'contact-section':
      bookListing.style.display = 'none';
      bookReg.style.display = 'none';
      contact.style.display = 'flex';
      listLink.style.color = 'black';
      addLink.style.color = 'black';
      contactLink.style.color = 'blue';
      break;

    default:
      bookListing.style.display = 'flex';
      bookReg.style.display = 'none';
      contact.style.display = 'none';
      listLink.style.color = 'blue';
      addLink.style.color = 'black';
      contactLink.style.color = 'black';
      break;
  }
}
listLink.addEventListener('click', () => {
  renderSection('listBook');
});

addLink.addEventListener('click', () => {
  renderSection('addBook');
});
contactLink.addEventListener('click', () => {
  renderSection('contact-section');
});
window.onload = () => {
  renderSection('listBook');
};
const dateTime = new Date(Date.now());
date.textContent = dateTime.toUTCString();

UI.displayBooks();