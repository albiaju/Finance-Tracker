import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.category ? transaction.category.name : 'N/A'}</td> {/* Display category name */}
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;