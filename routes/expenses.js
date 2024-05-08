const express = require('express');
const router = express.Router();

// Add a new expense
router.post('/', (req, res) => {
  // TODO: Add a new expense
  res.status(201).json({ message: 'Expense added successfully' });
});

// Get a paginated list of expenses
router.get('/', (req, res) => {
  // TODO: Retrieve a paginated list of the user's expenses
  res.json({ expenses: [] });
});

// Get expenses grouped by category
router.get('/grouped', (req, res) => {
  // TODO: Group user expenses by expense category
  res.json({ groupedExpenses: {} });
});

// Get monthly expense data for a specific category
router.get('/category/:categoryId/monthly', (req, res) => {
  const { categoryId } = req.params;
  // TODO: Retrieve monthly expense data for the specified category
  res.json({ monthlyExpenses: {} });
});

module.exports = router;