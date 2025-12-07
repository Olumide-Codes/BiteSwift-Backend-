// src/services/restaurant.service.js
const Restaurant = require('../models/restaurant.model.js');

const getAllRestaurants = async () => {
  return await Restaurant.find().populate('category');
};

const createRestaurant = async (data) => {
  const { name } = data;

  const existingRestaurant = await Restaurant.findOne({ name });
  if (existingRestaurant) {
    throw new Error('Restaurant with this name already exists.');
  }

  const newRestaurant = new Restaurant(data);
  await newRestaurant.save();
  return newRestaurant;
};

const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id).populate('category');
  if (!restaurant) {
    throw new Error('Restaurant not found.');
  }
  return restaurant;
};

const getRestaurantsByCategory = async (categoryId) => {
  const restaurants = await Restaurant.find({ category: categoryId });
  if (!restaurants || restaurants.length === 0) {
    throw new Error('No restaurants found for this category.');
  }
  return restaurants;
};

const deleteRestaurant = async (id) => {
  const restaurant = await Restaurant.findByIdAndDelete(id);
  if (!restaurant) {
    throw new Error('Restaurant not found.');
  }
  return { message: 'Restaurant deleted successfully.' };
};

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  getRestaurantsByCategory,
  deleteRestaurant,
};