export default function SummaryCards({ summary }) {
  return (
    <section className="summary-cards">
      <div className="summary-card summary-income">
        <span className="summary-label">TOTAL INCOME</span>

        <strong className="summary-value amount-income">
          ₱{Number(summary.totalIncome).toFixed(2)}
        </strong>

        <span className="summary-description">
          Money received
        </span>
      </div>

      <div className="summary-card summary-expense">
        <span className="summary-label">TOTAL EXPENSES</span>

        <strong className="summary-value amount-expense">
          ₱{Number(summary.totalExpenses).toFixed(2)}
        </strong>

        <span className="summary-description">
          Money spent
        </span>
      </div>

      <div className="summary-card summary-balance">
        <span className="summary-label">CURRENT BALANCE</span>

        <strong className="summary-value">
          ₱{Number(summary.balance).toFixed(2)}
        </strong>

        <span className="summary-description">
          Income minus expenses
        </span>
      </div>
    </section>
  );
}