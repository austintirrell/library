const addBtn = document.getElementById('add-button')
const bookAddForm = document.getElementById('book-add-form')
const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const addBookBtn = document.getElementById('add-book')
const bookRead = document.getElementById('book-read')
const bookContainer = document.getElementById('book-container')
const sortBy = document.getElementById('sort-by')

let library
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
sortBy.addEventListener('change', () => {
  display()
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
    alert("You're missing a value!")
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
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild)
  }
  
  sortLibrary()
  
  for (i = 0; i < library.length; i++) {
    let bookObj = library[i]

    let book = document.createElement('div')
    book.classList.add('book-card')
    book.setAttribute('id', 'book' + bookObj.id)

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
    if (bookObj.read) {
      read.innerText = 'Finished'
      read.classList.add('read-true')
    } else {
      read.innerText = 'Not Read'
      read.classList.add('read-false')
    }
    read.setAttribute('id', 'read' + bookObj.id)
    read.addEventListener('click', () => updateDisplay(bookObj.id))
    book.appendChild(read)

    let remove = document.createElement('button')
    remove.classList.add('remove-button')
    remove.innerText = 'Remove'
    remove.addEventListener('click', () => removeBook(bookObj.id))
    book.appendChild(remove)

    bookContainer.appendChild(book)
  }
  saveLocal()
}

function sortLibrary() {
  if (sortBy.value == 'title') {
    library.sort((a, b) => {
      let titleA = a.title.toLowerCase()
      let titleB = b.title.toLowerCase()
      if (titleA < titleB) {
        return -1
      }
      if (titleA > titleB) {
        return 1
      }
      return 0
    })
  } else if (sortBy.value == 'author') {
    library.sort((a, b) => {
      let authorA = a.author.toLowerCase()
      let authorB = b.author.toLowerCase()
      if (authorA < authorB) {
        return -1
      }
      if (authorA > authorB) {
        return 1
      }
      return 0
    })
  } else if (sortBy.value == 'pages') {
    library.sort((a, b) => {
      return a.pages - b.pages
    })
  } else if (sortBy.value == 'read') {
     library.sort((a, b) => {
       return Number(a.read) - Number(b.read)
     })
  }
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
  saveLocal()
}

function removeBook(bookID) {
  let bookObject = library.findIndex(x => x.id === bookID)
  library.splice(bookObject)
  display()
}

function saveLocal() {
  localStorage.setItem('books', JSON.stringify(library))
}

function restoreLocal() {
  if (localStorage.getItem('books')) {
    library = JSON.parse(localStorage.getItem('books'))
    display()
  } else {
    library = []
  }
}

window.onload = restoreLocal()