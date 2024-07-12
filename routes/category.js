const express = require("express");
const router = express.Router();
const { postCategory, getAllCategories, deleteCategory, getCategory, updateCategory } = require("../controllers/category");


router.post('/', postCategory);
router.get('/', getAllCategories);
router.delete('/:id', deleteCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
module.exports = router;
