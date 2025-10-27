interface IUsers {
    id: number;
    username: string;
    email: string;
    password: string;
    created: Date;
    active: boolean;
    role: 'user' | 'admin';
}

export default IUsers;
