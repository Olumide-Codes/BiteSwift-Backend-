const Category = require('../models/category.model.js');

const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error('Category already exists.');
  const category = new Category(data);
  return await category.save();
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found.');
  return category;
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) throw new Error('Category not found.');
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error('Category not found.');
  return { message: 'Category deleted successfully.' };
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};