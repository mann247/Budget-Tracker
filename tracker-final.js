//Nia Manning
//August 10th, 2025
//Guided Inquiry

class Budget{
    constructor(){
        this.income = []; //income array
        this.expense = []; //expense array
    }

    addIncome(description, amount){
        this.income.push({description, amount});
        console.log('income added.');
    }

    addExpense(description, category, amount){
        this.expense.push({description, category, amount});
        console.log('expense added.');
    }

    getTotalIncome(){
        return this.income.reduce((sum,item) => sum + item.amount, 0); //calculates income
    }

    getTotalExpense(){
        return this.expense.reduce((sum,item) => sum + item.amount, 0); //calculates expenses
    }

    getTotalBudget(){
        return this.getTotalIncome() - this.getTotalExpense(); //subtracts total expenses from total income to get the budget
    }

    clearAll(){ //clears all user input
        this.income = [];
        this.expense = [];
        this.updateUI();
    }

    updateUI(){ //as the user inputs information, ui is updated. This updates the table.
        document.getElementById('total-income').textContent = this.getTotalIncome().toFixed(2);
        document.getElementById('total-expenses').textContent = this.getTotalExpense().toFixed(2);
        document.getElementById('total-budget').textContent = this.getTotalBudget().toFixed(2);

        const tbody = document.querySelector('.transaction-history');
        tbody.innerHTML = '';

        this.income.forEach(item => {
            const row = this.createRow(item.description, '-', item.amount, 'Income'); //no category, "-" 
            tbody.appendChild(row);
            console.log('row added.')
        });

        this.expense.forEach(item =>{
            const row = this.createRow(item.description, item.category, item.amount, 'Expense');
            tbody.appendChild(row);
        });
    }
    createRow(description,category,amount,type){
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button onclick="removeRow(this)">❌</button></td>`;
        return tr;
    }
}

const budgetTracker = new Budget();

function addIncome(){
    const desc = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value);

    if(!desc || isNaN(amount) || amount <= 0){ //edge case
        alert('Enter valid income description and amount.');
        return;
    }
    budgetTracker.addIncome(desc, amount);
    budgetTracker.updateUI();
    clearIncomeFields();
}

function addExpense(){ //edge case
    const desc = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-type').value;

    if(!desc || isNaN(amount) || amount <= 0){
        alert('Enter valid expense description and amount.');
        return;
    }
    budgetTracker.addExpense(desc, category, amount);
    budgetTracker.updateUI(); 
    console.log('expense type selected');
    clearExpenseFields();
}

function clearAll(){
    console.log("all clear.");
    budgetTracker.clearAll();
}

function clearIncomeFields(){
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
}
function clearExpenseFields(){
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

function removeRow(button){ //this is for the red 'x' button in UI
    const row = button.closest('tr');
    row.remove();
    console.log('row removed')
}