import { RowDataPacket } from "mysql2";

interface IUsers extends RowDataPacket {
    id: number;
    username: string;
    email: string;
    password: string;
    created: Date;
    active: boolean;
    role: 'user' | 'admin';
    created_at?: string;
    updated_at?: string;
}

export interface IUsersData {
    id: number;
    username: string;
    email: string;
    password: string;
    created: Date;
    active: boolean;
    role: 'admin' | 'user';
}

export default IUsers;
