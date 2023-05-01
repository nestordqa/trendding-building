import React from 'react';
import 'chart.js/auto'
import { Line } from 'react-chartjs-2';

interface Props {
  title: string,
  labelRow: string[],
  labelstitle: string,
  dat1: number[],
}

const LineGraphic = ({
  title,
  labelRow,
  labelstitle,
  dat1,
}: Props) => {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        color: "#07130c",
        font: {
          size: 16
        }
      },
    },

  };
  // [4, 5, 6, 3, 5, 2, 3, 2, 3, 4, 1, 2]
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const data = {
    labels,
    datasets: [
      {
        label: labelstitle,
        data: dat1,
        borderColor: '#235d3b',
        backgroundColor: '#3ea76a',
        tension: 0.3,
        fill:true,
      }      
    ],
  };

  return (
    <div className='w-full h-96 p-4 bg-blue-50 rounded-xl shadow-2xl'>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineGraphic
