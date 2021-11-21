const INCOMPLETE_BOOK_SHELF_LIST = 'incompleteBookshelfList';
const COMPLETE_BOOK_SHELF_LIST = 'completeBookshelfList';
const ITEM_ID = 'itemId';

function addBook() {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
  const completeBookShelfList = document.getElementById(COMPLETE_BOOK_SHELF_LIST);
  const inputBookTitle = document.getElementById('inputBookTitle').value;
  const inputBookAuthor = document.getElementById('inputBookAuthor').value;
  const inputBookYear = document.getElementById('inputBookYear').value;
  const inputCheked = document.getElementById('inputBookIsComplete').checked;
  const container = makeBooks(inputBookTitle, inputBookAuthor, inputBookYear, inputCheked);
  incompleteBookshelfList.append(container);

  if (inputCheked) {
    completeBookShelfList.append(container);
  } else {
    incompleteBookshelfList.append(container);
  }
}

function makeBooks(title, author, year, isCompleted) {
  const article = document.createElement('article');
  article.classList.add('book_item');

  const bookTtitle = document.createElement('h3');
  bookTtitle.innerText = title;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = author;

  const bookYear = document.createElement('p');
  bookYear.innerText = year;

  const actionContainer = document.createElement('div');
  actionContainer.classList.add('action');

  article.append(bookTtitle, bookAuthor, bookYear, actionContainer);

  if (isCompleted) {
    actionContainer.append(createUndoButton(), deleteButton());
  } else {
    actionContainer.append(finishReadButton(), deleteButton());
  }

  return article;
}

function createButton(buttonTypeClass, eventListener, buttonText) {
  const button = document.createElement('button');
  button.classList.add('button', buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener('click', function (event) {
    eventListener(event);
  });
  return button;
}

function addBookToCompleted(taskElement) {
  const taskTitle = taskElement.querySelector('.book_item > h3').innerText;
  const taskAuthor = taskElement.querySelector('.book_item > p').innerText;
  const taskYear = taskElement.querySelectorAll('.book_item > p')[1].innerText;

  const newTodo = makeBooks(taskTitle, taskAuthor, taskYear, true);
  const listCompleted = document.getElementById(COMPLETE_BOOK_SHELF_LIST);
  listCompleted.append(newTodo);

  taskElement.remove();
}

function finishReadButton() {
  return createButton(
    'green',
    function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
    },
    'Selesai dibaca'
  );
}

function removeBookFromCompleted(taskElement) {
  taskElement.remove();
}

function deleteButton() {
  return createButton(
    'red',
    function (event) {
      removeBookFromCompleted(event.target.parentElement.parentElement);
    },
    'Hapus buku'
  );
}

function undoReadBookFromCompleted(taskElement) {
  const uncompleteBookShelfList = document.getElementById(INCOMPLETE_BOOK_SHELF_LIST);
  const taskTitle = taskElement.querySelector('.book_item > h3').innerText;
  const taskAuthor = taskElement.querySelector('.book_item > p')[0].innerText;
  const taskYear = taskElement.querySelectorAll('.book_item > p')[1].innerText;
  const newTodo = makeBooks(taskTitle, taskAuthor, taskYear, false);
  uncompleteBookShelfList.append(newTodo);

  taskElement.remove();
}

function createUndoButton() {
  return createButton(
    'green',
    function (event) {
      undoReadBookFromCompleted(event.target.parentElement.parentElement);
    },
    'Belum selesai dibaca'
  );
}
