import { Chart as ChartJS, registerables } from 'chart.js';
import { useEffect } from 'react';
import { Chart, Line } from 'react-chartjs-2';
ChartJS.register(...registerables);
function LineChart() {
  const state = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Số lượng vé',
        fill: false,
        lineTension: 1,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [231, 1232, 1233, 1234, 15],
      },
    ],
  };
  return (
    <div>
      <div>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: 'Average Rainfall per month',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
