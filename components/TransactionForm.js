import { useState } from 'react';

const TransactionForm = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense'); // Default to 'expense'
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validate amount and date
    if (amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    if (new Date(date) > new Date()) {
      setError('Date cannot be in the future.');
      return;
    }

    const transactionData = {
      amount: parseFloat(amount),
      date,
      category,
      description,
      type,
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        onTransactionAdded(newTransaction.transaction); // Call the parent function to update the list
        // Reset form fields
        setAmount('');
        setDate('');
        setCategory('');
        setDescription('');
        setType('expense');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create transaction');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="salary">Salary</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;