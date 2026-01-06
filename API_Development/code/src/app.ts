import express from 'express';
import coursesRouter from './courses/coursesRouter';
import discsRouter from './discs/discsRouter';
import gamesRouter from './games/gamesRouter';
import userRouter from './users/usersRouter';
import authController from './auth/authController';
import isLoggedIn from './auth/isLoggedMiddleware';
import usersController from './users/usersController';
import config from './config';
import errorMiddleware from './general/errorMiddleware';
import notFoundMiddleware from './general/notFoundMiddleware';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.status (200).json({
        success: true,
        message: 'API is running!',
        endpoints: {
            USERS:{
            "POST /users": 'Create user',
            "GET /users/me": 'Get logged in user data',
            "PATCH /users/me": 'Change logged in user data',
            "PATCH /users/:id": 'Change user data',
            "GET /users": 'Get all users',
            "GET /users/:id": 'Get user by ID',
            "PATCH /users/:id/status": 'Change user active status'
            },
            GAMES:{
            "GET /games/myGames": 'Get logged in user specific games',
            "GET /games/:id": 'Get game by ID (User only games)',
            "POST /games/add": 'Add game',
            "PATCH /games/:id/leave": 'For user to remove self from game',
            "PATCH /games/:id": 'To update game data',
            "DELETE /games/:id": 'For admin to soft-delete game',
            "GET /games/admin/:id": 'Get game by ID',
            "GET /games": 'Get all games'
            },
            DISCS:{
            "GET /discs": 'Get all discs',
            "GET /discs/:id": 'Get disc by ID',
            "GET /discs/me": 'Get all user discs',
            "POST /discs": 'Add new disc',
            "GET /discs/user/:id": 'Get one specific user discs',
            "POST /discs/user/disc/check": 'Check if user(:id) has this disc(:id)',
            "DELETE /discs/:id": 'Soft-delete disc',
            "PATCH /discs:id": 'Change created disc data'
            },
            COURSES:{
            "GET /courses": 'Get all courses',
            "GET /courses/:id": 'Get course by ID',
            "POST /courses": 'Add new course',
            "DELETE /courses/:id": 'Soft-delete course',
            "PATCH /courses/:id": 'Update course data'
            }
        }
    });
});

app.post('/users', usersController.createUser);
app.post('/auth/login', authController.login);
app.use('/courses', coursesRouter);
app.use('/users', isLoggedIn, userRouter);
app.use('/games', isLoggedIn, gamesRouter);
app.use('/discs', isLoggedIn, discsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
