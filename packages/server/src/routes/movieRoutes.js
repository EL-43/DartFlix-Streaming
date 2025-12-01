// packages/server/src/routes/movieRoutes.js
import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all movies (public)
router.get('/', async (req, res) => {
  try {
    const [movies] = await pool.execute(
      'SELECT * FROM movies ORDER BY created_at DESC'
    );
    res.json({ success: true, movies });
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching movies' 
    });
  }
});

// Get movie by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const [movies] = await pool.execute(
      'SELECT * FROM movies WHERE id = ?',
      [req.params.id]
    );
    
    if (movies.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.json({ success: true, movie: movies[0] });
  } catch (error) {
    console.error('Get movie error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching movie' 
    });
  }
});

// Add movie to watchlist (protected)
router.post('/:id/watchlist', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;

    await pool.execute(
      'INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)',
      [userId, movieId]
    );

    res.json({ 
      success: true, 
      message: 'Added to watchlist' 
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Movie already in watchlist'
      });
    }
    
    console.error('Add to watchlist error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding to watchlist' 
    });
  }
});

// Get user's watchlist (protected)
router.get('/watchlist/mine', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [movies] = await pool.execute(
      `SELECT m.* FROM movies m
       JOIN watchlist w ON m.id = w.movie_id
       WHERE w.user_id = ?
       ORDER BY w.added_at DESC`,
      [userId]
    );

    res.json({ success: true, movies });
  } catch (error) {
    console.error('Get watchlist error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching watchlist' 
    });
  }
});

export default router;