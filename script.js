const addBtn = document.getElementById('add-button')
const bookAddForm = document.getElementById('book-add-form')
const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const addBookBtn = document.getElementById('add-book')
const bookRead = document.getElementById('book-read')
const bookContainer = document.getElementById('book-container')

let library = []
let idCounter = 0

addBtn.addEventListener('click', () => {
  bookAddForm.classList.toggle('active')
  addBtn.classList.toggle('active')
})

addBookBtn.addEventListener('click', () => {
  addToLibrary()
  bookAddForm.classList.toggle('active')
  addBtn.classList.toggle('active')
})

function Book(idCounter, title, author, pages, read) {
  this.id = idCounter
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.toggleRead = function() {
  this.read = !this.read
}

function addToLibrary() {
  if (bookTitle.value == '' || bookAuthor.value == '' || bookPages.value == '') {
    return
  }
  library[library.length] = new Book(
    idCounter,
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  )
  display(idCounter)
  resetForm()
  idCounter++
}

function display(idCounter) {
  let bookID = idCounter
  let bookObj = library.find(x => x.id === bookID)

  let book = document.createElement('div')
  book.classList.add('book-card')
  book.setAttribute('id', 'book' + bookID)

  let title = document.createElement('h2')
  title.innerText = bookObj.title
  title.classList.add('book-title')
  book.appendChild(title)

  let author = document.createElement('p')
  author.innerText = 'By: ' + bookObj.author
  author.classList.add('book-author')
  book.appendChild(author)

  let pages = document.createElement('p')
  pages.innerText = 'Pages: ' + bookObj.pages
  pages.classList.add('book-pages')
  book.appendChild(pages)

  let read = document.createElement('button')
  read.classList.add('read-button')
  if (bookObj.read == true) {
    read.innerText = 'Finished'
    read.classList.add('read-true')
  } else {
    read.innerText = 'Not Read'
    read.classList.add('read-false')
  }
  read.setAttribute('id', 'read' + bookID)
  read.addEventListener('click', () => updateDisplay(bookID))
  book.appendChild(read)

  let remove = document.createElement('button')
  remove.classList.add('remove-button')
  remove.innerText = 'Remove'
  remove.addEventListener('click', () => removeBook(bookID))
  book.appendChild(remove)

  bookContainer.appendChild(book)
}

function resetForm() {
  bookTitle.value = ''
  bookAuthor.value = ''
  bookPages.value = ''
  bookRead.checked = false
}

function updateDisplay(bookID) {
  let readStatus = document.getElementById('read' + bookID)
  let bookIndex = library.findIndex(x => x.id === bookID)

  library[bookIndex].toggleRead()
  if (library[bookIndex].read) {
    readStatus.classList.remove('read-false')
    readStatus.classList.add('read-true')
    readStatus.innerText = 'Finished'
  } else {
    readStatus.classList.remove('read-true')
    readStatus.classList.add('read-false')
    readStatus.innerText = 'Not Read'
  }
}

function removeBook(bookID) {
  let bookCard = document.getElementById('book' + bookID)
  let bookObject = library.findIndex(x => x.id === bookID)

  library.splice(bookObject)

  while (bookCard.firstChild) {
    bookCard.removeChild(bookCard.firstChild)
  }
  bookContainer.removeChild(bookCard)
}