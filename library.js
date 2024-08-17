const booksAdded = [];

booksAdded.updateDisplay = function () {
    const shelving = document.querySelector("main>ul");
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
        booksAdded[idx].element = createBookElement(idx, activeShelf);
    }

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
    const bookElement = document.createElement("div");
    bookElement.dataset.bookIdx = bookIdx;
    bookElement.classList.add("flex", "book");
    
    const coverLElement = document.createElement("div");
    coverLElement.classList.add("cover", "left");
    const coverRElement = document.createElement("div");
    coverRElement.classList.add("cover", "right");
    const randomColor = Math.floor(Math.random() * COLORS.length);
    coverLElement.style.setProperty("--book-color", COLORS[randomColor]);
    coverRElement.style.setProperty("--book-color", COLORS[randomColor]);
    
    const pagesElement = document.createElement("div");
    pagesElement.classList.add("pages", "flex");
    
    const numPages = 4 + Math.floor(Math.random() * 8);
    pagesElement.style.setProperty("--book-color", COLORS[randomColor]);
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

    shelf.appendChild(bookElement);
}

function Book(name, author, pageCount, isRead) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
    this.element = undefined;
}

booksAdded.push(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
booksAdded.push({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {});

booksAdded.updateDisplay();