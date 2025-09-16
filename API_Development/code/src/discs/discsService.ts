import IDiscs from "./discsInterface";
import data from "../data";

const getDiscById = (id?: number, userId?: number): IDiscs[] => {
    return data.discs.filter(discs => {
        if (id && userId) {
            return discs.userId === userId && discs.id === id;
        }
        if (id) {
            return discs.id === id;
        }
        if (userId) {
            return discs.userId === userId;
        }
    });
};

const getAllDiscs = (): IDiscs [] => {
    return data.discs
};

export default { getDiscById, getAllDiscs };
