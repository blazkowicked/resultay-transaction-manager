import { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import SummaryCards from "./components/SummaryCards.jsx";

import {
  getTransactions,
  getTransactionSummary,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./api/api.js";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
  });

  const loadTransactions = useCallback(async (params) => {
    setLoading(true);
    setError("");

    try {
      const [transactionsRes, summaryRes] = await Promise.all([
        getTransactions(params),
        getTransactionSummary(),
      ]);

      setTransactions(transactionsRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      setError(
        "Could not load transactions. Is the backend server running?"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    loadTransactions(newFilters);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateTransaction(data._id, data);
      } else {
        await createTransaction(data);
      }

      setEditingTransaction(null);
      loadTransactions(filters);
    } catch (err) {
      setError(
        "Could not save the transaction. Please check the fields and try again."
      );
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this transaction? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteTransaction(id);
      loadTransactions(filters);
    } catch (err) {
      setError("Could not delete the transaction.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Transaction Manager</h1>

        <p>
          Track income and expenses — create, update, delete,
          search, and view.
        </p>
      </header>

      {error && <p className="banner-error">{error}</p>}

      <main>
        <SummaryCards summary={summary} />

        <div className="app-main">
          <section className="panel">
            <TransactionForm
              editingTransaction={editingTransaction}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          </section>

          <section className="panel">
            <SearchBar onSearch={handleSearch} />

            <TransactionList
              transactions={transactions}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>
    </div>
  );
}