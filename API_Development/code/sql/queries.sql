

-- USER


-- GET /users

SELECT id, email, username, user_role as role, created_at as createdAt FROM users;

-- GET /users/:id

SELECT id, email, username, user_role as role, created_at as createdAt, active as Active FROM users WHERE id = ?;

-- POST /users - Create user

INSERT INTO users ( username, email, password_hash, user_role ) VALUES (?, ?, ?, ?);

-- GET /users/:email | :username

SELECT id, email, username, user_role, created_at as createdAt,
        active as Active, password_hash as password
        FROM users WHERE email = ? OR username = ? LIMIT 1;

-- DELETE /users

UPDATE users
    SET deleted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND deleted_at IS NULL;

-- PATCH /users

UPDATE users
SET email = COALESCE(?, email),
    password_hash = COALESCE(?, password_hash),
    username = COALESCE(?, username),
    updated_at = CURRENT_TIMESTAMP
WHERE id = ?
    AND deleted_at IS NULL;

-- DISCS

-- GET /discs/user/:id

SELECT u.id AS user_id,
JSON_ARRAYAGG(
    JSON_OBJECT(
        'disc_id', d.id,
        'brand', d.brand,
        'model', d.model,
        'disc_type', d.disc_type,
        'speed', d.speed,
        'glide', d.glide,
        'turn', d.turn,
        'fade', d.fade
    )
) AS discs
FROM users u
JOIN user_discs ud ON ud.user_id = u.id
JOIN discs d ON d.id = ud.disc_id
WHERE u.id = ?
GROUP BY u.id;

-- GET /discs/user/:id - Does user have disc

SELECT 1 FROM user_discs WHERE user_id = ? AND disc_id = ? LIMIT 1

-- POST /discs - Add disc

SELECT id
FROM discs
WHERE brand = ? AND model = ? AND disc_type = ?
LIMIT 1;


INSERT INTO discs
(brand, model, disc_type, speed, glide, turn, fade)
VALUES (?, ?, ?, ?, ?, ?, ?)

-- GET /discs/:id

SELECT id, brand, model, disc_type as type, speed, glide, turn, fade, created_at as added FROM discs WHERE id = ?;

-- GET /discs

SELECT id, brand, model, disc_type as type, speed, glide, turn, fade, created_at as added FROM discs;

-- DELETE /discs/:id

UPDATE discs
    SET deleted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
        AND deleted_at IS NULL;

-- PATCH /discs/:id

UPDATE discs
    SET brand = COALESCE(?, brand),
        model = COALESCE(?, model),
        disc_type = COALESCE(?, disc_type),
        speed = COALESCE(?, speed),
        glide = COALESCE(?, glide),
        turn = COALESCE(?, turn),
        fade = COALESCE(?, fade),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
        AND deleted_at IS NULL;

-- COURSES

-- GET /courses/:id

SELECT id, course_name as name, course_location, holes, par FROM courses where id = ?;

-- GET /courses

SELECT id, course_name as name, course_location, holes, par, created_at as createdAt FROM courses;

-- POST /courses 

INSERT INTO courses ( course_name, course_location, holes, par ) VALUES (?, ?, ?, ?)

-- DELETE /courses/:id

UPDATE courses
    SET deleted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND deleted_at IS NULL;

-- PATCH /courses/:id

UPDATE courses
    SET course_name = COALESCE(?, course_name),
        course_location = COALESCE(?, course_location),
        holes = COALESCE(?, holes),
        par = COALESCE(?, par),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
        AND deleted_at IS NULL;

-- GAMES

-- GET /games

SELECT g.id AS game_id, c.course_name,
JSON_ARRAYAGG(
    JSON_OBJECT(
        'username', u.username,
        'score', mp.score)
) AS players,
COUNT(mp.user_id) AS player_count,
CASE
    WHEN COUNT(mp.user_id) > 1 THEN 'multiplayer'
    ELSE 'singleplayer'
END AS game_type
FROM games g
JOIN multiplayer_games mp ON mp.game_id = g.id
JOIN users u ON u.id = mp.user_id
JOIN courses c ON c.id = g.course_id
GROUP BY g.id, c.course_name
ORDER BY g.id;

-- GET /games/mygames

SELECT g.id AS game_id, c.course_name,
JSON_ARRAYAGG( 
JSON_OBJECT(
'username', u.username,
'score', mp.score)
) AS players
FROM games g
JOIN multiplayer_games mp ON mp.game_id = g.id
JOIN users u ON u.id = mp.user_id
JOIN courses c ON c.id = g.course_id
WHERE g.id IN (
SELECT game_id FROM multiplayer_games WHERE user_id = ?
)
GROUP BY g.id, c.course_name;

-- GET /games/:id

SELECT g.id as game_id, c.course_name,
JSON_ARRAYAGG(
JSON_OBJECT(
'username', u.username,
'score', mp.score)
) AS players
FROM games g
JOIN multiplayer_games mp on mp.game_id = g.id
JOIN users u ON u.id = mp.user_id
JOIN courses c ON c.id = g.course_id
WHERE g.id IN (
SELECT game_id FROM multiplayer_games WHERE game_id = ?
)
GROUP BY g.id, c.course_name;

-- POST /games - Create game

INSERT INTO games ( course_id ) VALUES (?);
INSERT INTO multiplayer_games ( game_id, user_id, score ) VALUES (?, ?, ?);

-- DELETE /games/:id

UPDATE games
SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND deleted_at IS NULL;

-- PATCH /games/myGames/:id/leave

UPDATE multiplayer_games
SET status = 'removed', left_at = CURRENT_TIMESTAMP
WHERE game_id = ? AND user_id = ?;

-- PATCH UPDATE player score

UPDATE multiplayer_games
SET score = ?
WHERE game_id = ? AND user_id = ? AND left_at IS NULL

UPDATE games
SET updated_at = CURRENT_TIMESTAMP
WHERE id = ? 
AND deleted_at IS NULL

-- GET game meta data

SELECT id, created_by FROM games WHERE id = ? AND deleted_at IS NULL
