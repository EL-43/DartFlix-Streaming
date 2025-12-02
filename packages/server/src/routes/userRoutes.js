import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected user routes
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Add more user routes as needed

export default router;