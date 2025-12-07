CREATE DATABASE IF NOT EXISTS dartflix;
USE dartflix;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  profile_picture VARCHAR(500) DEFAULT 'https://via.placeholder.com/150',
  is_premium BOOLEAN DEFAULT FALSE,
  subscription_ends DATE,
  last_login TIMESTAMP NULL,
  reset_password_token VARCHAR(255),
  reset_password_expires TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  video_url VARCHAR(255),
  thumbnail_url VARCHAR(255),
  rating FLOAT,
  duration_minutes INT,
  release_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watchlist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_movie (user_id, movie_id)
);

-- Add indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_movies_category ON movies(category);
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);

-- Insert sample movies
INSERT INTO movies (title, description, category, rating) VALUES
('Action Blockbuster', 'An intense action-packed adventure', 'action', 8.5),
('Drama Series', 'A compelling drama unfolds', 'drama', 8.2),
('Fantasy Epic', 'An epic fantasy journey', 'fantasy', 8.8),
('Anime Collection', 'Best anime series compilation', 'anime', 9.0),
('Superhero Chronicles', 'Amazing superhero stories', 'action', 8.6),
('Space Odyssey', 'Journey through space', 'sci-fi', 8.7),
('Mystery Thriller', 'Suspenseful mystery awaits', 'thriller', 8.4),
('Romantic Comedy', 'Laughs and love combined', 'comedy', 8.1),
('Royal Dynasty', 'Power and politics unfold', 'drama', 8.9),
('Science Fiction', 'Future technology explored', 'sci-fi', 8.5),
('Medical Drama', 'Hospital stories revealed', 'drama', 8.3),
('Crime Investigation', 'Solving criminal cases', 'thriller', 8.6),
('Power Academy', 'Superpowered students train', 'anime', 8.7),
('Samurai Legend', 'Ancient samurai battles', 'anime', 9.1),
('Romance Blossom', 'Love stories unfold', 'romance', 8.2),
('Mecha Warriors', 'Giant robots in action', 'anime', 8.8);