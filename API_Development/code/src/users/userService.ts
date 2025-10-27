import { users } from '../data';
import hashService from '../general/hashService';
import IUsers from './usersInterface';

const getAllUsers = (): IUsers[] => {
 return users;
};

const getUserById = (id: number): IUsers | undefined => {
    const user = users.find(user => user.id === id);
    return user;
};

const changeUserInfo = (id: number): IUsers | undefined => {
    const user = getUserById(id);
    if (!user) return undefined;

    user.active = false;
    return user;
};

const createUser = (  username:string ,email: string, password: string ): number => {
    const id = users[users.length - 1].id + 1;

    const created: Date = new Date()
    const active: boolean = true;

    const hashed = hashService.hash(password);
    const newUser: IUsers = {
        id,
        username,
        email,
        password: hashed,
        created,
        active,
        role: 'user',
    };

    users.push(newUser);

    return id;
};

const findUserByEmail = ( email: string ): IUsers | undefined => {
    const oldEmail = users.find((u) => u.email === email);

    return oldEmail;
};

const findUserByUsername = ( username: string): IUsers | undefined => {
    const oldUsername = users.find((x => x.username === username));
    return oldUsername;
};


export default { getUserById, changeUserInfo, createUser, findUserByEmail, findUserByUsername, getAllUsers };
