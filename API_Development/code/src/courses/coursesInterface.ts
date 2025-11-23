import { RowDataPacket } from "mysql2";

interface ICourses extends RowDataPacket {
    id: number;
    name: string;
    location: string;
    holes: number;
    par: number;
}

export default ICourses;