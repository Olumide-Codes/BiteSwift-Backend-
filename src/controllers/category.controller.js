const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../services/category.service.js');

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateSingleCategory = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteSingleCategory = async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getCategories,
  createNewCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};