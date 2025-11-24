import express from 'express';
import coursesRouter from './courses/coursesRouter';
import discsRouter from './discs/discsRouter';
import gamesRouter from './games/gamesRouter';
import userRouter from './users/usersRouter';
import authController from './auth/authController';
import isLoggedIn from './auth/isLoggedMiddleware';
import usersController from './users/usersController';
import config from './config';

const app = express();
app.use(express.json());

let port = config.port;

app.get('/', (req, res) => {
    return res.status (200).json({
        success: true,
        message: 'API is running!',
        endpoints: {
            USERS:{
            "GET /users": 'Get all users',
            "GET /users/:id": 'Get user by ID',
            "POST /users/:id/status": 'Change user active status'
            },
            GAMES:{
            "GET /games": 'Get all games',
            "GET /games/myGames": 'Get logged in user specific games',
            "GET /games/:id": 'Get game by ID (User only games)',
            "GET /games/admin/:id": 'Get game by ID (Admin)',
            "POST /games/add": 'Add game',
            "DELETE /games/:id": 'For admin to soft-delte game',
            "PATCH /games/:id/leave": 'For user to remove self from game',
            "PATCH /games/:id": 'To update game data'
            },
            DISCS:{
            "GET /discs": 'Get all discs',
            "GET /discs/:id": 'Get disc by ID',
            "POST /discs": 'Add new disc',
            "GET /discs/user/:id": 'Get one specific user discs',
            "POST /discs/user/disc/check": 'Check if user(:id) has this disc(:id)'
            },
            COURSES:{
            "GET /courses": 'Get all courses',
            "GET /courses/:id": 'Get course by ID',
            "POST /courses": 'Add new course'
            }
        }
    });
});

app.post('/users', usersController.createUser);
app.post('/auth/login', authController.login);
app.use(isLoggedIn)
app.use('/users', userRouter);
app.use('/courses', coursesRouter);
app.use('/games', gamesRouter);
app.use('/discs', discsRouter);

app.listen(port, () =>{
    console.log(`API is running on http://localhost:${port}`);
});
