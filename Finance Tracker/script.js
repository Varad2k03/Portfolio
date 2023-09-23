// Transaction list
const transactionList = document.getElementById('transaction-list');

// Balance
const balance = document.getElementById('balance');

// Transaction form
const transactionForm = document.getElementById('transaction-form');
const transactionType = document.getElementById('type');
const transactionDescription = document.getElementById('description');
const transactionAmount = document.getElementById('amount');

// Initialize transaction array
let transactions = [];

// Function to add a transaction
function addTransaction(e) {
    e.preventDefault();

    const type = transactionType.value;
    const description = transactionDescription.value;
    const amount = parseFloat(transactionAmount.value);

    if (description.trim() === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const transaction = {
        id: generateID(),
        type,
        description,
        amount
    };

    transactions.push(transaction);
    updateLocalStorage();
    addTransactionToList(transaction);
    updateBalance();

    transactionDescription.value = '';
    transactionAmount.value = '';
}

// Function to generate a unique ID for each transaction
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}

// Function to add a transaction to the list
function addTransactionToList(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    transactionList.appendChild(li);
}

// Function to delete a transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// Function to update the balance
function updateBalance() {
    const income = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const currentBalance = income - expenses;
    balance.textContent = `₹${currentBalance.toFixed(2)}`;
}

// Function to initialize the application
function init() {
    transactionList.innerHTML = '';
    transactions.forEach(addTransactionToList);
    updateBalance();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Event listeners
transactionForm.addEventListener('submit', addTransaction);

// Load transactions from local storage
const storedTransactions = localStorage.getItem('transactions');
if (storedTransactions) {
    transactions = JSON.parse(storedTransactions);
}

// Initialize the application
init();
