import React, { useState } from 'react';
import type { LoanDetails } from '../types';

interface LoanFormProps {
  onCalculate: (details: LoanDetails) => void;
}

const formatNumber = (value: string) => {
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const LoanForm: React.FC<LoanFormProps> = ({ onCalculate }) => {
  const [details, setDetails] = useState<LoanDetails>({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'loanAmount') {
      setDetails(prevDetails => ({
        ...prevDetails,
        [name]: formatNumber(value),
      }));
    } else {
      setDetails(prevDetails => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      ...details,
      loanAmount: details.loanAmount.replace(/,/g, ''),
    });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Loan Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
          <input
            type="text"
            id="loanAmount"
            name="loanAmount"
            value={details.loanAmount}
            onChange={handleChange}
            placeholder="e.g., 25,000"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={details.interestRate}
            onChange={handleChange}
            step="0.1"
            placeholder="e.g., 5"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700">Loan Term (Years)</label>
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            value={details.loanTerm}
            onChange={handleChange}
            placeholder="e.g., 5"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" className="mt-2 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Calculate & Visualize
        </button>
      </form>
    </>
  );
};

export default LoanForm; 