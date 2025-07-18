function calculateMonthlyPayment(principal, annualRate, termYears) {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = termYears * 12;
    if (monthlyRate === 0) return principal / numberOfPayments;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function generateAmortizationSchedule(principal, annualRate, termYears) {
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termYears);
    const numberOfPayments = termYears * 12;
    const monthlyRate = annualRate / 100 / 12;

    let balance = principal;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;
    const schedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
        const interestForMonth = balance * monthlyRate;
        let principalForMonth = monthlyPayment - interestForMonth;
        
        if (balance < monthlyPayment) { 
            principalForMonth = balance; 
        }
        
        balance -= principalForMonth;
        cumulativeInterest += interestForMonth;
        cumulativePrincipal += principalForMonth;
        
        schedule.push({
            paymentNumber: i,
            principalPaid: principalForMonth,
            interestPaid: interestForMonth,
            remainingBalance: balance < 0 ? 0 : balance,
            cumulativePrincipal: cumulativePrincipal,
            cumulativeInterest: cumulativeInterest
        });
    }

    return {
        monthlyPayment,
        amortizationSchedule: schedule
    };
}

module.exports = {
    generateAmortizationSchedule
}; 