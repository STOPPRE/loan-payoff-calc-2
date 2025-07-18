import React from 'react';
import type { CalculationResult } from '../types';

interface SummaryProps {
  calculation: CalculationResult | null;
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const Summary: React.FC<SummaryProps> = ({ calculation, selectedMonth, onMonthChange }) => {
  if (!calculation) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Submit loan details to see the summary.</p>
      </div>
    );
  }

  const currentPayment = calculation.amortizationSchedule[selectedMonth - 1];
  const totalPayments = calculation.amortizationSchedule.length;

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="paymentSlider" className="block text-sm font-medium text-gray-700">
          Payment Month: <span className="font-bold text-blue-600">{selectedMonth}</span> / {totalPayments}
        </label>
        <input
          type="range"
          id="paymentSlider"
          min="1"
          max={totalPayments}
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb mt-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Principal This Month</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(currentPayment.principalPaid)}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Interest This Month</p>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(currentPayment.interestPaid)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg sm:col-span-2">
          <p className="text-sm text-gray-600">Remaining Balance</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(currentPayment.remainingBalance)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Cumulative Principal</p>
          <p className="text-2xl font-bold text-blue-800">{formatCurrency(currentPayment.cumulativePrincipal)}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Cumulative Interest</p>
          <p className="text-2xl font-bold text-indigo-800">{formatCurrency(currentPayment.cumulativeInterest)}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary; 