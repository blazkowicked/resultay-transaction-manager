import axios from "axios";

const api = axios.create({
  baseURL: "/api/transactions",
});

// CREATE
export const createTransaction = (data) => api.post("/", data);

// READ - list, with optional search/filter params: { search, type, from, to }
export const getTransactions = (params = {}) => api.get("/", { params });

// READ - summary
export const getTransactionSummary = () => api.get("/summary");

// READ - single
export const getTransactionById = (id) => api.get(`/${id}`);

// UPDATE
export const updateTransaction = (id, data) => api.put(`/${id}`, data);

// DELETE
export const deleteTransaction = (id) => api.delete(`/${id}`);

export default api;
