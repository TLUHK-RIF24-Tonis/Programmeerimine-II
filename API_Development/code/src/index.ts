import express from 'express';
import coursesRouter from './courses/coursesRouter';
import discsRouter from './discs/discsRouter';
import gamesRouter from './games/gamesRouter';
import userRouter from './users/usersRouter';

const app = express();
app.use(express.json());

let port = 3000;

app.get('/', (req, res) => {
    return res.status (200).json({
        success: true,
        message: 'API is running!',
    });
});

app.use('/users', userRouter);
app.use('/courses', coursesRouter);
app.use('/games', gamesRouter);
app.use('/discs', discsRouter);

app.listen(port, () =>{
    console.log(`API is running on http://localhost:${port}`);
});
