# Loan Payoff Visualizer

This is a full-stack web application that helps users visualize their loan payoff schedule. It's built with a React frontend and a Node.js backend, and it's deployed on Firebase.

## Features

*   **Interactive Loan Calculator**: Users can input their loan amount, interest rate, and loan term to get a detailed amortization schedule.
*   **Data Visualization**: The application displays a doughnut chart that shows the breakdown of principal and interest for each payment.
*   **Responsive Design**: The application is designed to work well on both desktop and mobile devices.
*   **Serverless Backend**: The backend is deployed as a Firebase Cloud Function, which is a cost-effective and scalable solution.

## How It Works

The core of the application is the loan amortization algorithm, which runs on the Node.js backend. Here’s a step-by-step breakdown of how it calculates the payoff schedule:

1.  **Calculate Monthly Payment**: First, the fixed monthly payment is calculated using the standard formula:
    
    `M = P * [r(1+r)^n] / [(1+r)^n – 1]`
    
    *   `M` = Monthly Payment
    *   `P` = Principal Loan Amount
    *   `r` = Monthly Interest Rate (annual rate / 12)
    *   `n` = Total Number of Payments (loan term in years * 12)

2.  **Initialize Amortization Schedule**: The algorithm initializes an empty schedule and sets the starting balance equal to the principal loan amount.

3.  **Iterate Through Each Payment**: It then loops through each month of the loan term, from the first payment to the last. In each iteration, it calculates:
    *   **Interest Paid**: The interest for the current month is calculated by multiplying the remaining loan balance by the monthly interest rate.
    *   **Principal Paid**: The principal portion is determined by subtracting the calculated interest from the fixed monthly payment.
    *   **Remaining Balance**: The remaining balance is updated by subtracting the principal portion from the previous balance.

4.  **Store Monthly Data**: The details for each month—including the interest paid, principal paid, and the new remaining balance—are stored as an entry in the amortization schedule.

5.  **Return Results**: Once the loop is complete, the backend returns the calculated monthly payment and the full amortization schedule to the frontend, which then displays the data in the chart and summary sections.

## Project Structure

The project is organized into two main parts: the frontend and the backend (which lives in the `functions` directory).

### Frontend (`/frontend`)

*   **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/) for a fast development experience.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework.
*   **Charting**: [Chart.js](https://www.chartjs.org/) for creating the doughnut chart.

### Backend (`/functions`)

*   **Framework**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) for the API.
*   **Deployment**: [Firebase Cloud Functions](https://firebase.google.com/docs/functions) for a serverless architecture.
*   **API Endpoint**: The backend exposes a single API endpoint at `/api/calculate` that takes the loan details and returns the amortization schedule.

## How to Run Locally

1.  **Clone the repository**: `git clone <repository-url>`
2.  **Install frontend dependencies**: `cd frontend && npm install`
3.  **Install backend dependencies**: `cd ../functions && npm install`
4.  **Run the frontend**: `cd ../frontend && npm run dev`
5.  **Run the backend**: `cd ../functions && npm run serve` (You will need the Firebase CLI installed and configured for this to work)

## Deployment

The application is deployed to Firebase Hosting. The `main` branch is automatically deployed to the live site via a GitHub Action. 