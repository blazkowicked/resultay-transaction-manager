const Transaction = require("../models/Transaction");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const { date, description, amount, type } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (amount === undefined || amount === null || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    if (!type || !["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Type must be either income or expense",
      });
    }

    const transaction = await Transaction.create({
      date: date || Date.now(),
      description: description.trim(),
      amount: Number(amount),
      type,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get All / Search / Filter Transactions
const getTransactions = async (req, res) => {
  try {
    const { search, type, from, to } = req.query;

    const filter = {};

    // Search by description
    if (search && search.trim() !== "") {
      filter.description = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // Filter by transaction type
    if (type) {
      if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
          message: "Type must be either income or expense",
        });
      }

      filter.type = type;
    }

    // Filter by date range
    if (from || to) {
      filter.date = {};

      if (from) {
        const startDate = new Date(from);

        if (isNaN(startDate.getTime())) {
          return res.status(400).json({
            message: "Invalid from date",
          });
        }

        startDate.setHours(0, 0, 0, 0);
        filter.date.$gte = startDate;
      }

      if (to) {
        const endDate = new Date(to);

        if (isNaN(endDate.getTime())) {
          return res.status(400).json({
            message: "Invalid to date",
          });
        }

        endDate.setHours(23, 59, 59, 999);
        filter.date.$lte = endDate;
      }
    }

    const transactions = await Transaction.find(filter).sort({
      date: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Transaction Summary
const getTransactionSummary = async (req, res) => {
  try {
    const incomeResult = await Transaction.aggregate([
      {
        $match: { type: "income" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const expenseResult = await Transaction.aggregate([
      {
        $match: { type: "expense" },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;

    const totalExpenses = expenseResult.length > 0 ? expenseResult[0].total : 0;

    const balance = totalIncome - totalExpenses;

    res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Transaction By ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: "Invalid transaction id",
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { date, description, amount, type } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (amount === undefined || amount === null || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    if (!type || !["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Type must be either income or expense",
      });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        date: date || Date.now(),
        description: description.trim(),
        amount: Number(amount),
        type,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction deleted",
      id: transaction._id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid transaction id",
    });
  }
};

// Export controller functions
module.exports = {
  createTransaction,
  getTransactions,
  getTransactionSummary,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
