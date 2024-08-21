const booksAdded = [];


const dialog = new DialogBox();



booksAdded.updateDisplay = function () {
    const shelving = document.querySelector("main>ul");
    shelving.replaceChildren();
    let shelves = Array.from(shelving.children);
    for (let idx in booksAdded) {
        if (Number.isNaN(Number(idx))) continue;
        let activeShelf;
        for (let shelf of shelves) {
            console.log(shelf.dataset.numBooks);
            if (parseInt(shelf.dataset.numBooks) < 7) {
                activeShelf = shelf;
                break;
            }
        }
        if (typeof activeShelf == 'undefined') activeShelf = createShelf(shelving);
        
        
        shelves = Array.from(shelving.children);
        
        activeShelf.dataset.numBooks++;
        createBookElement(idx, activeShelf);
    }
    
}



/**
 * @class
 * @param {string} name 
 * @param {string} author 
 * @param {number} pageCount 
 * @param {boolean} isRead 
 */
function Book(name, author, pageCount, isRead) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.element = undefined;
    this.color = undefined;
}

function DialogBox() {
    const dialogElement = document.createElement("dialog");
    
    dialogElement.classList.add("dialog-popup");
    document.querySelector("body").appendChild(dialogElement);
    /** @type {HTMLDialogElement} element*/
    this.element = dialogElement;
    this.isModal = true;
    
    /**
     * 
     * @param {Book} bookObject 
     */
    this.modalBook = function(bookObject) { 
        this.element.replaceChildren();
        const infoUL = document.createElement("ul");
        infoUL.classList.add("grid", "dialog-info-list");
        this.element.appendChild(infoUL);

        for (let key in bookObject) {
            let value = bookObject[key];
            const ignoreList = ["element", "color"];
            if (ignoreList.includes(key)) continue;
            const listElem = document.createElement("li");
            const contentElem = document.createElement("div");
            listElem.textContent = convertPropertyName(key);
            listElem.appendChild(contentElem);
            listElem.dataset.keyValue = key;
            contentElem.textContent = value;
            listElem.classList.add("flex");
            infoUL.appendChild(listElem);
        }

        const buttonUL = document.createElement("ul");
        const removeButton = document.createElement("button");
        const readButton = document.createElement("button");

        buttonUL.classList.add("flex", "dialog-button-list");

        removeButton.textContent = "Remove Book";
        readButton.textContent = bookObject.isRead ? "Mark as unread" : "Mark as read";
        this.element.appendChild(buttonUL);
        buttonUL.appendChild(removeButton);
        buttonUL.appendChild(readButton);

        removeButton.addEventListener("click", e => {
            let idx = booksAdded.indexOf(bookObject);
            booksAdded.splice(idx, 1);
            this.element.close();
            booksAdded.updateDisplay();
        });

        readButton.addEventListener("click", e => {
            bookObject.isRead = !bookObject.isRead;
            readButton.textContent = bookObject.isRead ? "Mark as unread" : "Mark as read";
            for (let listElem of infoUL.children) {
                if (listElem.dataset.keyValue != 'isRead') continue;
                const infoDiv = listElem.querySelector("div");
                infoDiv.textContent = bookObject.isRead;
            }
        });
        

    }

    this.formBook = function() {
        this.element.replaceChildren();
        const formElem = document.createElement("form");
        const nameInput = document.createElement("input");
        const authorInput = document.createElement("input");
        const pageInput = document.createElement("input");
        const readInput = document.createElement("input");

    }

    this.popup = function() {
        this.element.showModal();
    }
}

/** @param {string} property */
function convertPropertyName(property) {
    const keyLabels = new Map([
        ["name", "Book Name: "],
        ["author", "Author: "], 
        ["pageCount", "No. of pages: "], 
        ["isRead", "Been read: "]
    ]);
    return keyLabels.has(property) ? keyLabels.get(property) : null;
}

function createShelf (shelving){
    const newShelf = document.createElement("li");
    newShelf.dataset.numBooks = "0";
    newShelf.classList.add("flex", "shelf");
    shelving.appendChild(newShelf);
    return newShelf;
}

const COLORS = ["red", "green", "orange", "purple", "blue"];

function createBookElement (bookIdx, shelf) {

    const bookObj = booksAdded[bookIdx];
    const bookElement = document.createElement("div");
    bookElement.dataset.bookIdx = bookIdx;
    bookElement.classList.add("flex", "book");
    
    const coverLElement = document.createElement("div");
    coverLElement.classList.add("cover", "left");
    const coverRElement = document.createElement("div");
    coverRElement.classList.add("cover", "right");
    const randomColor = Math.floor(Math.random() * COLORS.length);

    let color = COLORS[randomColor];

    if (bookObj.color !== undefined) {
        color = bookObj.color;
    }
    bookObj.color = color;
    coverLElement.style.setProperty("--book-color", color);
    coverRElement.style.setProperty("--book-color", color);
    
    const pagesElement = document.createElement("div");
    pagesElement.classList.add("pages", "flex");
    
    const numPages = 4 + Math.floor(Math.random() * 8);
    pagesElement.style.setProperty("--book-color", color);
    pagesElement.style.alignItems = "center";
    for (let i = 0; i < numPages; i++) {
        const pageHeight = 91 + Math.round(Math.random() * 3);
        const individualPage = document.createElement("div");
        individualPage.style.height = `${pageHeight}%`;
        const PAGE_COLORS = ["lightgray", "white"];
        const pageColor = Math.floor(Math.random() * PAGE_COLORS.length);
        individualPage.style.background = PAGE_COLORS[pageColor];
        individualPage.style.flex = "1";
        pagesElement.appendChild(individualPage);
    }

    bookElement.appendChild(coverLElement);
    bookElement.appendChild(pagesElement)
    bookElement.appendChild(coverRElement);

    /** @type {Book}*/
    bookObj.element = bookElement;


    bookElement.addEventListener("click", e => {
        dialog.modalBook(bookObj);
        dialog.popup();
    });

    shelf.appendChild(bookElement);
}


booksAdded.push(
    new Book("The Hobbit", "J.R.R. Tolkien", 295, false), 
    new Book("Where the Red Fern Grows", "WIlson Rawls and Clare Vanderpool", 314, false), 
    new Book("A Dog's Way Home", "W. Bruce Cameron", 141, true),

    new Book("The Hobbit", "J.R.R. Tolkien", 295, false), 
    new Book("Where the Red Fern Grows", "WIlson Rawls and Clare Vanderpool", 314, false), 
    new Book("A Dog's Way Home", "W. Bruce Cameron", 141, true)
);

booksAdded.updateDisplay();

const addBookBtn = document.querySelector("#form-button");
addBookBtn.addEventListener("click", e => {
    dialog.formBook();
    dialog.popup();
})
