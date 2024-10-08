//rouutes/authRoutes.js
import { Router } from 'express';
import { signup ,register, login } from '../controllers/authController.js';
const router = Router();

router.post('/register', register); // Admin creates users
router.post('/login', login);       // Login to get JWT
router.post('/signup', signup);
export default router;
