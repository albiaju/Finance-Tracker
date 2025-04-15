import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MonthlyIncomeChart = ({ transactions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Monthly Income',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for the income bars
      },
    ],
  });

  useEffect(() => {
    const monthlyIncome = Array(12).fill(0); // Array to hold total income for each month (0-11)

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // Get the month (0-11)
      if (transaction.type === 'income') {
        monthlyIncome[month] += transaction.amount; // Add to the corresponding month
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
          data: monthlyIncome,
        },
      ],
    }));
  }, [transactions]);

  return (
    <div>
      <h2>Monthly Income</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default MonthlyIncomeChart;