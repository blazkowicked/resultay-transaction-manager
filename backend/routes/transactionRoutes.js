const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getTransactions,
  getTransactionSummary,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/", createTransaction);

router.get("/", getTransactions);

router.get("/summary", getTransactionSummary);

router.get("/:id", getTransactionById);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

module.exports = router;
