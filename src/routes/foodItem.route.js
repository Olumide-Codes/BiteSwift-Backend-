const express = require('express');
const router = express.Router();
const {
  getFoodItems,
  createNewFoodItem,
  getSingleFoodItem,
  updateSingleFoodItem,
  deleteSingleFoodItem,
} = require('../controllers/foodItem.controller.js');

// GET all food items
router.get('/', getFoodItems);

// POST create a food item
router.post('/', createNewFoodItem);

// GET single food item
router.get('/:id', getSingleFoodItem);

// PUT update a food item
router.put('/:id', updateSingleFoodItem);

// DELETE a food item
router.delete('/:id', deleteSingleFoodItem);

module.exports = router;