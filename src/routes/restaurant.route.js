// src/routes/restaurant.route.js
const express = require('express');
const router = express.Router();
const {
  fetchRestaurants,
  addRestaurant,
  fetchRestaurant,
  fetchRestaurantsByCategory,
  removeRestaurant
} = require('../controllers/restaurant.controller.js');

router.get('/', fetchRestaurants);
router.post('/', addRestaurant);
router.get('/:id', fetchRestaurant);
router.get('/category/:categoryId', fetchRestaurantsByCategory);
router.delete('/:id', removeRestaurant);

module.exports = router;