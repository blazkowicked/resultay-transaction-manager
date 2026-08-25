import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: search.trim(), type });
  };

  const handleClear = () => {
    setSearch("");
    setType("");
    onSearch({ search: "", type: "" });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <button type="button" className="btn btn-ghost" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}
