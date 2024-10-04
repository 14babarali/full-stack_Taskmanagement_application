const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const { roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', roleMiddleware(['admin']), getUsers);
router.post('/', roleMiddleware(['admin']), createUser);

module.exports = router;
