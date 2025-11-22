import { RowDataPacket } from "mysql2";

interface IGames extends RowDataPacket {
    id: number;
    userId: number;
    courseId: number;
    datePlayed: Date;
    score: number;
};

export default IGames;
