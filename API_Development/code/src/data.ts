import IUsers from "./users/usersInterface"
import ICourses from "./courses/coursesInterface"
import IGames from "./games/gamesInterface";
import { IDiscs, IUserDiscs } from "./discs/discsInterface";

const users: IUsers[] = [
    {
        id: 1,
        username: 'KollaneKoll',
        email: 'KollaneK@mail.com',
        password: '12345',
        created: new Date('2024-10-21'),
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
    brand: 'Dynamic Discs',
    model: 'Justice',
    type: 'Midrange',
    speed: 5,
    glide: 1,
    turn: 0.5,
    fade: 4
    }
]

const userDiscs: IUserDiscs[] = [
    { userId: 1, discId: 1, addedAt: "25-09-2025" },
    { userId: 1, discId: 2, addedAt: "25-09-2025" },
    { userId: 2, discId: 1, addedAt: "25-09-2025" },
    { userId: 3, discId: 4, addedAt: "25-09-2025" },
    { userId: 4, discId: 1, addedAt: "25-09-2025" },
    { userId: 2, discId: 3, addedAt: "25-09-2025" },
]

export { courses, users, games, discs, userDiscs };
