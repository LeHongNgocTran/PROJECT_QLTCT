import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { result } from 'lodash';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({ results }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ thể hiện doanh thu phòng vé',
      },
    },
  };
  const labels = results.map((element) => element.idPhongVe);
  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: results.map((element) => element.tongtien),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  //   return <></>;
  return <Bar options={options} data={data} />;
}
