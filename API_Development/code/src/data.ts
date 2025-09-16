import IUsers from "./users/usersInterface"
import ICourses from "./courses/coursesInterface"
import IGames from "./games/gamesInterface";
import IDiscs from "./discs/discsInterface";

const users: IUsers[] = [
    {
        id: 1,
        username: 'KollaneKoll',
        email: 'KollaneK@mail.com',
        password: '12345',
        created: new Date('21-10-2024'),
        active: true,
    }
];

const courses: ICourses[] = [
    {
        id: 1,
        name: 'Kurna discgolfi rada',
        location: 'Kurna mõisapark',
        holes: 18,
        par: 54,
    }
];

const games: IGames[] = [
    {
        id: 1,
        userId: 4,
        courseId: 5,
        datePlayed: new Date('26-08-2025'),
        score: 50,
    },
    {
        id: 2,
        userId: 2,
        courseId: 2,
        datePlayed: new Date('26-08-2025'),
        score: 50,
    },
    {
        id: 3,
        userId: 4,
        courseId: 5,
        datePlayed: new Date('26-08-2025'),
        score: 50,
    }
];

const discs: IDiscs[] = [
    {
    id: 1,
    userId: 1,
    brand: 'Innova',
    model: 'Destroyer',
    type: 'Driver',
    speed: 12,
    glide: 5,
    turn: -1,
    fade: 3
    },
    {
    id: 2,
    userId: 1,
    brand: 'Dynamic Discs',
    model: 'Raider',
    type: 'Driver',
    speed: 13,
    glide: 5,
    turn: -0.5,
    fade: 3
    },
    {
    id: 3,
    userId: 1,
    brand: 'Dynamic Discs',
    model: 'Justice',
    type: 'Mid-Range',
    speed: 5,
    glide: 1,
    turn: 0.5,
    fade: 4
    }
]

export default { courses, users, games, discs };
