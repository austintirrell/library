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

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addToLibrary() {
  library[library.length] = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.value
  )
  display(idCounter)
  resetForm()
  idCounter++
}

function display() {
  let book = document.createElement('div')
  book.classList.add('book-card')

  let title = document.createElement('h2')
  title.innerText = bookTitle.value
  title.classList.add('book-title')
  book.appendChild(title)

  let author = document.createElement('p')
  author.innerText = 'By: ' + bookAuthor.value
  author.classList.add('book-author')
  book.appendChild(author)

  let pages = document.createElement('p')
  pages.innerText = 'Pages: ' + bookPages.value
  pages.classList.add('book-pages')
  book.appendChild(pages)

  let read = document.createElement('button')
  read.innerText = 'Not Read'
  read.classList.add('read-button')
  book.appendChild(read)

  bookContainer.appendChild(book)
}

function resetForm() {
  bookTitle.value = ''
  bookAuthor.value = ''
  bookPages.value = ''
  bookRead.checked = false
}