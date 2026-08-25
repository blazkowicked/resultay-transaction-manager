export default function TransactionItem({ transaction, onEdit, onDelete }) {
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  const isIncome = transaction.type === "income";

  return (
    <tr className="transaction-row">
      <td>{formattedDate}</td>
      <td>{transaction.description}</td>
      <td>
        <span
          className={`badge ${
            isIncome ? "badge-income" : "badge-expense"
          }`}
        >
          {transaction.type}
        </span>
      </td>

      <td
        className={`amount ${
          isIncome ? "amount-income" : "amount-expense"
        }`}
      >
        {isIncome ? "+" : "-"}₱{Number(transaction.amount).toFixed(2)}
      </td>

      <td className="actions">
        <button
          className="btn btn-small"
          onClick={() => onEdit(transaction)}
        >
          Edit
        </button>

        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(transaction._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}