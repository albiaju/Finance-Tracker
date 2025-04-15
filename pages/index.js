import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import MonthlyIncomeChart from '../components/MonthlyIncomeChart';
import CategoryForm from '../components/CategoryForm';

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  // Function to fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to handle adding a new transaction
  const handleTransactionAdded = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <div>
      <h1>Finance Tracker</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} /> {/* Integrate TransactionList */}
      <MonthlyExpensesChart transactions={transactions} />
      <MonthlyIncomeChart transactions={transactions} />
      <CategoryForm />
    </div>
  );
};

export default Home;