const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup); // Only admin can signup
router.post('/login', login);

module.exports = router;
