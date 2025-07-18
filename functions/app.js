const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const { generateAmortizationSchedule } = require('./utils');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the Loan Payoff Calculator Backend!');
});

app.post('/api/calculate', (req, res) => {
    const { loanAmount, interestRate, loanTerm } = req.body;

    if (!loanAmount || !interestRate || !loanTerm) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const termYears = parseInt(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears) || principal <= 0 || annualRate < 0 || termYears <= 0) {
        return res.status(400).json({ error: 'Invalid input values' });
    }

    const calculation = generateAmortizationSchedule(principal, annualRate, termYears);
    res.json(calculation);
});

module.exports = app; 