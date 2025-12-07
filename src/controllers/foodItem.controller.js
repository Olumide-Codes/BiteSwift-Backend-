const {
  getAllFoodItems,
  createFoodItem,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
} = require('../services/foodItem.service.js');

const getFoodItems = async (req, res) => {
  try {
    const items = await getAllFoodItems();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewFoodItem = async (req, res) => {
  try {
    const newItem = await createFoodItem(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingleFoodItem = async (req, res) => {
  try {
    const item = await getFoodItemById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateSingleFoodItem = async (req, res) => {
  try {
    const updatedItem = await updateFoodItem(req.params.id, req.body);
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteSingleFoodItem = async (req, res) => {
  try {
    const result = await deleteFoodItem(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getFoodItems,
  createNewFoodItem,
  getSingleFoodItem,
  updateSingleFoodItem,
  deleteSingleFoodItem,
};