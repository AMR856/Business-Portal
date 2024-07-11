const express = require("express");
const router = express.Router();
const { postCategory, getAllCategories, deleteCategory } = require("../controllers/category");


router.post('/', postCategory);
router.get('/', getAllCategories);
router.delete('/:id', deleteCategory);

module.exports = router;
