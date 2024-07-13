const express = require('express');
const router = express.Router();
const {postUser, getAllUsers, getUser, loginUser, registerUser } = require('../controllers/user');


router.get('/', getAllUsers);
router.post('/', postUser);
router.get('/:id', getUser);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
