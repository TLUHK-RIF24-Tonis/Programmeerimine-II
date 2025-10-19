import express from 'express';
import coursesRouter from './courses/coursesRouter';
import discsRouter from './discs/discsRouter';
import gamesRouter from './games/gamesRouter';
import userRouter from './users/usersRouter';
import authController from './auth/authController';
import isAdmin from './auth/isAdmin';
import isLoggedIn from './auth/isLoggedMiddleware';
import usersController from './users/usersController';

const app = express();
app.use(express.json());

let port = 3000;

app.get('/', (req, res) => {
    return res.status (200).json({
        success: true,
        message: 'API is running!',
    });
});

app.post('/users', usersController.createUser);
app.post('/auth/login', authController.login);
app.use(isLoggedIn)
app.use('/users', isAdmin, userRouter);
app.use('/courses', coursesRouter);
app.use('/games', gamesRouter);
app.use('/discs', discsRouter);

app.listen(port, () =>{
    console.log(`API is running on http://localhost:${port}`);
});
