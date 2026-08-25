import TransactionItem from "./TransactionItem.jsx";

export default function TransactionList({
  transactions,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className="status-message">Loading transactions...</p>;
  }

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <div>
          <h2>Transactions</h2>
          <p>
            {transactions.length}{" "}
            {transactions.length === 1 ? "transaction" : "transactions"} found
          </p>
        </div>
      </div>

      {!transactions.length ? (
        <p className="status-message">No transactions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <TransactionItem
                key={t._id}
                transaction={t}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}