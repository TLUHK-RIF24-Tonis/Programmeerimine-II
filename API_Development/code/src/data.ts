import IUsers from "./users/usersInterface"
import ICourses from "./courses/coursesInterface"
import IGames from "./games/gamesInterface";
import { IDiscs, IUserDiscs } from "./discs/discsInterface";

const users = [
    {
        id: 1,
        username: 'KollaneKoll',
        email: 'KollaneK@mail.com',
        password: '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa',
        created: new Date(),
        active: true, 
        role: 'admin',
    },
    {
        id: 2,
        username: 'ParimGolfar1',
        email: 'PGolfar@outlook.com',
        password: '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa',
        created: new Date(),
        active: true, 
        role: 'user',
    },
    {
        id: 3,
        username: 'SuvalineTegelane',
        email: 'tegin2ra@gmail.com',
        password: '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa',
        created: new Date(),
        active: true, 
        role: 'user',
    },
    {
        id: 4,
        username: 'Kangutaja',
        email: 'Kangutaja123@yahoo.com',
        password: '$2b$10$RDwYx9u29O5mQpyTFfys0uQb9wEyuNLcP8E/cNFF3814JEWUp1AGa',
        created: new Date(),
        active: true, 
        role: 'user',
    }
] as IUsers[];

const courses: ICourses[] = [
    {
        id: 1,
        name: 'Kurna Discgolfipark',
        location: 'Kurna mõisapark',
        holes: 18,
        par: 54,
    },
    {
        id: 2,
        name: 'Männiku Discgolfipark',
        location: 'Männiku',
        holes: 18,
        par: 57,
    },
    {
        id: 3,
        name: 'Haapsalu Discgolfipark',
        location: 'Uuemõisa park',
        holes: 18,
        par: 57,
    },
    {
        id: 4,
        name: 'Muraste Discgolfipark',
        location: 'Kurna mõisapark',
        holes: 18,
        par: 57,
    },
];

const games: IGames[] = [
    {
        id: 1,
        userId: 4,
        courseId: 5,
        datePlayed: new Date(),
        score: 50,
    },
    {
        id: 2,
        userId: 2,
        courseId: 2,
        datePlayed: new Date(),
        score: 50,
    },
    {
        id: 3,
        userId: 4,
        courseId: 5,
        datePlayed: new Date(),
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
    { userId: 1, discId: 1, addedAt: new Date() },
    { userId: 1, discId: 2, addedAt: new Date() },
    { userId: 2, discId: 1, addedAt: new Date() },
    { userId: 3, discId: 4, addedAt: new Date() },
    { userId: 4, discId: 1, addedAt: new Date() },
    { userId: 2, discId: 3, addedAt: new Date() },
]

export { courses, users, games, discs, userDiscs };
