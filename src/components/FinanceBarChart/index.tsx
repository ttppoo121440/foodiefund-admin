import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const FinanceBarChart = () => {
  const data = {
    labels: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    datasets: [
      {
        label: '收入',
        data: [
          5000, 6000, 7000, 8000, 7500, 8500, 9000, 9500, 10000, 10500, 11000,
          11500,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '支出',
        data: [
          3000, 4000, 3500, 4500, 4000, 5000, 5500, 6000, 6500, 7000, 7500,
          8000,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '月財政報表',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FinanceBarChart;
