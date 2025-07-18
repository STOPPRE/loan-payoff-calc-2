import { useState, useEffect } from 'react';
import LoanForm from './components/LoanForm';
import Chart from './components/Chart';
import Summary from './components/Summary';
import type { LoanDetails, CalculationResult } from './types';
import { calculateLoan } from './api';

function App() {
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  const handleCalculate = async (details: LoanDetails) => {
    if (!details.loanAmount || !details.interestRate || !details.loanTerm) {
      setError("Please fill out all fields.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await calculateLoan(details);
      setCalculation(result);
      setSelectedMonth(1);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setCalculation(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // We no longer calculate on initial load
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Loan Payoff Visualizer</h1>
          <p className="text-gray-600 mt-2">See how your payments chip away at a loan over time.</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              <LoanForm onCalculate={handleCalculate} />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8">
              <Chart calculation={calculation} selectedMonth={selectedMonth} />
              <Summary calculation={calculation} selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
