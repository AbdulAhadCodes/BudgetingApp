let expenses = [];
let totalAmount = 0;
let remainingBalance = 0;

const selectCat = document.getElementById('selectCategory');
const addBalance = document.getElementById('enterBalance');
const balanceBtn = document.getElementById('balanceBtn');
const inputAmount = document.getElementById('enterAmount');
const inputDate = document.getElementById('enterDate');
const addBtn = document.getElementById('btnAdd');
const expenseTable = document.getElementById('expensesListBody');
const totalAmountCell = document.getElementById('total');
const remainingBalanceCell = document.getElementById('BalanceRem');

balanceBtn.addEventListener('click', function() {
    const balance = Number(addBalance.value);

    if (isNaN(balance) || balance <= 0) {
        alert('Kindly enter a valid balance');
        return;
    }

    remainingBalance = balance;
    remainingBalanceCell.textContent = remainingBalance;
});

addBtn.addEventListener('click', function() {
    const category = selectCat.value;
    const amount = Number(inputAmount.value);
    const date = inputDate.value;

    if (category === '') {
        alert('Kindly select a category');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Kindly enter a valid amount');
        return;
    }

    if (date === '') {
        alert('Kindly select a date');
        return;
    }

    if (amount > remainingBalance) {
        alert('Insufficient balance');
        return;
    }

    expenses.push({ category, amount, date });
    totalAmount += amount;
    remainingBalance -= amount;

    totalAmountCell.textContent = totalAmount;
    remainingBalanceCell.textContent = remainingBalance;

    const newRow = expenseTable.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function() {
        const expenseIndex = expenses.findIndex(expense => expense === currentExpense);

        if (expenseIndex !== -1) {
            const { amount } = expenses[expenseIndex];
            totalAmount -= amount;
            remainingBalance += amount;

            totalAmountCell.textContent = totalAmount;
            remainingBalanceCell.textContent = remainingBalance;

            expenses.splice(expenseIndex, 1);
            expenseTable.removeChild(newRow);
        }
    });

    const currentExpense = expenses[expenses.length - 1];
    categoryCell.textContent = currentExpense.category;
    amountCell.textContent = currentExpense.amount;
    dateCell.textContent = currentExpense.date;
    deleteCell.appendChild(deleteBtn);
});
