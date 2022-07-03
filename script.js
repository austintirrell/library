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
  display()
  resetForm()
  idCounter++
}

function display() {
  let bookID = idCounter
  let book = document.createElement('div')
  book.classList.add('book-card')
  book.setAttribute('id', 'book' + bookID)

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
  read.classList.add('read-button')
  if (bookRead.checked == true) {
    read.innerText = 'Finished'
    read.classList.add('read-true')
  } else {
    read.innerText = 'Not Read'
    read.classList.add('read-false')
  }
  read.setAttribute('id', 'read' + bookID)
  read.addEventListener('click', () => changeRead(bookID))
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

function changeRead(bookID) {
  let readInfo = document.getElementById('read' + bookID)
  let bookObject = library.find(x => x.id === bookID)
  if (bookObject.read) {
    bookObject.read = false
    readInfo.classList.remove('read-true')
    readInfo.classList.add('read-false')
    readInfo.innerText = 'Not Read'
  } else {
    bookObject.read = true
    readInfo.classList.remove('read-false')
    readInfo.classList.add('read-true')
    readInfo.innerText = 'Finished'
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