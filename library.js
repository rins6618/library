const booksAdded = [];

booksAdded.updateDisplay = function () {
    const shelving = document.querySelector("main>ul");
    const shelves = Array.from(shelving.childNodes.entries);

    for (let idx in booksAdded) {
        if (Number.isNaN(Number(idx))) continue;
        console.log("Index", idx);
        let activeShelf;
        for (let shelf of shelves) {
            if (shelf.dataset.numBooks < 7) {
                activeShelf = shelf;
            }
        }
        if (typeof activeShelf == 'undefined') activeShelf = createShelf(shelving);
        console.log("Active shelf", activeShelf);
        
        activeShelf.dataset.numBooks++;
        createBook(idx, activeShelf);
    }

}

function createShelf (shelving){
    const newShelf = document.createElement("li");
    newShelf.dataset.numBooks = 0;
    newShelf.classList.add("flex", "shelf");
    shelving.appendChild(newShelf);
    return newShelf;
}

const COLORS = ["red", "green", "orange", "purple", "blue"];

function createBook (bookIdx, shelf) {
    const bookElement = document.createElement("div");
    bookElement.dataset.bookIdx = bookIdx;
    bookElement.classList.add("flex", "book");
    
    const coverElement = document.createElement("div");
    coverElement.classList.add("cover");
    const randomColor = Math.floor(Math.random() * COLORS.length);
    coverElement.style.background = COLORS[randomColor];
    
    const pagesElement = document.createElement("div");
    pagesElement.classList.add("pages", "flex");

    const numPages = 4 + Math.floor(Math.random() * 8);
    pagesElement.style.alignItems = "center"
    for (let i = 0; i < numPages; i++) {
        const pageHeight = 85 + Math.round(Math.random() * 5);
        const individualPage = document.createElement("div");
        individualPage.style.height = `${pageHeight}%`;
        const PAGE_COLORS = ["lightgray", "white"];
        const pageColor = Math.floor(Math.random() * PAGE_COLORS.length);
        individualPage.style.background = PAGE_COLORS[pageColor];
        individualPage.style.flex = "1";
        pagesElement.appendChild(individualPage);
    }

    console.log("Appended element: ", bookElement);
    bookElement.appendChild(coverElement);
    bookElement.appendChild(pagesElement)

    shelf.appendChild(bookElement);
}

function Book(name, author, pageCount, isRead) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

booksAdded.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));

booksAdded.updateDisplay();