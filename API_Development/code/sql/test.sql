DROP DATABASE test;
CREATE DATABASE IF NOT EXISTS test
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_estonian_ci;
USE test;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS discs;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS user_discs;
DROP TABLE IF EXISTS multiplayer_games;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL DEFAULT NULL,
    active BOOLEAN DEFAULT TRUE,
    user_role ENUM('user', 'admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE courses (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL UNIQUE,
    course_location VARCHAR(255),
    holes INT CHECK (holes > 0),
    par INT CHECK (par > 0),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE discs (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    disc_type VARCHAR(50) CHECK (disc_type IN ('Putter', 'Midrange', 'Driver')),
    speed DECIMAL(2,0) CHECK (speed BETWEEN 1 AND 14),
    glide DECIMAL(2,0) CHECK (glide BETWEEN 1 AND 7),
    turn DECIMAL(3,1) CHECK (turn BETWEEN -5 AND 1),
    fade DECIMAL(2,0) CHECK (fade BETWEEN 0 and 5),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE games (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_id INT UNSIGNED NULL,
    date_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL DEFAULT NULL,
	CONSTRAINT fk_games_course
        FOREIGN KEY (course_id) REFERENCES courses(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_games_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE user_discs (
    user_id INT UNSIGNED NOT NULL,
    disc_id INT UNSIGNED NOT NULL,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (user_id, disc_id),
    CONSTRAINT fk_userdiscs_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_userdiscs_disc
        FOREIGN KEY (disc_id) REFERENCES discs(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE multiplayer_games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    score INT NOT NULL,
    user_status ENUM('active', 'removed') NOT NULL DEFAULT 'active',
    left_at TIMESTAMP NULL DEFAULT NULL,
    game_status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)  ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE error_logs (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    error_message TEXT NOT NULL,
    stack TEXT NULL,
    error_method VARCHAR(255) NULL,
    error_route VARCHAR(255) NULL,
    user_id INT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO users (id, username, email, password_hash, active, user_role) VALUES
  (1, 'KollaneKoll',      'kollanek@mail.com',      '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'admin'),
  (2, 'ParimGolfar1',     'pgolfar@outlook.com',    '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (3, 'SuvalineTegelane', 'tegin2ra@gmail.com',     '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (4, 'Kangutaja',        'kangutaja123@yahoo.com', '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (5, 'RadaRebane',       'rada.rebane@gmail.com',  '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (6, 'ViskeVana',        'viskevana@gmail.com',    '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', FALSE, 'user'),
  (7, 'RingiRändur',      'rändur77@mail.com',      '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (8, 'PuttiPro',         'puttipro@yahoo.com',     '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user');

INSERT INTO courses (id, course_name, course_location, holes, par) VALUES
  (1, 'Kurna Discgolfipark',    'Kurna mõisapark', 18, 54),
  (2, 'Männiku Discgolfipark',  'Männiku',         18, 57),
  (3, 'Haapsalu Discgolfipark', 'Uuemõisa park',   18, 57),
  (4, 'Muraste Discgolfipark',  'Muraste',         18, 56),
  (5, 'Keila Discgolfipark',    'Keila linnapark', 18, 59),
  (6, 'Rakvere Discgolfipark',  'Rakvere tammik',  18, 56),
  (7, 'Pärnu Beach Discgolf',   'Pärnu rand',      18, 54),
  (8, 'Tartu Tähtvere',         'Tähtvere park',   18, 58);

INSERT INTO discs (id, brand, model, disc_type, speed, glide, turn, fade) VALUES
  (1, 'Innova',        'Destroyer', 'Driver',   12, 5, -2.5, 3),
  (2, 'Dynamic Discs', 'Raider',    'Driver',   13, 5, -1.5, 3),
  (3, 'Dynamic Discs', 'Justice',   'Midrange',  5, 1,  0, 4),
  (4, 'Innova',        'Aviar',     'Putter',    3, 3,  0, 2),
  (5, 'Latitude 64',   'River',     'Driver',    7, 7, -1, 1),
  (6, 'Discraft',      'Buzzz',     'Midrange',  5, 4, -1, 1),
  (7, 'Latitude 64',   'Pure',      'Putter',    3, 3,  0, 1),
  (8, 'Innova',        'Wraith',    'Driver',   11, 5, -1, 3);

INSERT INTO games (id, course_id, created_by, date_played)
VALUES
  (1, 4, 1, NOW()),
  (2, 2, 2, NOW()),
  (3, 5, 3, NOW()),
  (4, 1, 4, NOW()),
  (5, 3, 5, NOW()),
  (6, 6, 6, NOW()),
  (7, 7, 7, NOW()),
  (8, 8, 8, NOW()),
  (10, 4, 1, NOW());


INSERT INTO multiplayer_games (game_id, user_id, score) VALUES
  (1, 4, 50),
  (2, 2, 49),
  (3, 4, 53),
  (4, 1, 52),
  (5, 5, 55),
  (6, 6, 51),
  (7, 7, 50),
  (8, 8, 54),
  (10, 4, 50),
  (10, 1, 52);

INSERT INTO user_discs (user_id, disc_id) VALUES
  (1, 1),
  (1, 4),
  (2, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (4, 5),
  (5, 2),
  (5, 3),
  (5, 5),
  (6, 6),
  (6, 1),
  (7, 2),
  (7, 7),
  (8, 3),
  (8, 8),
  (8, 5);
  
ALTER TABLE users  AUTO_INCREMENT = 9;
ALTER TABLE courses AUTO_INCREMENT = 9;
ALTER TABLE discs   AUTO_INCREMENT = 9;
ALTER TABLE games   AUTO_INCREMENT = 9;
