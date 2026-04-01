// =========================
// Task 1: Expense Calculator
// =========================
const expenseInput = document.getElementById("expenseInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");

let expenses = [];

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense, 0);
    totalExpense.textContent = total;
}

function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
        const li = document.createElement("li");
        li.textContent = expense + " টাকা";
        expenseList.appendChild(li);
    });

    calculateTotal();
}

addExpenseBtn.addEventListener("click", function () {
    const value = expenseInput.value.trim();

    if (value === "" || isNaN(value)) {
        alert("দয়া করে সঠিক টাকার পরিমাণ লিখুন");
        return;
    }

    const amount = Number(value);

    if (amount <= 0) {
        alert("দয়া করে ০ এর বেশি টাকার পরিমাণ লিখুন");
        return;
    }

    expenses.push(amount);
    renderExpenses();
    expenseInput.value = "";
});

// =========================
// Task 2: Book List App
// =========================
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const saveBookBtn = document.getElementById("saveBookBtn");
const bookTableBody = document.getElementById("bookTableBody");

let books = JSON.parse(localStorage.getItem("books")) || [];

function saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
    bookTableBody.innerHTML = "";

    books.forEach((book, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;

        bookTableBody.appendChild(tr);
    });
}

saveBookBtn.addEventListener("click", function () {
    const name = bookName.value.trim();
    const author = authorName.value.trim();

    if (name === "" || author === "") {
        alert("বইয়ের নাম এবং লেখকের নাম লিখুন");
        return;
    }

    const newBook = {
        name: name,
        author: author,
    };

    books.push(newBook);
    saveToLocalStorage();
    renderBooks();

    bookName.value = "";
    authorName.value = "";
});

// Event Delegation / Event Bubbling
bookTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        books.splice(index, 1);
        saveToLocalStorage();
        renderBooks();
    }
});

// Initial Render
renderBooks();
