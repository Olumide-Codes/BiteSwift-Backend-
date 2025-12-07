const express = require('express');
const router = express.Router();
const {
  getCategories,
  createNewCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
} = require('../controllers/category.controller.js');

router.get('/', getCategories);
router.post('/', createNewCategory);
router.get('/:id', getSingleCategory);
router.put('/:id', updateSingleCategory);
router.delete('/:id', deleteSingleCategory);

module.exports = router;