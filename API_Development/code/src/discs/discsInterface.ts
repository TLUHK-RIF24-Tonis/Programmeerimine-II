interface IDiscs {
   id: number,
   brand: string,
   model: string,
   type: "Driver" | "Midrange" | "Putter",
   speed: number,
   glide: number,
   turn: number,
   fade: number;
};
interface IUserDiscs {
    userId: number,
    discId: number,
    addedAt: Date;
};

export { IDiscs, IUserDiscs };
