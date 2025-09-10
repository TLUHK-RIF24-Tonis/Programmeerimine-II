import express, { Request, Response} from 'express';
import userService from './users/userService';
import data from './data';

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
        return res.status(400).json({
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

app.listen(port, () =>{
    console.log(`API is running on http://localhost:${port}`);
});
