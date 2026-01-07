import { RowDataPacket } from "mysql2"

interface IDiscs extends RowDataPacket {
   id: number,
   brand: string,
   model: string,
   type: "Driver" | "Midrange" | "Putter",
   speed: number,
   glide: number,
   turn: number,
   fade: number,
   created_at?: Date,
   updated_at?: Date;
};
interface IUserDiscs {
    userId: number,
    discId: number,
    addedAt: Date;
};

interface UserDiscsRow extends RowDataPacket {
    user_id: number;
    discs: IDiscs[];
}

export { IDiscs, IUserDiscs, UserDiscsRow };
