import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { CalculationResult } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  calculation: CalculationResult | null;
  selectedMonth: number;
}

const ChartComponent: React.FC<ChartProps> = ({ calculation, selectedMonth }) => {
  if (!calculation) {
    return <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg"><p>Submit loan details to see the chart.</p></div>;
  }

  const currentPayment = calculation.amortizationSchedule[selectedMonth - 1];
  if (!currentPayment) {
    return <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg"><p>Select a valid month.</p></div>;
  }
  
  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [{
      data: [currentPayment.principalPaid, currentPayment.interestPaid],
      backgroundColor: ['#2563eb', '#ef4444'], // Blue-600, Red-500
      borderColor: '#ffffff', // White
      borderWidth: 4,
      cutout: '70%',
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom' as const, 
        labels: { 
          padding: 20, 
          usePointStyle: true, 
          pointStyle: 'circle' as const, 
          font: { size: 14 } 
        } 
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label || ''}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed)}`
        }
      }
    }
  };

  const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const { width, height } = chart;
      ctx.restore();
      
      const monthlyPayment = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculation.monthlyPayment);

      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "#1f2937"; // Gray-800
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(monthlyPayment, width / 2, height / 2 - 10);
      
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#6b7280"; // Gray-500
      ctx.fillText("Monthly Payment", width / 2, height / 2 + 15);

      ctx.save();
    }
  };


  return (
    <div className="relative h-64 md:h-80">
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default ChartComponent; 