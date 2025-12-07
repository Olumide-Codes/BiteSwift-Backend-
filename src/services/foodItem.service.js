const FoodItem = require('../models/foodItem.model.js');

const getAllFoodItems = async () => {
  return await FoodItem.find().populate('category restaurant');
};

const createFoodItem = async (data) => {
  const food = new FoodItem(data);
  return await food.save();
};

const getFoodItemById = async (id) => {
  const food = await FoodItem.findById(id).populate('category restaurant');
  if (!food) throw new Error('Food item not found');
  return food;
};

const updateFoodItem = async (id, data) => {
  const food = await FoodItem.findByIdAndUpdate(id, data, { new: true });
  if (!food) throw new Error('Food item not found');
  return food;
};

const deleteFoodItem = async (id) => {
  const food = await FoodItem.findByIdAndDelete(id);
  if (!food) throw new Error('Food item not found');
  return { message: 'Food item deleted successfully' };
};

module.exports = {
  getAllFoodItems,
  createFoodItem,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
};