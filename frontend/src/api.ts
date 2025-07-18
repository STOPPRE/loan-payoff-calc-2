import type { LoanDetails, CalculationResult } from './types';

const API_BASE_URL = '/api';

export const calculateLoan = async (details: LoanDetails): Promise<CalculationResult> => {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An unexpected error occurred.');
  }

  return response.json();
}; 