const books = [];
const formButton = document.querySelector('.fa-plus-circle');
const addingButton = document.querySelector('form button');
const form = document.querySelector('.adding-form');

function Book(title, author, pageNum, readStatus) {
	this.title = title;
	this.author = author;
	this.pageNum = pageNum;
	this.readStatus = readStatus;
}

const toggleForm = () => {
	form.style.visibility = form.style.visibility === 'visible' ? 'hidden' : 'visible';
	formButton.style.visibility = form.style.visibility === 'visible' ? 'hidden' : 'visible';
};

const removeBook = (index) => {
	books.splice(index, 1);
	render();
};

const updateStatus = (index) => {
	const span = document.querySelector(`span[data-index='${index}']`);

	span.textContent = span.textContent === 'read' ? 'unread' : 'read';
};

const render = () => {
	const main = document.querySelector('main');
	const addingCard = document.querySelector('.adding-card');
	
	while (main.childNodes.length > 2) {
	    main.removeChild(main.firstChild);
	}

	books.forEach((book, index) => {
		const card = document.createElement('section');

		card.classList.add('card');

		card.innerHTML = `
			<i class="fas fa-window-close fa-lg" data-index='${index}' onClick='removeBook(${index})'></i>
			<h2>${book.title}</h2>
			<p>${book.author}</p>
			<p>Pages: ${book.pageNum}</p>
			<p>Status: <span data-index='${index}'>${book.readStatus}</span></p>
			<button data-index='${index}' onClick='updateStatus(${index})'>Update</button>
		`;

		main.insertBefore(card, addingCard);
	});
};

const addBook = () => {
	const title = document.querySelector('#title');
	const author = document.querySelector('#author');
	const pageNum = document.querySelector('#page-num');
	const readStatus = document.querySelector('input[name="read-status"]:checked');

	const newBook = new Book(title.value, author.value, pageNum.value, readStatus.value);

	books.push(newBook);

	render();

	title.value = '';
	author.value = '';
	pageNum.value = '';
	readStatus.checked = false;

	toggleForm();
};

formButton.addEventListener('click', toggleForm);

addingButton.addEventListener('click', addBook);