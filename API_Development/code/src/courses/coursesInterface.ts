import { RowDataPacket } from "mysql2";

interface ICourses extends RowDataPacket {
    id: number;
    name: string;
    location: string;
    holes: number;
    par: number;
    created_at?: string;
    updated_at?: string;
}

export default ICourses;