import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MonthlyExpensesChart = ({ transactions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  });

  useEffect(() => {
    const monthlyExpenses = Array(12).fill(0); // Array to hold total expenses for each month (0-11)

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // Get the month (0-11)
      if (transaction.type === 'expense') {
        monthlyExpenses[month] += transaction.amount; // Add to the corresponding month
      }
    });

    setChartData((prevData) => ({
      ...prevData,
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [
        {
          ...prevData.datasets[0],
          data: monthlyExpenses,
        },
      ],
    }));
  }, [transactions]);

  return (
    <div>
      <h2>Monthly Expenses</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default MonthlyExpensesChart;