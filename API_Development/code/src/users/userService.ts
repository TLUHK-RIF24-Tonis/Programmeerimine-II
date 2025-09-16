import data from '../data';
import IUsers from './usersInterface';

const getUserById = (id: number): IUsers | undefined => {
    const user = data.users.find(user => user.id === id);
    return user;
};

const changeUserInfo = (id: number): IUsers | undefined => {
    const user = getUserById(id);
    if (!user) return undefined;

    user.active = false;
    return user;
};

export default { getUserById, changeUserInfo };
