import express, { Request, Response} from 'express';
import userService from './users/userService';
import coursesService from './courses/coursesService';
import gamesService from './games/gamesService';
import discsService from './discs/discsService';

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

app.get('/courses', (req: Request, res: Response) => {

    const courses = coursesService.getAllCourses();

    return res.status(200).json({
        success: true,
        message: 'Courses loaded!',
        courses
    });
});

app.get('/courses/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const course = coursesService.getCourseById(id);

    if(!course) {
        return res.status(400).json ({
            success: false,
            message: `Course with this id: ${id} does not exist!`
        });
    };

    return res.status(200).json ({
        success: true,
        message: `Course with id: ${id} found!`,
        course,
    });
});

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

app.get('/discs', (req: Request, res: Response) => {

    const discs = discsService.getAllDiscs();

    return res.status(200).json ({
        success: true,
        message: `All player discs loaded!`,
        discs,
    });
});

app.get('/discs/:id', (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const disc = discsService.getDiscById(id);

    if (disc) {   
        return res.status(200).json ({
        success: true,
        message: `All player discs loaded!`,
        disc,
    })};

    if(!disc) {
        return res.status (404).json ({
            success: false,
            message: `Disc not found!`
        })
    }
});


app.listen(port, () =>{
    console.log(`API is running on http://localhost:${port}`);
});
