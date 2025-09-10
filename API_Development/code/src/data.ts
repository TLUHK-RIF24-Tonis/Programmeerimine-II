import IUsers from "./users/usersInterface"
import ICourses from "./courses/coursesInterface"

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

export default { courses, users };
