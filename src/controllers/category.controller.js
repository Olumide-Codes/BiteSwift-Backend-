const {
  createCategoryService,
  getCategoriesService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService
} = require("../services/category.service.js");

const createCategory = async (req, res) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await getCategoriesService();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const result = await getCategoryService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await updateCategoryService(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await deleteCategoryService(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
};