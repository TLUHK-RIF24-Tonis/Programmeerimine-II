INSERT INTO users (id, username, email, password_hash, active, user_role) VALUES
  (1, 'KollaneKoll',      'kollanek@mail.com',      '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'admin'),
  (2, 'ParimGolfar1',     'pgolfar@outlook.com',    '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (3, 'SuvalineTegelane', 'tegin2ra@gmail.com',     '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (4, 'Kangutaja',        'kangutaja123@yahoo.com', '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (5, 'RadaRebane',       'rada.rebane@gmail.com',  '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
  (6, 'ViskeVana',        'viskevana@gmail.com',    '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa', TRUE, 'user'),
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
