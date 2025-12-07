// src/controllers/restaurant.controller.js
const {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  getRestaurantsByCategory,
  deleteRestaurant
} = require('../services/restaurant.service.js');

const fetchRestaurants = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const restaurant = await createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    if (error.message.includes('exists')) {
      return res.status(409).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const fetchRestaurant = async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const fetchRestaurantsByCategory = async (req, res) => {
  try {
    const restaurants = await getRestaurantsByCategory(req.params.categoryId);
    res.status(200).json(restaurants);
  } catch (error) {
    if (error.message.includes('No restaurants')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const removeRestaurant = async (req, res) => {
  try {
    const result = await deleteRestaurant(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchRestaurants,
  addRestaurant,
  fetchRestaurant,
  fetchRestaurantsByCategory,
  removeRestaurant
};