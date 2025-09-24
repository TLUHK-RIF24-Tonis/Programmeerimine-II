import express, { Request, Response} from 'express';
import userService from './users/userService';
import gamesService from './games/gamesService';
import coursesRouter from './courses/coursesRouter';
import discsRouter from './discs/discsRouter';

const app = express();
app.use(express.json());

let port = 3000;

app.get('/', (req, res) => {
    return res.status (200).json({
        success: true,
        message: 'API is running!',
    });
});

app.get('/user/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const user = userService.getUserById(id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User with this id: ${id} was not found!`
        });
    };

    return res.status(200).json({
        success: true,
        message: 'User found!',
        user: user
    });
});


app.post('/users/:id/deactivate', (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const user = userService.getUserById(id);

    if (!user) {
    return res.status(400).json({
        success: false,
        message: `User with this id: ${id} was not found!`
    });
    };

    if (!user.active) {
        return res.status(208).json({
            success: false,
            message: `User with id: ${id} is already deactivated`,
        });
    };

    const updatedUser = userService.changeUserInfo(id);

    return res.status(200).json({
    success: true,
    message: 'User successfully deactivated!',
    user: updatedUser
    });
});

app.use('/courses', coursesRouter);

app.get('/games', (req: Request, res: Response) => {

    const games = gamesService.getAllGames()

    return res.status(200).json ({
        success: true,
        message: `All your games loaded!`,
        games,
    });
});

app.get('/games/:id', (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const game = gamesService.getGameById(id);

    if (!game) {
        return res.status(404).json ({
            success: false,
            message: `Game does not exist!`
        })
    }

    return res.status(200).json ({
        success: true,
        message: `Game found by ID!`,
        game,
    });
});

app.use('/discs', discsRouter);

app.listen(port, () =>{
    console.log(`API is running on http://localhost:${port}`);
});
