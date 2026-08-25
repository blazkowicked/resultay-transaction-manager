import { useState, useEffect } from "react";

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "",
  type: "expense",
};

export default function TransactionForm({ editingTransaction, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date?.slice(0, 10) || emptyForm.date,
        description: editingTransaction.description,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    onSave({
      ...form,
      amount: Number(form.amount),
      _id: editingTransaction?._id,
    });

    if (!editingTransaction) {
      setForm(emptyForm);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>{editingTransaction ? "Update Transaction" : "Add Transaction"}</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Type
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
      </div>

      <label>
        Description
        <input
          type="text"
          name="description"
          placeholder="e.g. Grocery shopping"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Amount
        <input
          type="number"
          name="amount"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={form.amount}
          onChange={handleChange}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTransaction ? "Save Changes" : "Add Transaction"}
        </button>
        {editingTransaction && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
