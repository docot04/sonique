-- database setup
CREATE DATABASE sonique;
USE sonique;

-- table setup
CREATE TABLE IF NOT EXISTS Songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    spotify_ID VARCHAR(25) NOT NULL,
    youtube_ID VARCHAR(15) NOT NULL,
    hash_time FLOAT NOT NULL,
    hash_value VARCHAR(50) NOT NULL,
    INDEX (hash_value),
    INDEX (hash_time)
);

-- sample insert
INSERT INTO Songs (spotify_ID, youtube_ID, hash_time, hash_value)
VALUES
  ('6rqhFgbbKwnb9MLmUQDhG6', 'dQw4w9WgXcQ', 12.45, 'a9f3b1d2c4'),
  ('4VqPOruhp5EdPBeR92t6lQ', 'y6120QOlsfU', 5.77,  'd8b9a1f4c2');

-- sample query
-- TODO