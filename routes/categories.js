const express = require('express');
const router = express.Router();

// Get all expense categories
router.get('/', (req, res) => {
  // TODO: Retrieve all expense categories for the user
  res.json({ categories: [] });
});

// Add a new expense category
router.post('/', (req, res) => {
  // TODO: Add a new expense category
  res.status(201).json({ message: 'Expense category added successfully' });
});

// Delete an expense category
router.delete('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  // TODO: Delete the expense category with the specified categoryId
  res.json({ message: 'Expense category deleted successfully' });
});

module.exports = router;