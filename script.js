let myLibrary = [];
const addButton = document.querySelector('#add-button');
const innerAddButton = document.querySelector('#inner-add-button');

addButton.addEventListener('click', getForm);
innerAddButton.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${title} by ${author}, ${pages} pages, ${this.read}`;
	};
}

function addBookToLibrary() {
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const pages = document.querySelector('#pages').value;
	const read = document.querySelector('input[name="read"]:checked').value;
	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	document.querySelector('#title').value = '';
	document.querySelector('#author').value = '';
	document.querySelector('#pages').value = '';
	document.querySelector('input[name="read"]:checked').checked = false;
	displayBooks();
	hideForm();
}

function displayBooks() {
	const div = document.querySelector('div');
	div.textContent = '';
	for (let book of myLibrary) {
		const para = document.createElement('p');
		const removeButton = document.createElement('button');
		const readButton = document.createElement('button');
		para.textContent = book.info();
		removeButton.textContent = 'remove';
		removeButton.setAttribute('data-index', `${myLibrary.indexOf(book)}`);
		removeButton.classList.add('remove-buttons');
		para.appendChild(removeButton);
		readButton.textContent = 'read';
		readButton.setAttribute('data-index', `${myLibrary.indexOf(book)}`);
		readButton.classList.add('read-buttons');
		para.appendChild(readButton);
		div.appendChild(para);
	}
	const removeButtons = document.querySelectorAll('.remove-buttons');
	const readButtons = document.querySelectorAll('.read-buttons');
	removeButtons.forEach(button => button.addEventListener('click', removeBook));
	readButtons.forEach(button => button.addEventListener('click', changeRead));
}

function getForm() {
	const form = document.querySelector('form');
	form.style.visibility = 'visible';
}

function hideForm() {
	const form = document.querySelector('form');
	form.style.visibility = 'hidden';
}

function removeBook() {
	bookIndex = Number(this.getAttribute('data-index'));
	myLibrary.splice(bookIndex, 1);
	displayBooks();
}

function changeRead() {
	bookIndex = Number(this.getAttribute('data-index'));
	if (myLibrary[bookIndex].read === 'read') {
		myLibrary[bookIndex].read = 'unread';
	} else {
		myLibrary[bookIndex].read = 'read';
	}
	displayBooks();
}