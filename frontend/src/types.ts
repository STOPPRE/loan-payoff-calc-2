export interface LoanDetails {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
}

export interface AmortizationData {
  paymentNumber: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
}

export interface CalculationResult {
  monthlyPayment: number;
  amortizationSchedule: AmortizationData[];
} 