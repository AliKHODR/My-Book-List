//add books

document.getElementById('form').addEventListener('submit', addBooks);
let bookList = document.getElementById('bookList');


function addBooks(e) {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let isbn = document.getElementById('isbn').value;

  let book = {
    title: title,
    author: author,
    isbn: isbn,
  }
  // validation
  if(title === '' || author === '' || isbn === ""){
    alertDiv('Please Fill The Fields', 'primary');
    return false;
  }
  // fetch from local storage
  if (localStorage.getItem('books') === null) {
    let books = [];
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  } else {
    let books = JSON.parse(localStorage.getItem('books'));
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  // add book to the UI
  let row = bookList.insertRow();
  row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a class="btn btn-danger btn-sm remove" href="#">X</a></td>`;

  //Clear the Form
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

  // alert
  alertDiv('Book Added', 'success');
}



// Alerts
function alertDiv(message, className) {
  let container = document.querySelector('.container');
  let form = document.getElementById('form');
  let div = document.createElement('div');
  div.className = `alert alert-${className}`;
  let divMessage = document.createTextNode(`${message}`);
  div.appendChild(divMessage);
  container.insertBefore(div, form);

  //Make the alert disappear
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

//Event: Display Book

function displayBook() {
  let books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book) => {
    let row = bookList.insertRow();
    row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a class="btn btn-danger btn-sm remove" href="#">X</a></td>`;

  });
}

//Event: Remove Book
let deleteBook = document.getElementById('bookList');
deleteBook.addEventListener('click', e => {
  removeBook(e.target);
  removeBookFromLs(e.target.parentElement.previousElementSibling.innerText);
});

// remove a book from UI

function removeBook(el) {
  if (el.classList.contains('remove')) {
    el.parentElement.parentElement.remove();
  }
  alertDiv('Book Removed !!', 'danger');
}

// remove a book from local storage

function removeBookFromLs(isbn) {
  let books = JSON.parse(localStorage.getItem('books'));
  books.forEach((book, index) => {
    if (book.isbn === isbn) {
      books.splice(index, 1);
    }
  })
  localStorage.setItem('books', JSON.stringify(books));
}